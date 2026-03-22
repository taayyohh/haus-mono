import { GraphQLContext } from '@/graphql/context';
import slugify from 'slugify';

async function requireAdmin(context: GraphQLContext) {
  const user = await context.getFullUser();
  if (!user?.isAuthenticated || user.role !== 'ADMIN') {
    throw new Error('Admin access required');
  }
  return user;
}

export const albumResolvers = {
  Query: {
    albums: async (_: any, __: any, context: GraphQLContext) => {
      return context.prisma.album.findMany({
        where: { isActive: true },
        include: { primaryArtist: true, genre: true, tracks: { orderBy: { trackNumber: 'asc' } } },
        orderBy: { releaseDate: 'desc' },
      });
    },
    album: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.album.findUnique({
        where: { id },
        include: { primaryArtist: true, artists: true, genre: true, tracks: { orderBy: { trackNumber: 'asc' } } },
      });
    },
    albumBySlug: async (_: any, { slug }: { slug: string }, context: GraphQLContext) => {
      return context.prisma.album.findUnique({
        where: { slug },
        include: { primaryArtist: true, artists: true, genre: true, tracks: { orderBy: { trackNumber: 'asc' } } },
      });
    },
    albumsByArtist: async (_: any, { artistId }: { artistId: string }, context: GraphQLContext) => {
      return context.prisma.album.findMany({
        where: { primaryArtistId: artistId, isActive: true },
        include: { primaryArtist: true, genre: true, tracks: true },
        orderBy: { releaseDate: 'desc' },
      });
    },
    genres: async (_: any, __: any, context: GraphQLContext) => {
      return context.prisma.genre.findMany({ orderBy: { name: 'asc' } });
    },
  },
  Mutation: {
    createAlbum: async (_: any, { input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const slug = slugify(input.title, { lower: true, remove: /[*+~.()'"!:@]/g });
      const { genreId, ...rest } = input;
      return context.prisma.album.create({
        data: {
          ...rest,
          slug,
          genre: genreId ? { connect: { id: genreId } } : undefined,
        },
        include: { primaryArtist: true, genre: true },
      });
    },
    updateAlbum: async (_: any, { id, input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      const data: any = { ...input };
      if (input.title) {
        data.slug = slugify(input.title, { lower: true, remove: /[*+~.()'"!:@]/g });
      }
      if (input.genreId) {
        data.genre = { connect: { id: input.genreId } };
        delete data.genreId;
      }
      return context.prisma.album.update({
        where: { id },
        data,
        include: { primaryArtist: true, genre: true, tracks: true },
      });
    },
    addTrack: async (_: any, { input }: any, context: GraphQLContext) => {
      await requireAdmin(context);
      return context.prisma.track.create({ data: input });
    },
    removeTrack: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      await requireAdmin(context);
      await context.prisma.track.delete({ where: { id } });
      return true;
    },
  },
  Album: {
    primaryArtist: async (album: any, _: any, context: GraphQLContext) => {
      if (album.primaryArtist) return album.primaryArtist;
      return context.prisma.artist.findUnique({ where: { id: album.primaryArtistId } });
    },
    tracks: async (album: any, _: any, context: GraphQLContext) => {
      if (album.tracks) return album.tracks;
      return context.prisma.track.findMany({
        where: { albumId: album.id },
        orderBy: { trackNumber: 'asc' },
      });
    },
  },
};
