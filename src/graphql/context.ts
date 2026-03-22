import { PrismaClient } from '@prisma/client';
import { prisma } from '@/lib/prisma';

export interface UserContext {
  isAuthenticated: boolean;
  privyUserId?: string;
  email?: string;
  role?: string;
  dbUserId?: string;
}

export interface GraphQLContext {
  prisma: PrismaClient;
  user: UserContext;
  getFullUser: () => Promise<UserContext>;
}

export async function createContext({ req }: { req: any }): Promise<GraphQLContext> {
  const authToken = req.cookies?.['privy-token'] || req.headers?.authorization?.replace('Bearer ', '');

  let user: UserContext = { isAuthenticated: false };

  if (authToken) {
    try {
      const { verifyPrivyTokenFast } = await import('@/lib/auth-utils');
      user = await verifyPrivyTokenFast(authToken);
    } catch {
      // Token invalid, continue as unauthenticated
    }
  }

  return {
    prisma,
    user,
    getFullUser: async () => {
      if (!authToken || !user.isAuthenticated) {
        return { isAuthenticated: false };
      }

      try {
        const { getUserFromPrivyToken } = await import('@/lib/auth-utils');
        return await getUserFromPrivyToken(authToken);
      } catch {
        return { isAuthenticated: false };
      }
    }
  };
}
