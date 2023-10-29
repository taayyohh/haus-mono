import { ZoraCreateTokenQuery } from '@/graphql/sdk.generated'


export function generateMintCommentEndpoints(tokens: ZoraCreateTokenQuery['zoraCreateTokens']): string[] {
  return tokens.map((token) => {
    const { address, tokenId } = token
    return `https://api.zora.co/discover/mint_comments/ZORA-MAINNET/${address}?token_id=${tokenId}&limit=12&sort_direction=DESC`
  })
}
