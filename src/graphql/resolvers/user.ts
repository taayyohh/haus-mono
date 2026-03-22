import { GraphQLContext } from '@/graphql/context';

export const userResolvers = {
  Query: {
    currentUser: async (_: any, __: any, context: GraphQLContext) => {
      const user = await context.getFullUser();
      if (!user?.isAuthenticated || !user.dbUserId) return null;
      return context.prisma.user.findUnique({ where: { id: user.dbUserId } });
    },
  },
  Mutation: {
    updateUser: async (_: any, { input }: any, context: GraphQLContext) => {
      const user = await context.getFullUser();
      if (!user?.isAuthenticated || !user.dbUserId) {
        throw new Error('Authentication required');
      }
      return context.prisma.user.update({
        where: { id: user.dbUserId },
        data: input,
      });
    },
    setUserRole: async (_: any, { email, role }: any, context: GraphQLContext) => {
      const admin = await context.getFullUser();
      if (!admin?.isAuthenticated || admin.role !== 'ADMIN') {
        throw new Error('Admin access required');
      }
      return context.prisma.user.update({
        where: { email },
        data: { role },
      });
    },
  },
};
