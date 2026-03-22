import { PrivyClient } from '@privy-io/server-auth';
import { UserContext } from '@/graphql/context';

const userCache = new Map<string, { user: UserContext; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;
const MAX_CACHE_SIZE = 1000;

function evictExpiredEntries() {
  if (userCache.size <= MAX_CACHE_SIZE) return;
  const now = Date.now();
  for (const [key, value] of userCache) {
    if (now - value.timestamp >= CACHE_TTL) {
      userCache.delete(key);
    }
  }
}

export async function getUserFromPrivyToken(token: string): Promise<UserContext> {
  try {
    const cached = userCache.get(token);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.user;
    }

    const privy = new PrivyClient(
      process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      process.env.PRIVY_APP_SECRET!
    );

    const verifiedUser = await privy.verifyAuthToken(token);
    const userDetails = await privy.getUser(verifiedUser.userId);

    const email = userDetails.email?.address;
    const walletAddress = userDetails.wallet?.address;

    if (!email && !walletAddress) {
      return { isAuthenticated: false };
    }

    const { prisma } = await import('@/lib/prisma');

    // Find user by email or create if doesn't exist
    let dbUser = email
      ? await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, role: true, walletAddress: true },
        })
      : null;

    if (!dbUser && email) {
      dbUser = await prisma.user.create({
        data: {
          email,
          privyUserId: verifiedUser.userId,
          walletAddress: walletAddress || null,
        },
        select: { id: true, email: true, role: true, walletAddress: true },
      });
    }

    const user: UserContext = dbUser
      ? {
          dbUserId: dbUser.id,
          email: dbUser.email,
          role: dbUser.role,
          isAuthenticated: true,
          privyUserId: verifiedUser.userId,
        }
      : { isAuthenticated: false };

    evictExpiredEntries();
    userCache.set(token, { user, timestamp: Date.now() });

    return user;
  } catch {
    return { isAuthenticated: false };
  }
}

export async function verifyPrivyTokenFast(token: string): Promise<UserContext> {
  try {
    const privy = new PrivyClient(
      process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
      process.env.PRIVY_APP_SECRET!
    );

    const verifiedUser = await privy.verifyAuthToken(token);

    return {
      isAuthenticated: true,
      privyUserId: verifiedUser.userId,
    };
  } catch {
    return { isAuthenticated: false };
  }
}
