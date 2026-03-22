import { graphql } from 'graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from '@/graphql/resolvers';
import { createContext } from '@/graphql/context';
import { NextRequest } from 'next/server';

const unifiedSchema = `
scalar DateTime

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

# === MUSIC DOMAIN ===

type Artist {
  id: ID!
  name: String!
  slug: String!
  bio: String!
  heroImage: String!
  socialLinks: JSON
  walletAddresses: [String!]!
  ensName: String
  albums: [Album!]!
  videos: [MusicVideo!]!
  epks: [EPK!]!
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Genre {
  id: ID!
  name: String!
  slug: String!
}

type Album {
  id: ID!
  title: String!
  slug: String!
  releaseDate: DateTime
  coverImageUri: String
  primaryArtist: Artist!
  artists: [Artist!]!
  genre: Genre
  tracks: [Track!]!
  label: String
  producers: [String!]!
  mixers: [String!]!
  masteringEngineers: [String!]!
  recordingEngineers: [String!]!
  studios: [String!]!
  additionalMusicians: [String!]!
  albumNotes: String
  catalogNumber: String
  collectionAddress: String
  isActive: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type Track {
  id: ID!
  title: String!
  duration: Int
  trackNumber: Int!
  featuredArtists: [String!]!
  writers: [String!]!
  producers: [String!]!
  tokenId: String
  audioUrl: String
}

type MusicVideo {
  id: ID!
  title: String!
  slug: String!
  releaseDate: DateTime
  song: String
  primaryArtist: Artist!
  artists: [Artist!]!
  album: Album
  videoUri: String!
  thumbnailUri: String
  director: String
  isActive: Boolean!
  createdAt: DateTime!
}

# === EPK ===

type EPK {
  id: ID!
  title: String!
  slug: String!
  type: String!
  artist: Artist!
  album: Album
  bio: String!
  heroVideoSrc: String
  heroVideoPoster: String
  pressLinks: [EPKPressLink!]!
  photos: [EPKPhoto!]!
  tourGraphics: [EPKTourGraphic!]!
  liveVideos: JSON
  isPublished: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type EPKPressLink {
  id: ID!
  outlet: String!
  url: String!
  description: String
  sortOrder: Int!
}

type EPKPhoto {
  id: ID!
  src: String!
  alt: String!
  sortOrder: Int!
}

type EPKTourGraphic {
  id: ID!
  src: String!
  title: String!
  sortOrder: Int!
}

# === SHOP ===

type Product {
  id: ID!
  name: String!
  slug: String!
  description: String!
  price: Float!
  images: [String!]!
  category: String!
  stock: [ProductStock!]!
  quantity: Int!
  stripeProductId: String
  stripePriceId: String
  isActive: Boolean!
  isArchived: Boolean!
  isFeatured: Boolean!
  createdAt: DateTime!
  updatedAt: DateTime!
}

type ProductStock {
  id: ID!
  size: String!
  quantity: Int!
}

type CartItem {
  id: ID!
  product: Product!
  quantity: Int!
  price: Float!
  size: String
}

type Cart {
  id: ID!
  items: [CartItem!]!
  total: Float!
}

type OrderItem {
  id: ID!
  name: String!
  quantity: Int!
  price: Float!
  size: String
  product: Product
}

type Order {
  id: ID!
  total: Float!
  status: String!
  shippingAmount: Float!
  taxAmount: Float!
  shippingAddress: JSON
  trackingNumber: String
  items: [OrderItem!]!
  user: User
  createdAt: DateTime!
  updatedAt: DateTime!
}

type User {
  id: ID!
  email: String!
  firstName: String
  lastName: String
  role: String!
  walletAddress: String
  createdAt: DateTime!
}

# === ADMIN ===

type AdminMetrics {
  totalOrders: Int!
  totalRevenue: Float!
  artistCount: Int!
  albumCount: Int!
  pendingOrders: Int!
}

# === INPUTS ===

input CreateArtistInput {
  name: String!
  bio: String!
  heroImage: String!
  socialLinks: JSON
  walletAddresses: [String!]
  ensName: String
}

input UpdateArtistInput {
  name: String
  bio: String
  heroImage: String
  socialLinks: JSON
  walletAddresses: [String!]
  ensName: String
  isActive: Boolean
}

input CreateAlbumInput {
  title: String!
  primaryArtistId: ID!
  releaseDate: DateTime
  coverImageUri: String
  genreId: ID
  label: String
  producers: [String!]
  mixers: [String!]
  masteringEngineers: [String!]
  recordingEngineers: [String!]
  studios: [String!]
  additionalMusicians: [String!]
  albumNotes: String
  catalogNumber: String
  collectionAddress: String
}

input UpdateAlbumInput {
  title: String
  releaseDate: DateTime
  coverImageUri: String
  genreId: ID
  label: String
  producers: [String!]
  mixers: [String!]
  masteringEngineers: [String!]
  recordingEngineers: [String!]
  studios: [String!]
  additionalMusicians: [String!]
  albumNotes: String
  catalogNumber: String
  collectionAddress: String
  isActive: Boolean
}

input CreateTrackInput {
  title: String!
  duration: Int
  trackNumber: Int!
  albumId: ID!
  featuredArtists: [String!]
  writers: [String!]
  producers: [String!]
  tokenId: String
  audioUrl: String
}

input CreateProductInput {
  name: String!
  description: String!
  price: Float!
  images: [String!]!
  category: String
  quantity: Int
  stock: [StockInput!]
}

input UpdateProductInput {
  name: String
  description: String
  price: Float
  images: [String!]
  category: String
  quantity: Int
  stock: [StockInput!]
  isActive: Boolean
  isArchived: Boolean
}

input StockInput {
  size: String!
  quantity: Int!
}

input AddToCartInput {
  productId: ID!
  quantity: Int!
  size: String
}

input UpdateUserInput {
  firstName: String
  lastName: String
}

scalar JSON

# === QUERIES & MUTATIONS ===

type Query {
  # Artists
  artists: [Artist!]!
  artist(id: ID!): Artist
  artistBySlug(slug: String!): Artist

  # Albums
  albums: [Album!]!
  album(id: ID!): Album
  albumBySlug(slug: String!): Album
  albumsByArtist(artistId: ID!): [Album!]!

  # Videos
  videos: [MusicVideo!]!
  video(id: ID!): MusicVideo

  # Genres
  genres: [Genre!]!

  # EPK
  epk(id: ID!): EPK
  epkBySlug(slug: String!): EPK
  epksByArtist(artistSlug: String!): [EPK!]!

  # Shop
  products(category: String, search: String): [Product!]!
  product(id: ID!): Product
  productBySlug(slug: String!): Product
  cart: Cart
  featuredProduct: Product

  # User
  currentUser: User
  userOrders: [Order!]!

  # Admin
  adminMetrics: AdminMetrics!
  adminOrders(limit: Int, offset: Int, status: String): [Order!]!
  adminOrder(orderId: String!): Order
  adminUsers(role: String, limit: Int, offset: Int): [User!]!
}

type Mutation {
  # Artists
  createArtist(input: CreateArtistInput!): Artist!
  updateArtist(id: ID!, input: UpdateArtistInput!): Artist!

  # Albums
  createAlbum(input: CreateAlbumInput!): Album!
  updateAlbum(id: ID!, input: UpdateAlbumInput!): Album!
  addTrack(input: CreateTrackInput!): Track!
  removeTrack(id: ID!): Boolean!

  # Products
  createProduct(input: CreateProductInput!): Product!
  updateProduct(id: ID!, input: UpdateProductInput!): Product!
  toggleProductStatus(id: ID!): Product!

  # Cart
  addToCart(input: AddToCartInput!): Cart!
  removeFromCart(cartItemId: ID!): Cart!
  updateCartItem(cartItemId: ID!, quantity: Int!): Cart!
  clearCart: Cart!

  # Orders
  updateOrderStatus(orderId: ID!, status: String!): Order!

  # User
  updateUser(input: UpdateUserInput!): User!
  setUserRole(email: String!, role: String!): User!
}
`;

const schema = makeExecutableSchema({
  typeDefs: [unifiedSchema],
  resolvers,
});

export async function executeQuery(
  query: string,
  variables: Record<string, unknown>,
  request?: NextRequest
) {
  const req = {
    headers: request ? Object.fromEntries(request.headers) : {},
    cookies: request?.cookies
      ? Object.fromEntries(request.cookies.getAll().map(c => [c.name, c.value]))
      : {}
  };

  const context = await createContext({ req });

  const result = await graphql({
    schema,
    source: query,
    variableValues: variables,
    contextValue: context,
  });

  if (result.errors) {
    return { errors: result.errors.map(e => e.message) };
  }

  return result.data;
}
