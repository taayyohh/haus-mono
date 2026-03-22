import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-08-16' as Stripe.LatestApiVersion,
});

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  if (!endpointSecret) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const payload = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature!, endpointSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Idempotency check
  const existing = await prisma.webhookEvent.findUnique({
    where: { stripeEventId: event.id },
  });
  if (existing) {
    return NextResponse.json({ received: true });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentIntentSucceeded(event);
        break;
      case 'payment_intent.payment_failed':
        // No action — orders only created on success
        break;
    }

    await prisma.webhookEvent.create({
      data: { stripeEventId: event.id, type: event.type },
    });

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Webhook handler error [${event.type}]:`, error);
    return NextResponse.json({ received: true, error: 'Handler failed' });
  }
}

async function handlePaymentIntentSucceeded(event: Stripe.Event) {
  const paymentIntent = event.data.object as Stripe.PaymentIntent;
  const meta = paymentIntent.metadata;

  if (!meta?.userId || !meta?.orderItems) return;

  // Idempotency: check if order already exists
  const existingOrder = await prisma.order.findFirst({
    where: { stripeSessionId: paymentIntent.id },
  });
  if (existingOrder) return;

  // Parse order items (format: productId:quantity:price[:size]|...)
  const items = meta.orderItems.split('|').map((entry) => {
    const parts = entry.split(':');
    return {
      productId: parts[0],
      quantity: parseInt(parts[1]),
      price: parseFloat(parts[2]),
      size: parts[3] || null,
    };
  });

  const shippingAddress = meta.shippingAddress ? JSON.parse(meta.shippingAddress) : undefined;
  const shippingAmount = parseFloat(meta.shippingAmount || '0');
  const total = parseFloat(meta.total || '0');

  await prisma.$transaction(async (tx) => {
    // Decrement inventory
    for (const item of items) {
      if (item.size) {
        // Size-based stock
        await tx.productStock.updateMany({
          where: { productId: item.productId, size: item.size },
          data: { quantity: { decrement: item.quantity } },
        });
      } else {
        // Simple quantity
        await tx.product.update({
          where: { id: item.productId },
          data: { quantity: { decrement: item.quantity } },
        });
      }
    }

    // Fetch product names for order items
    const productIds = items.map(i => i.productId);
    const products = await tx.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true },
    });

    // Create order
    await tx.order.create({
      data: {
        userId: meta.userId,
        total,
        shippingAmount,
        taxAmount: 0,
        status: 'PROCESSING',
        shippingAddress,
        stripeSessionId: paymentIntent.id,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            name: products.find(p => p.id === item.productId)?.name || 'Unknown',
            quantity: item.quantity,
            price: item.price,
            size: item.size,
          })),
        },
      },
    });
  });
}
