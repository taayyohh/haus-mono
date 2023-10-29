import { z, ZodSchema } from 'zod'

export type TokenStandard = (typeof TokenStandard)[keyof typeof TokenStandard]

export const TokenStandard = {
  ERC721: 'ERC721',
  ERC1155: 'ERC1155',
} as const

export interface TransactionInfo {
  block_number: number
  block_timestamp: string
  transaction_hash: string
}

export type ChainName = (typeof ChainName)[keyof typeof ChainName]

export const ChainName = {
  'ETHEREUM-MAINNET': 'ETHEREUM-MAINNET',
  'ETHEREUM-ROPSTEN': 'ETHEREUM-ROPSTEN',
  'ETHEREUM-RINKEBY': 'ETHEREUM-RINKEBY',
  'ETHEREUM-GOERLI': 'ETHEREUM-GOERLI',
  'ETHEREUM-SEPOLIA': 'ETHEREUM-SEPOLIA',
  'OPTIMISM-MAINNET': 'OPTIMISM-MAINNET',
  'OPTIMISM-GOERLI': 'OPTIMISM-GOERLI',
  'ZORA-GOERLI': 'ZORA-GOERLI',
  'ZORA-MAINNET': 'ZORA-MAINNET',
  'BASE-MAINNET': 'BASE-MAINNET',
  'BASE-GOERLI': 'BASE-GOERLI',
  'PGN-MAINNET': 'PGN-MAINNET',
} as const

const TokenStandardSchema: ZodSchema<TokenStandard> = z.enum(['ERC721', 'ERC1155'])

const ChainNameSchema: ZodSchema<ChainName> = z.enum(['ZORA-MAINNET'])

const TransactionInfoSchema: ZodSchema<TransactionInfo> = z.object({
  block_number: z.number(),
  block_timestamp: z.string(),
  transaction_hash: z.string(),
})

export interface MintComment {
  chain_name: ChainName
  collection_address: string
  token_id?: string
  token_standard?: TokenStandard | null
  from_address: string
  comment: string
  quantity: number
  transaction_info: TransactionInfo
}

const MintCommentSchema: ZodSchema<MintComment> = z.object({
  chain_name: ChainNameSchema,
  collection_address: z.string(),
  token_id: z.string().optional(),
  token_standard: TokenStandardSchema.nullable(),
  from_address: z.string(),
  comment: z.string(),
  quantity: z.number(),
  transaction_info: TransactionInfoSchema,
})

export { MintCommentSchema }
