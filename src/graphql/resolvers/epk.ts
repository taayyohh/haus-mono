import { GraphQLContext } from '@/graphql/context';

export const epkResolvers = {
  Query: {
    epk: async (_: any, { id }: { id: string }, context: GraphQLContext) => {
      return context.prisma.ePK.findUnique({
        where: { id },
        include: {
          artist: true,
          album: true,
          pressLinks: { orderBy: { sortOrder: 'asc' } },
          photos: { orderBy: { sortOrder: 'asc' } },
          tourGraphics: { orderBy: { sortOrder: 'asc' } },
        },
      });
    },
    epkBySlug: async (_: any, { slug }: { slug: string }, context: GraphQLContext) => {
      return context.prisma.ePK.findUnique({
        where: { slug },
        include: {
          artist: true,
          album: true,
          pressLinks: { orderBy: { sortOrder: 'asc' } },
          photos: { orderBy: { sortOrder: 'asc' } },
          tourGraphics: { orderBy: { sortOrder: 'asc' } },
        },
      });
    },
    epksByArtist: async (_: any, { artistSlug }: { artistSlug: string }, context: GraphQLContext) => {
      const artist = await context.prisma.artist.findUnique({ where: { slug: artistSlug } });
      if (!artist) return [];
      return context.prisma.ePK.findMany({
        where: { artistId: artist.id, isPublished: true },
        include: { artist: true, album: true },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  EPK: {
    artist: async (epk: any, _: any, context: GraphQLContext) => {
      if (epk.artist) return epk.artist;
      return context.prisma.artist.findUnique({ where: { id: epk.artistId } });
    },
    album: async (epk: any, _: any, context: GraphQLContext) => {
      if (epk.album) return epk.album;
      if (!epk.albumId) return null;
      return context.prisma.album.findUnique({ where: { id: epk.albumId } });
    },
    pressLinks: async (epk: any, _: any, context: GraphQLContext) => {
      if (epk.pressLinks) return epk.pressLinks;
      return context.prisma.ePKPressLink.findMany({
        where: { epkId: epk.id },
        orderBy: { sortOrder: 'asc' },
      });
    },
    photos: async (epk: any, _: any, context: GraphQLContext) => {
      if (epk.photos) return epk.photos;
      return context.prisma.ePKPhoto.findMany({
        where: { epkId: epk.id },
        orderBy: { sortOrder: 'asc' },
      });
    },
    tourGraphics: async (epk: any, _: any, context: GraphQLContext) => {
      if (epk.tourGraphics) return epk.tourGraphics;
      return context.prisma.ePKTourGraphic.findMany({
        where: { epkId: epk.id },
        orderBy: { sortOrder: 'asc' },
      });
    },
  },
};
