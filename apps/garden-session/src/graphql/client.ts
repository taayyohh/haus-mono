import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk.generated'
import config from '@/constants/config'

/** Select a subgraph SDK for a specified chain ID */
export const sdk = () => getSdk(new GraphQLClient(config.graphClient!))
