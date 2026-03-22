import { artistResolvers } from './artist';
import { albumResolvers } from './album';
import { productResolvers } from './product';
import { cartResolvers } from './cart';
import { orderResolvers } from './order';
import { epkResolvers } from './epk';
import { userResolvers } from './user';
import { adminResolvers } from './admin';

export const resolvers = {
  Query: {
    ...artistResolvers.Query,
    ...albumResolvers.Query,
    ...productResolvers.Query,
    ...cartResolvers.Query,
    ...orderResolvers.Query,
    ...epkResolvers.Query,
    ...userResolvers.Query,
    ...adminResolvers.Query,
  },
  Mutation: {
    ...artistResolvers.Mutation,
    ...albumResolvers.Mutation,
    ...productResolvers.Mutation,
    ...cartResolvers.Mutation,
    ...orderResolvers.Mutation,
    ...userResolvers.Mutation,
    ...adminResolvers.Mutation,
  },
  Album: albumResolvers.Album,
  EPK: epkResolvers.EPK,
  CartItem: cartResolvers.CartItem,
  OrderItem: orderResolvers.OrderItem,
};
