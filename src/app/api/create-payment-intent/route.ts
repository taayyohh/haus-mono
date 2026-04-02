import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getUserFromPrivyToken } from '@/lib/auth-utils';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16' as Stripe.LatestApiVersion,
  });
}

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  try {
    const authToken = req.cookies.get('privy-token')?.value
      || req.headers.get('authorization')?.replace('Bearer ', '');

    if (!authToken) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const user = await getUserFromPrivyToken(authToken);
    if (!user.isAuthenticated || !user.dbUserId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { cartItems, shippingAddress } = body;

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate products and inventory
    const productIds = cartItems.map((item: any) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, isArchived: false },
      include: { stock: true },
    });

    for (const cartItem of cartItems) {
      const product = products.find((p) => p.id === cartItem.productId);
      if (!product) {
        return NextResponse.json({ error: `Product not found` }, { status: 400 });
      }

      // Check stock for sized items
      if (cartItem.size) {
        const sizeStock = product.stock.find((s) => s.size === cartItem.size);
        if (!sizeStock || sizeStock.quantity < cartItem.quantity) {
          return NextResponse.json({ error: `Insufficient stock for ${product.name} (${cartItem.size})` }, { status: 400 });
        }
      } else if (product.quantity < cartItem.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${product.name}` }, { status: 400 });
      }
    }

    // Calculate subtotal from DB prices
    const subtotal = cartItems.reduce((sum: number, item: any) => {
      const product = products.find((p) => p.id === item.productId)!;
      return sum + (product.price * item.quantity);
    }, 0);

    const totalItems = cartItems.reduce((sum: number, item: any) => sum + item.quantity, 0);
    const shippingAmount = totalItems > 5 ? 10.00 : 5.00;
    const total = subtotal + shippingAmount;

    // Encode order items for metadata
    const orderItems = cartItems.map((item: any) => {
      const product = products.find((p) => p.id === item.productId)!;
      return `${item.productId}:${item.quantity}:${product.price}${item.size ? ':' + item.size : ''}`;
    });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100),
      currency: 'usd',
      metadata: {
        userId: user.dbUserId,
        orderItems: orderItems.join('|'),
        shippingAddress: JSON.stringify(shippingAddress || {}),
        shippingAmount: String(shippingAmount),
        total: String(total),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment intent error:', error);
    return NextResponse.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
