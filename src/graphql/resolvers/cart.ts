import { GraphQLContext } from '@/graphql/context';

async function getOrCreateCart(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || !user.dbUserId) {
    throw new Error('Authentication required');
  }

  let cart = await context.prisma.cart.findUnique({
    where: { userId: user.dbUserId },
    include: { items: { include: { product: true } } },
  });

  if (!cart) {
    cart = await context.prisma.cart.create({
      data: { userId: user.dbUserId },
      include: { items: { include: { product: true } } },
    });
  }

  return cart;
}

function cartTotal(items: any[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export const cartResolvers = {
  Query: {
    cart: async (_: any, __: any, context: GraphQLContext) => {
      try {
        const cart = await getOrCreateCart(context);
        return { ...cart, total: cartTotal(cart.items) };
      } catch {
        return null;
      }
    },
  },
  Mutation: {
    addToCart: async (_: any, { input }: any, context: GraphQLContext) => {
      const cart = await getOrCreateCart(context);
      const product = await context.prisma.product.findUnique({ where: { id: input.productId } });
      if (!product) throw new Error('Product not found');

      const existing = cart.items.find(
        (item: any) => item.productId === input.productId && item.size === (input.size || null)
      );

      if (existing) {
        await context.prisma.cartItem.update({
          where: { id: existing.id },
          data: { quantity: existing.quantity + input.quantity },
        });
      } else {
        await context.prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: input.productId,
            quantity: input.quantity,
            price: product.price,
            size: input.size || null,
          },
        });
      }

      const updated = await context.prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });

      return { ...updated, total: cartTotal(updated!.items) };
    },
    removeFromCart: async (_: any, { cartItemId }: any, context: GraphQLContext) => {
      const cart = await getOrCreateCart(context);
      await context.prisma.cartItem.delete({ where: { id: cartItemId } });
      const updated = await context.prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
      return { ...updated, total: cartTotal(updated!.items) };
    },
    updateCartItem: async (_: any, { cartItemId, quantity }: any, context: GraphQLContext) => {
      const cart = await getOrCreateCart(context);
      await context.prisma.cartItem.update({
        where: { id: cartItemId },
        data: { quantity },
      });
      const updated = await context.prisma.cart.findUnique({
        where: { id: cart.id },
        include: { items: { include: { product: true } } },
      });
      return { ...updated, total: cartTotal(updated!.items) };
    },
    clearCart: async (_: any, __: any, context: GraphQLContext) => {
      const cart = await getOrCreateCart(context);
      await context.prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      return { ...cart, items: [], total: 0 };
    },
  },
  CartItem: {
    product: async (item: any, _: any, context: GraphQLContext) => {
      if (item.product) return item.product;
      return context.prisma.product.findUnique({ where: { id: item.productId } });
    },
  },
};
