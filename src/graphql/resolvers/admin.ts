import { GraphQLContext } from '@/graphql/context';

async function requireAdmin(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export const adminResolvers = {
  Query: {
    adminMetrics: async (_: any, __: any, context: GraphQLContext) => {
      await requireAdmin(context);

      const [totalOrders, totalRevenueResult, artistCount, albumCount, pendingOrders] = await Promise.all([
        context.prisma.order.count(),
        context.prisma.order.aggregate({ _sum: { total: true }, where: { status: { not: 'CANCELED' } } }),
        context.prisma.artist.count({ where: { isActive: true } }),
        context.prisma.album.count({ where: { isActive: true } }),
        context.prisma.order.count({ where: { status: 'PENDING' } }),
      ]);

      return {
        totalOrders,
        totalRevenue: totalRevenueResult._sum.total || 0,
        artistCount,
        albumCount,
        pendingOrders,
      };
    },
    adminUsers: async (_: any, { role, limit, offset }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const where: any = {};
      if (role) where.role = role;
      return context.prisma.user.findMany({
        where,
        take: limit || 50,
        skip: offset || 0,
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  Mutation: {},
};
