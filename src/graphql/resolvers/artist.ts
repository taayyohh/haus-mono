import { GraphQLContext } from '@/graphql/context';
import slugify from 'slugify';

async function requireAdmin(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export const artistResolvers = {
  Query: {
    artists: async (_: any, __: any, context: GraphQLContext) => {
      return context.prisma.artist.findMany({
        where: { isActive: true },
        include: { albums: true },
        orderBy: { name: 'asc' },
      });
    },
    artist: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.artist.findUnique({
        where: { id },
        include: { albums: { include: { tracks: true } }, videos: true, epks: true },
      });
    },
    artistBySlug: async (_: any, { slug }: { slug: string }, context: GraphQLContext) => {
      return context.prisma.artist.findUnique({
        where: { slug },
        include: { albums: { include: { tracks: true } }, videos: true, epks: { where: { isPublished: true } } },
      });
    },
  },
  Mutation: {
    createArtist: async (_: any, { input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const slug = slugify(input.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      return context.prisma.artist.create({
        data: { ...input, slug },
      });
    },
    updateArtist: async (_: any, { id, input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const data: any = { ...input };
      if (input.name) {
        data.slug = slugify(input.name, { lower: true, remove: /[*+~.()'"!:@]/g });
      }
      return context.prisma.artist.update({
        where: { id },
        data,
      });
    },
  },
};
