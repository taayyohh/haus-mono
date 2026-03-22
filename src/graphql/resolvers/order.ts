import { GraphQLContext } from '@/graphql/context';

async function requireAdmin(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export const orderResolvers = {
  Query: {
    userOrders: async (_: any, __: any, context: GraphQLContext) => {
      const user = await context.getFullUser();
      if (!user?.isAuthenticated || !user.dbUserId) {
        throw new Error('Authentication required');
      }
      return context.prisma.order.findMany({
        where: { userId: user.dbUserId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: 'desc' },
      });
    },
    adminOrders: async (_: any, { limit, offset, status }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const where: any = {};
      if (status) where.status = status;
      return context.prisma.order.findMany({
        where,
        include: { items: { include: { product: true } }, user: true },
        orderBy: { createdAt: 'desc' },
        take: limit || 20,
        skip: offset || 0,
      });
    },
    adminOrder: async (_: any, { orderId }: { orderId: string }, context: GraphQLContext) => {
      await requireAdmin(context);
      return context.prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } }, user: true },
      });
    },
  },
  Mutation: {
    updateOrderStatus: async (_: any, { orderId, status }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      return context.prisma.order.update({
        where: { id: orderId },
        data: { status },
        include: { items: { include: { product: true } }, user: true },
      });
    },
  },
  OrderItem: {
    product: async (item: any, _: any, context: GraphQLContext) => {
      if (item.product) return item.product;
      if (!item.productId) return null;
      return context.prisma.product.findUnique({ where: { id: item.productId } });
    },
  },
};
