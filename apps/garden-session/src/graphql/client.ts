import { GraphQLClient } from 'graphql-request'
import { getSdk } from './sdk.generated'

/** Select a subgraph SDK for a specified chain ID */
export const sdk = () =>
  getSdk(
    new GraphQLClient(
      'https://api.goldsky.com/api/public/project_clhk16b61ay9t49vm6ntn4mkz/subgraphs/zora-create-zora-mainnet/stable/gn'
    )
  )
