import { GraphQLContext } from '@/graphql/context';
import slugify from 'slugify';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-08-16' as Stripe.LatestApiVersion,
  });
}

async function requireAdmin(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export const productResolvers = {
  Query: {
    products: async (_: any, { category, search }: any, context: GraphQLContext) => {
      const where: any = { isActive: true, isArchived: false };
      if (category) where.category = category;
      if (search) where.name = { contains: search, mode: 'insensitive' };
      return context.prisma.product.findMany({
        where,
        include: { stock: true },
        orderBy: { createdAt: 'desc' },
      });
    },
    product: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.product.findUnique({
        where: { id },
        include: { stock: true },
      });
    },
    productBySlug: async (_: any, { slug }: { slug: string }, context: GraphQLContext) => {
      return context.prisma.product.findUnique({
        where: { slug },
        include: { stock: true },
      });
    },
    featuredProduct: async (_: any, __: any, context: GraphQLContext) => {
      return context.prisma.product.findFirst({
        where: { isFeatured: true, isActive: true },
        include: { stock: true },
      });
    },
  },
  Mutation: {
    createProduct: async (_: any, { input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const slug = slugify(input.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      const { stock, ...rest } = input;

      // Create Stripe product + price
      let stripeProductId = '';
      let stripePriceId = '';

      if (process.env.STRIPE_SECRET_KEY) {
        const stripeProduct = await getStripe().products.create({
          name: input.name,
          description: input.description || undefined,
          metadata: { category: input.category || 'merch' },
          active: true,
        });
        const stripePrice = await getStripe().prices.create({
          product: stripeProduct.id,
          unit_amount: Math.round((input.price || 0) * 100),
          currency: 'usd',
        });
        stripeProductId = stripeProduct.id;
        stripePriceId = stripePrice.id;
      }

      return context.prisma.product.create({
        data: {
          ...rest,
          slug,
          stripeProductId: stripeProductId || null,
          stripePriceId: stripePriceId || null,
          stock: stock ? { create: stock } : undefined,
        },
        include: { stock: true },
      });
    },
    updateProduct: async (_: any, { id, input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const { stock, ...rest } = input;
      const data: any = { ...rest };

      const current = await context.prisma.product.findUnique({ where: { id } });
      if (!current) throw new Error('Product not found');

      if (input.name) {
        data.slug = slugify(input.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      }

      // Sync with Stripe
      if (current.stripeProductId && process.env.STRIPE_SECRET_KEY) {
        await getStripe().products.update(current.stripeProductId, {
          name: input.name || current.name,
          description: input.description || current.description,
          active: input.isActive !== undefined ? input.isActive : current.isActive,
        });

        if (input.price !== undefined && input.price !== current.price) {
          const newPrice = await getStripe().prices.create({
            product: current.stripeProductId,
            unit_amount: Math.round(input.price * 100),
            currency: 'usd',
          });
          if (current.stripePriceId) {
            try { await getStripe().prices.update(current.stripePriceId, { active: false }); } catch {}
          }
          data.stripePriceId = newPrice.id;
        }
      }

      if (stock) {
        await context.prisma.productStock.deleteMany({ where: { productId: id } });
        data.stock = { create: stock };
      }

      return context.prisma.product.update({
        where: { id },
        data,
        include: { stock: true },
      });
    },
    toggleProductStatus: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      await requireAdmin(context);
      const product = await context.prisma.product.findUnique({ where: { id } });
      if (!product) throw new Error('Product not found');

      // Sync active status with Stripe
      if (product.stripeProductId && process.env.STRIPE_SECRET_KEY) {
        await getStripe().products.update(product.stripeProductId, {
          active: !product.isActive,
        });
      }

      return context.prisma.product.update({
        where: { id },
        data: { isActive: !product.isActive },
        include: { stock: true },
      });
    },
  },
};
