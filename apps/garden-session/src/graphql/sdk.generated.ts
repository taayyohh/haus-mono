import { Address } from 'wagmi'
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: Address
  String: string
  Boolean: boolean
  Int: number
  Float: number
  BigDecimal: string
  BigInt: string
  Bytes: Address
  Int8: any
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int']
}

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>
  number?: InputMaybe<Scalars['Int']>
  number_gte?: InputMaybe<Scalars['Int']>
}

export type DropMetadata = {
  __typename?: 'DropMetadata'
  base: Scalars['String']
  contractURI: Scalars['String']
  extension: Scalars['String']
  freezeAt: Scalars['BigInt']
  id: Scalars['ID']
}

export type DropMetadata_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<DropMetadata_Filter>>>
  base?: InputMaybe<Scalars['String']>
  base_contains?: InputMaybe<Scalars['String']>
  base_contains_nocase?: InputMaybe<Scalars['String']>
  base_ends_with?: InputMaybe<Scalars['String']>
  base_ends_with_nocase?: InputMaybe<Scalars['String']>
  base_gt?: InputMaybe<Scalars['String']>
  base_gte?: InputMaybe<Scalars['String']>
  base_in?: InputMaybe<Array<Scalars['String']>>
  base_lt?: InputMaybe<Scalars['String']>
  base_lte?: InputMaybe<Scalars['String']>
  base_not?: InputMaybe<Scalars['String']>
  base_not_contains?: InputMaybe<Scalars['String']>
  base_not_contains_nocase?: InputMaybe<Scalars['String']>
  base_not_ends_with?: InputMaybe<Scalars['String']>
  base_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  base_not_in?: InputMaybe<Array<Scalars['String']>>
  base_not_starts_with?: InputMaybe<Scalars['String']>
  base_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  base_starts_with?: InputMaybe<Scalars['String']>
  base_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI?: InputMaybe<Scalars['String']>
  contractURI_contains?: InputMaybe<Scalars['String']>
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_ends_with?: InputMaybe<Scalars['String']>
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_gt?: InputMaybe<Scalars['String']>
  contractURI_gte?: InputMaybe<Scalars['String']>
  contractURI_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_lt?: InputMaybe<Scalars['String']>
  contractURI_lte?: InputMaybe<Scalars['String']>
  contractURI_not?: InputMaybe<Scalars['String']>
  contractURI_not_contains?: InputMaybe<Scalars['String']>
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_starts_with?: InputMaybe<Scalars['String']>
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  extension?: InputMaybe<Scalars['String']>
  extension_contains?: InputMaybe<Scalars['String']>
  extension_contains_nocase?: InputMaybe<Scalars['String']>
  extension_ends_with?: InputMaybe<Scalars['String']>
  extension_ends_with_nocase?: InputMaybe<Scalars['String']>
  extension_gt?: InputMaybe<Scalars['String']>
  extension_gte?: InputMaybe<Scalars['String']>
  extension_in?: InputMaybe<Array<Scalars['String']>>
  extension_lt?: InputMaybe<Scalars['String']>
  extension_lte?: InputMaybe<Scalars['String']>
  extension_not?: InputMaybe<Scalars['String']>
  extension_not_contains?: InputMaybe<Scalars['String']>
  extension_not_contains_nocase?: InputMaybe<Scalars['String']>
  extension_not_ends_with?: InputMaybe<Scalars['String']>
  extension_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  extension_not_in?: InputMaybe<Array<Scalars['String']>>
  extension_not_starts_with?: InputMaybe<Scalars['String']>
  extension_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  extension_starts_with?: InputMaybe<Scalars['String']>
  extension_starts_with_nocase?: InputMaybe<Scalars['String']>
  freezeAt?: InputMaybe<Scalars['BigInt']>
  freezeAt_gt?: InputMaybe<Scalars['BigInt']>
  freezeAt_gte?: InputMaybe<Scalars['BigInt']>
  freezeAt_in?: InputMaybe<Array<Scalars['BigInt']>>
  freezeAt_lt?: InputMaybe<Scalars['BigInt']>
  freezeAt_lte?: InputMaybe<Scalars['BigInt']>
  freezeAt_not?: InputMaybe<Scalars['BigInt']>
  freezeAt_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<DropMetadata_Filter>>>
}

export enum DropMetadata_OrderBy {
  Base = 'base',
  ContractUri = 'contractURI',
  Extension = 'extension',
  FreezeAt = 'freezeAt',
  Id = 'id',
}

export type EditionMetadata = {
  __typename?: 'EditionMetadata'
  animationURI: Scalars['String']
  description: Scalars['String']
  id: Scalars['ID']
  imageURI: Scalars['String']
}

export type EditionMetadata_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<EditionMetadata_Filter>>>
  animationURI?: InputMaybe<Scalars['String']>
  animationURI_contains?: InputMaybe<Scalars['String']>
  animationURI_contains_nocase?: InputMaybe<Scalars['String']>
  animationURI_ends_with?: InputMaybe<Scalars['String']>
  animationURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  animationURI_gt?: InputMaybe<Scalars['String']>
  animationURI_gte?: InputMaybe<Scalars['String']>
  animationURI_in?: InputMaybe<Array<Scalars['String']>>
  animationURI_lt?: InputMaybe<Scalars['String']>
  animationURI_lte?: InputMaybe<Scalars['String']>
  animationURI_not?: InputMaybe<Scalars['String']>
  animationURI_not_contains?: InputMaybe<Scalars['String']>
  animationURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  animationURI_not_ends_with?: InputMaybe<Scalars['String']>
  animationURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  animationURI_not_in?: InputMaybe<Array<Scalars['String']>>
  animationURI_not_starts_with?: InputMaybe<Scalars['String']>
  animationURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  animationURI_starts_with?: InputMaybe<Scalars['String']>
  animationURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  description_contains?: InputMaybe<Scalars['String']>
  description_contains_nocase?: InputMaybe<Scalars['String']>
  description_ends_with?: InputMaybe<Scalars['String']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_gt?: InputMaybe<Scalars['String']>
  description_gte?: InputMaybe<Scalars['String']>
  description_in?: InputMaybe<Array<Scalars['String']>>
  description_lt?: InputMaybe<Scalars['String']>
  description_lte?: InputMaybe<Scalars['String']>
  description_not?: InputMaybe<Scalars['String']>
  description_not_contains?: InputMaybe<Scalars['String']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']>
  description_not_ends_with?: InputMaybe<Scalars['String']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_not_in?: InputMaybe<Array<Scalars['String']>>
  description_not_starts_with?: InputMaybe<Scalars['String']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  description_starts_with?: InputMaybe<Scalars['String']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  imageURI?: InputMaybe<Scalars['String']>
  imageURI_contains?: InputMaybe<Scalars['String']>
  imageURI_contains_nocase?: InputMaybe<Scalars['String']>
  imageURI_ends_with?: InputMaybe<Scalars['String']>
  imageURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  imageURI_gt?: InputMaybe<Scalars['String']>
  imageURI_gte?: InputMaybe<Scalars['String']>
  imageURI_in?: InputMaybe<Array<Scalars['String']>>
  imageURI_lt?: InputMaybe<Scalars['String']>
  imageURI_lte?: InputMaybe<Scalars['String']>
  imageURI_not?: InputMaybe<Scalars['String']>
  imageURI_not_contains?: InputMaybe<Scalars['String']>
  imageURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  imageURI_not_ends_with?: InputMaybe<Scalars['String']>
  imageURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  imageURI_not_in?: InputMaybe<Array<Scalars['String']>>
  imageURI_not_starts_with?: InputMaybe<Scalars['String']>
  imageURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  imageURI_starts_with?: InputMaybe<Scalars['String']>
  imageURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<EditionMetadata_Filter>>>
}

export enum EditionMetadata_OrderBy {
  AnimationUri = 'animationURI',
  Description = 'description',
  Id = 'id',
  ImageUri = 'imageURI',
}

export type KnownRenderer = {
  __typename?: 'KnownRenderer'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  id: Scalars['ID']
  isEdition?: Maybe<Scalars['Boolean']>
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
}

export type KnownRenderer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<KnownRenderer_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  isEdition?: InputMaybe<Scalars['Boolean']>
  isEdition_in?: InputMaybe<Array<Scalars['Boolean']>>
  isEdition_not?: InputMaybe<Scalars['Boolean']>
  isEdition_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  or?: InputMaybe<Array<InputMaybe<KnownRenderer_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum KnownRenderer_OrderBy {
  Address = 'address',
  Block = 'block',
  Id = 'id',
  IsEdition = 'isEdition',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type MetadataInfo = {
  __typename?: 'MetadataInfo'
  animationUrl?: Maybe<Scalars['String']>
  decimals?: Maybe<Scalars['String']>
  description?: Maybe<Scalars['String']>
  id: Scalars['ID']
  image?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  rawJson?: Maybe<Scalars['String']>
}

export type MetadataInfo_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<MetadataInfo_Filter>>>
  animationUrl?: InputMaybe<Scalars['String']>
  animationUrl_contains?: InputMaybe<Scalars['String']>
  animationUrl_contains_nocase?: InputMaybe<Scalars['String']>
  animationUrl_ends_with?: InputMaybe<Scalars['String']>
  animationUrl_ends_with_nocase?: InputMaybe<Scalars['String']>
  animationUrl_gt?: InputMaybe<Scalars['String']>
  animationUrl_gte?: InputMaybe<Scalars['String']>
  animationUrl_in?: InputMaybe<Array<Scalars['String']>>
  animationUrl_lt?: InputMaybe<Scalars['String']>
  animationUrl_lte?: InputMaybe<Scalars['String']>
  animationUrl_not?: InputMaybe<Scalars['String']>
  animationUrl_not_contains?: InputMaybe<Scalars['String']>
  animationUrl_not_contains_nocase?: InputMaybe<Scalars['String']>
  animationUrl_not_ends_with?: InputMaybe<Scalars['String']>
  animationUrl_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  animationUrl_not_in?: InputMaybe<Array<Scalars['String']>>
  animationUrl_not_starts_with?: InputMaybe<Scalars['String']>
  animationUrl_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  animationUrl_starts_with?: InputMaybe<Scalars['String']>
  animationUrl_starts_with_nocase?: InputMaybe<Scalars['String']>
  decimals?: InputMaybe<Scalars['String']>
  decimals_contains?: InputMaybe<Scalars['String']>
  decimals_contains_nocase?: InputMaybe<Scalars['String']>
  decimals_ends_with?: InputMaybe<Scalars['String']>
  decimals_ends_with_nocase?: InputMaybe<Scalars['String']>
  decimals_gt?: InputMaybe<Scalars['String']>
  decimals_gte?: InputMaybe<Scalars['String']>
  decimals_in?: InputMaybe<Array<Scalars['String']>>
  decimals_lt?: InputMaybe<Scalars['String']>
  decimals_lte?: InputMaybe<Scalars['String']>
  decimals_not?: InputMaybe<Scalars['String']>
  decimals_not_contains?: InputMaybe<Scalars['String']>
  decimals_not_contains_nocase?: InputMaybe<Scalars['String']>
  decimals_not_ends_with?: InputMaybe<Scalars['String']>
  decimals_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  decimals_not_in?: InputMaybe<Array<Scalars['String']>>
  decimals_not_starts_with?: InputMaybe<Scalars['String']>
  decimals_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  decimals_starts_with?: InputMaybe<Scalars['String']>
  decimals_starts_with_nocase?: InputMaybe<Scalars['String']>
  description?: InputMaybe<Scalars['String']>
  description_contains?: InputMaybe<Scalars['String']>
  description_contains_nocase?: InputMaybe<Scalars['String']>
  description_ends_with?: InputMaybe<Scalars['String']>
  description_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_gt?: InputMaybe<Scalars['String']>
  description_gte?: InputMaybe<Scalars['String']>
  description_in?: InputMaybe<Array<Scalars['String']>>
  description_lt?: InputMaybe<Scalars['String']>
  description_lte?: InputMaybe<Scalars['String']>
  description_not?: InputMaybe<Scalars['String']>
  description_not_contains?: InputMaybe<Scalars['String']>
  description_not_contains_nocase?: InputMaybe<Scalars['String']>
  description_not_ends_with?: InputMaybe<Scalars['String']>
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  description_not_in?: InputMaybe<Array<Scalars['String']>>
  description_not_starts_with?: InputMaybe<Scalars['String']>
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  description_starts_with?: InputMaybe<Scalars['String']>
  description_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  image?: InputMaybe<Scalars['String']>
  image_contains?: InputMaybe<Scalars['String']>
  image_contains_nocase?: InputMaybe<Scalars['String']>
  image_ends_with?: InputMaybe<Scalars['String']>
  image_ends_with_nocase?: InputMaybe<Scalars['String']>
  image_gt?: InputMaybe<Scalars['String']>
  image_gte?: InputMaybe<Scalars['String']>
  image_in?: InputMaybe<Array<Scalars['String']>>
  image_lt?: InputMaybe<Scalars['String']>
  image_lte?: InputMaybe<Scalars['String']>
  image_not?: InputMaybe<Scalars['String']>
  image_not_contains?: InputMaybe<Scalars['String']>
  image_not_contains_nocase?: InputMaybe<Scalars['String']>
  image_not_ends_with?: InputMaybe<Scalars['String']>
  image_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  image_not_in?: InputMaybe<Array<Scalars['String']>>
  image_not_starts_with?: InputMaybe<Scalars['String']>
  image_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  image_starts_with?: InputMaybe<Scalars['String']>
  image_starts_with_nocase?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<MetadataInfo_Filter>>>
  rawJson?: InputMaybe<Scalars['String']>
  rawJson_contains?: InputMaybe<Scalars['String']>
  rawJson_contains_nocase?: InputMaybe<Scalars['String']>
  rawJson_ends_with?: InputMaybe<Scalars['String']>
  rawJson_ends_with_nocase?: InputMaybe<Scalars['String']>
  rawJson_gt?: InputMaybe<Scalars['String']>
  rawJson_gte?: InputMaybe<Scalars['String']>
  rawJson_in?: InputMaybe<Array<Scalars['String']>>
  rawJson_lt?: InputMaybe<Scalars['String']>
  rawJson_lte?: InputMaybe<Scalars['String']>
  rawJson_not?: InputMaybe<Scalars['String']>
  rawJson_not_contains?: InputMaybe<Scalars['String']>
  rawJson_not_contains_nocase?: InputMaybe<Scalars['String']>
  rawJson_not_ends_with?: InputMaybe<Scalars['String']>
  rawJson_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  rawJson_not_in?: InputMaybe<Array<Scalars['String']>>
  rawJson_not_starts_with?: InputMaybe<Scalars['String']>
  rawJson_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  rawJson_starts_with?: InputMaybe<Scalars['String']>
  rawJson_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum MetadataInfo_OrderBy {
  AnimationUrl = 'animationUrl',
  Decimals = 'decimals',
  Description = 'description',
  Id = 'id',
  Image = 'image',
  Name = 'name',
  RawJson = 'rawJson',
}

export type MintComment = {
  __typename?: 'MintComment'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  comment: Scalars['String']
  id: Scalars['ID']
  mintQuantity: Scalars['BigInt']
  sender: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  tokenAndContract: ZoraCreateToken
  tokenId: Scalars['BigInt']
  txn: TransactionInfo
}

export type MintComment_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<MintComment_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  comment?: InputMaybe<Scalars['String']>
  comment_contains?: InputMaybe<Scalars['String']>
  comment_contains_nocase?: InputMaybe<Scalars['String']>
  comment_ends_with?: InputMaybe<Scalars['String']>
  comment_ends_with_nocase?: InputMaybe<Scalars['String']>
  comment_gt?: InputMaybe<Scalars['String']>
  comment_gte?: InputMaybe<Scalars['String']>
  comment_in?: InputMaybe<Array<Scalars['String']>>
  comment_lt?: InputMaybe<Scalars['String']>
  comment_lte?: InputMaybe<Scalars['String']>
  comment_not?: InputMaybe<Scalars['String']>
  comment_not_contains?: InputMaybe<Scalars['String']>
  comment_not_contains_nocase?: InputMaybe<Scalars['String']>
  comment_not_ends_with?: InputMaybe<Scalars['String']>
  comment_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  comment_not_in?: InputMaybe<Array<Scalars['String']>>
  comment_not_starts_with?: InputMaybe<Scalars['String']>
  comment_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  comment_starts_with?: InputMaybe<Scalars['String']>
  comment_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  mintQuantity?: InputMaybe<Scalars['BigInt']>
  mintQuantity_gt?: InputMaybe<Scalars['BigInt']>
  mintQuantity_gte?: InputMaybe<Scalars['BigInt']>
  mintQuantity_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintQuantity_lt?: InputMaybe<Scalars['BigInt']>
  mintQuantity_lte?: InputMaybe<Scalars['BigInt']>
  mintQuantity_not?: InputMaybe<Scalars['BigInt']>
  mintQuantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  or?: InputMaybe<Array<InputMaybe<MintComment_Filter>>>
  sender?: InputMaybe<Scalars['Bytes']>
  sender_contains?: InputMaybe<Scalars['Bytes']>
  sender_gt?: InputMaybe<Scalars['Bytes']>
  sender_gte?: InputMaybe<Scalars['Bytes']>
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>
  sender_lt?: InputMaybe<Scalars['Bytes']>
  sender_lte?: InputMaybe<Scalars['Bytes']>
  sender_not?: InputMaybe<Scalars['Bytes']>
  sender_not_contains?: InputMaybe<Scalars['Bytes']>
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum MintComment_OrderBy {
  Address = 'address',
  Block = 'block',
  Comment = 'comment',
  Id = 'id',
  MintQuantity = 'mintQuantity',
  Sender = 'sender',
  Timestamp = 'timestamp',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  TokenId = 'tokenId',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type OnChainMetadataHistory = {
  __typename?: 'OnChainMetadataHistory'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  createdAtBlock: Scalars['BigInt']
  directURI?: Maybe<Scalars['String']>
  directURIMetadata?: Maybe<MetadataInfo>
  dropMetadata?: Maybe<DropMetadata>
  editionMetadata?: Maybe<EditionMetadata>
  id: Scalars['ID']
  knownType: Scalars['String']
  rendererAddress: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  tokenAndContract: ZoraCreateToken
  txn: TransactionInfo
}

export type OnChainMetadataHistory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<OnChainMetadataHistory_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdAtBlock?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  directURI?: InputMaybe<Scalars['String']>
  directURIMetadata?: InputMaybe<Scalars['String']>
  directURIMetadata_?: InputMaybe<MetadataInfo_Filter>
  directURIMetadata_contains?: InputMaybe<Scalars['String']>
  directURIMetadata_contains_nocase?: InputMaybe<Scalars['String']>
  directURIMetadata_ends_with?: InputMaybe<Scalars['String']>
  directURIMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>
  directURIMetadata_gt?: InputMaybe<Scalars['String']>
  directURIMetadata_gte?: InputMaybe<Scalars['String']>
  directURIMetadata_in?: InputMaybe<Array<Scalars['String']>>
  directURIMetadata_lt?: InputMaybe<Scalars['String']>
  directURIMetadata_lte?: InputMaybe<Scalars['String']>
  directURIMetadata_not?: InputMaybe<Scalars['String']>
  directURIMetadata_not_contains?: InputMaybe<Scalars['String']>
  directURIMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>
  directURIMetadata_not_ends_with?: InputMaybe<Scalars['String']>
  directURIMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  directURIMetadata_not_in?: InputMaybe<Array<Scalars['String']>>
  directURIMetadata_not_starts_with?: InputMaybe<Scalars['String']>
  directURIMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  directURIMetadata_starts_with?: InputMaybe<Scalars['String']>
  directURIMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>
  directURI_contains?: InputMaybe<Scalars['String']>
  directURI_contains_nocase?: InputMaybe<Scalars['String']>
  directURI_ends_with?: InputMaybe<Scalars['String']>
  directURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  directURI_gt?: InputMaybe<Scalars['String']>
  directURI_gte?: InputMaybe<Scalars['String']>
  directURI_in?: InputMaybe<Array<Scalars['String']>>
  directURI_lt?: InputMaybe<Scalars['String']>
  directURI_lte?: InputMaybe<Scalars['String']>
  directURI_not?: InputMaybe<Scalars['String']>
  directURI_not_contains?: InputMaybe<Scalars['String']>
  directURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  directURI_not_ends_with?: InputMaybe<Scalars['String']>
  directURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  directURI_not_in?: InputMaybe<Array<Scalars['String']>>
  directURI_not_starts_with?: InputMaybe<Scalars['String']>
  directURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  directURI_starts_with?: InputMaybe<Scalars['String']>
  directURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  dropMetadata?: InputMaybe<Scalars['String']>
  dropMetadata_?: InputMaybe<DropMetadata_Filter>
  dropMetadata_contains?: InputMaybe<Scalars['String']>
  dropMetadata_contains_nocase?: InputMaybe<Scalars['String']>
  dropMetadata_ends_with?: InputMaybe<Scalars['String']>
  dropMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>
  dropMetadata_gt?: InputMaybe<Scalars['String']>
  dropMetadata_gte?: InputMaybe<Scalars['String']>
  dropMetadata_in?: InputMaybe<Array<Scalars['String']>>
  dropMetadata_lt?: InputMaybe<Scalars['String']>
  dropMetadata_lte?: InputMaybe<Scalars['String']>
  dropMetadata_not?: InputMaybe<Scalars['String']>
  dropMetadata_not_contains?: InputMaybe<Scalars['String']>
  dropMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>
  dropMetadata_not_ends_with?: InputMaybe<Scalars['String']>
  dropMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  dropMetadata_not_in?: InputMaybe<Array<Scalars['String']>>
  dropMetadata_not_starts_with?: InputMaybe<Scalars['String']>
  dropMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  dropMetadata_starts_with?: InputMaybe<Scalars['String']>
  dropMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>
  editionMetadata?: InputMaybe<Scalars['String']>
  editionMetadata_?: InputMaybe<EditionMetadata_Filter>
  editionMetadata_contains?: InputMaybe<Scalars['String']>
  editionMetadata_contains_nocase?: InputMaybe<Scalars['String']>
  editionMetadata_ends_with?: InputMaybe<Scalars['String']>
  editionMetadata_ends_with_nocase?: InputMaybe<Scalars['String']>
  editionMetadata_gt?: InputMaybe<Scalars['String']>
  editionMetadata_gte?: InputMaybe<Scalars['String']>
  editionMetadata_in?: InputMaybe<Array<Scalars['String']>>
  editionMetadata_lt?: InputMaybe<Scalars['String']>
  editionMetadata_lte?: InputMaybe<Scalars['String']>
  editionMetadata_not?: InputMaybe<Scalars['String']>
  editionMetadata_not_contains?: InputMaybe<Scalars['String']>
  editionMetadata_not_contains_nocase?: InputMaybe<Scalars['String']>
  editionMetadata_not_ends_with?: InputMaybe<Scalars['String']>
  editionMetadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  editionMetadata_not_in?: InputMaybe<Array<Scalars['String']>>
  editionMetadata_not_starts_with?: InputMaybe<Scalars['String']>
  editionMetadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  editionMetadata_starts_with?: InputMaybe<Scalars['String']>
  editionMetadata_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  knownType?: InputMaybe<Scalars['String']>
  knownType_contains?: InputMaybe<Scalars['String']>
  knownType_contains_nocase?: InputMaybe<Scalars['String']>
  knownType_ends_with?: InputMaybe<Scalars['String']>
  knownType_ends_with_nocase?: InputMaybe<Scalars['String']>
  knownType_gt?: InputMaybe<Scalars['String']>
  knownType_gte?: InputMaybe<Scalars['String']>
  knownType_in?: InputMaybe<Array<Scalars['String']>>
  knownType_lt?: InputMaybe<Scalars['String']>
  knownType_lte?: InputMaybe<Scalars['String']>
  knownType_not?: InputMaybe<Scalars['String']>
  knownType_not_contains?: InputMaybe<Scalars['String']>
  knownType_not_contains_nocase?: InputMaybe<Scalars['String']>
  knownType_not_ends_with?: InputMaybe<Scalars['String']>
  knownType_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  knownType_not_in?: InputMaybe<Array<Scalars['String']>>
  knownType_not_starts_with?: InputMaybe<Scalars['String']>
  knownType_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  knownType_starts_with?: InputMaybe<Scalars['String']>
  knownType_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<OnChainMetadataHistory_Filter>>>
  rendererAddress?: InputMaybe<Scalars['Bytes']>
  rendererAddress_contains?: InputMaybe<Scalars['Bytes']>
  rendererAddress_gt?: InputMaybe<Scalars['Bytes']>
  rendererAddress_gte?: InputMaybe<Scalars['Bytes']>
  rendererAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  rendererAddress_lt?: InputMaybe<Scalars['Bytes']>
  rendererAddress_lte?: InputMaybe<Scalars['Bytes']>
  rendererAddress_not?: InputMaybe<Scalars['Bytes']>
  rendererAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  rendererAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum OnChainMetadataHistory_OrderBy {
  Address = 'address',
  Block = 'block',
  CreatedAtBlock = 'createdAtBlock',
  DirectUri = 'directURI',
  DirectUriMetadata = 'directURIMetadata',
  DirectUriMetadataAnimationUrl = 'directURIMetadata__animationUrl',
  DirectUriMetadataDecimals = 'directURIMetadata__decimals',
  DirectUriMetadataDescription = 'directURIMetadata__description',
  DirectUriMetadataId = 'directURIMetadata__id',
  DirectUriMetadataImage = 'directURIMetadata__image',
  DirectUriMetadataName = 'directURIMetadata__name',
  DirectUriMetadataRawJson = 'directURIMetadata__rawJson',
  DropMetadata = 'dropMetadata',
  DropMetadataBase = 'dropMetadata__base',
  DropMetadataContractUri = 'dropMetadata__contractURI',
  DropMetadataExtension = 'dropMetadata__extension',
  DropMetadataFreezeAt = 'dropMetadata__freezeAt',
  DropMetadataId = 'dropMetadata__id',
  EditionMetadata = 'editionMetadata',
  EditionMetadataAnimationUri = 'editionMetadata__animationURI',
  EditionMetadataDescription = 'editionMetadata__description',
  EditionMetadataId = 'editionMetadata__id',
  EditionMetadataImageUri = 'editionMetadata__imageURI',
  Id = 'id',
  KnownType = 'knownType',
  RendererAddress = 'rendererAddress',
  Timestamp = 'timestamp',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export type Query = {
  __typename?: 'Query'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  dropMetadata: Array<DropMetadata>
  editionMetadata: Array<EditionMetadata>
  knownRenderer?: Maybe<KnownRenderer>
  knownRenderers: Array<KnownRenderer>
  metadataInfo?: Maybe<MetadataInfo>
  metadataInfos: Array<MetadataInfo>
  mintComment?: Maybe<MintComment>
  mintComments: Array<MintComment>
  onChainMetadataHistories: Array<OnChainMetadataHistory>
  onChainMetadataHistory?: Maybe<OnChainMetadataHistory>
  redeemInstructions: Array<RedeemInstructions>
  redeemMintToken?: Maybe<RedeemMintToken>
  redeemMintTokens: Array<RedeemMintToken>
  redeemMinterProcessed?: Maybe<RedeemMinterProcessed>
  redeemMinterProcesseds: Array<RedeemMinterProcessed>
  redeemProcessedTokenPair?: Maybe<RedeemProcessedTokenPair>
  redeemProcessedTokenPairs: Array<RedeemProcessedTokenPair>
  rewardsAggregate?: Maybe<RewardsAggregate>
  rewardsAggregates: Array<RewardsAggregate>
  rewardsDeposit?: Maybe<RewardsDeposit>
  rewardsDeposits: Array<RewardsDeposit>
  rewardsPerSource?: Maybe<RewardsPerSource>
  rewardsPerSources: Array<RewardsPerSource>
  rewardsPerUser?: Maybe<RewardsPerUser>
  rewardsPerUserPerDay?: Maybe<RewardsPerUserPerDay>
  rewardsPerUserPerDays: Array<RewardsPerUserPerDay>
  rewardsPerUserPerSource?: Maybe<RewardsPerUserPerSource>
  rewardsPerUserPerSources: Array<RewardsPerUserPerSource>
  rewardsPerUserPerType?: Maybe<RewardsPerUserPerType>
  rewardsPerUserPerTypes: Array<RewardsPerUserPerType>
  rewardsPerUsers: Array<RewardsPerUser>
  rewardsSingleDeposit?: Maybe<RewardsSingleDeposit>
  rewardsSingleDeposits: Array<RewardsSingleDeposit>
  rewardsWithdraw?: Maybe<RewardsWithdraw>
  rewardsWithdraws: Array<RewardsWithdraw>
  royaltyConfig?: Maybe<RoyaltyConfig>
  royaltyConfigs: Array<RoyaltyConfig>
  salesConfig?: Maybe<SalesConfig>
  salesConfigFixedPriceSaleStrategies: Array<SalesConfigFixedPriceSaleStrategy>
  salesConfigFixedPriceSaleStrategy?: Maybe<SalesConfigFixedPriceSaleStrategy>
  salesConfigMerkleMinterStrategies: Array<SalesConfigMerkleMinterStrategy>
  salesConfigMerkleMinterStrategy?: Maybe<SalesConfigMerkleMinterStrategy>
  salesConfigRedeemMinterStrategies: Array<SalesConfigRedeemMinterStrategy>
  salesConfigRedeemMinterStrategy?: Maybe<SalesConfigRedeemMinterStrategy>
  salesConfigs: Array<SalesConfig>
  salesStrategyConfig?: Maybe<SalesStrategyConfig>
  salesStrategyConfigs: Array<SalesStrategyConfig>
  token1155Holder?: Maybe<Token1155Holder>
  token1155Holders: Array<Token1155Holder>
  tokenSale?: Maybe<TokenSale>
  tokenSales: Array<TokenSale>
  transactionInfo?: Maybe<TransactionInfo>
  transactionInfos: Array<TransactionInfo>
  upgrade?: Maybe<Upgrade>
  upgrades: Array<Upgrade>
  zoraCreate721Factories: Array<ZoraCreate721Factory>
  zoraCreate721Factory?: Maybe<ZoraCreate721Factory>
  zoraCreate1155Factories: Array<ZoraCreate1155Factory>
  zoraCreate1155Factory?: Maybe<ZoraCreate1155Factory>
  zoraCreateContract?: Maybe<ZoraCreateContract>
  zoraCreateContracts: Array<ZoraCreateContract>
  zoraCreateToken?: Maybe<ZoraCreateToken>
  zoraCreateTokens: Array<ZoraCreateToken>
  zoraCreatorPermission?: Maybe<ZoraCreatorPermission>
  zoraCreatorPermissions: Array<ZoraCreatorPermission>
  zoraCreatorRedeemConfig?: Maybe<ZoraCreatorRedeemConfig>
  zoraCreatorRedeemConfigs: Array<ZoraCreatorRedeemConfig>
}

export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type QueryDropMetadataArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DropMetadata_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DropMetadata_Filter>
}

export type QueryEditionMetadataArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<EditionMetadata_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<EditionMetadata_Filter>
}

export type QueryKnownRendererArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryKnownRenderersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<KnownRenderer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<KnownRenderer_Filter>
}

export type QueryMetadataInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMetadataInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<MetadataInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<MetadataInfo_Filter>
}

export type QueryMintCommentArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryMintCommentsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<MintComment_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<MintComment_Filter>
}

export type QueryOnChainMetadataHistoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OnChainMetadataHistory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OnChainMetadataHistory_Filter>
}

export type QueryOnChainMetadataHistoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRedeemInstructionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemInstructions_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemInstructions_Filter>
}

export type QueryRedeemMintTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRedeemMintTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemMintToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemMintToken_Filter>
}

export type QueryRedeemMinterProcessedArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRedeemMinterProcessedsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemMinterProcessed_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemMinterProcessed_Filter>
}

export type QueryRedeemProcessedTokenPairArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRedeemProcessedTokenPairsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemProcessedTokenPair_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemProcessedTokenPair_Filter>
}

export type QueryRewardsAggregateArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsAggregatesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsAggregate_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsAggregate_Filter>
}

export type QueryRewardsDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsDeposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsDeposit_Filter>
}

export type QueryRewardsPerSourceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsPerSourcesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerSource_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerSource_Filter>
}

export type QueryRewardsPerUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsPerUserPerDayArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsPerUserPerDaysArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerDay_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerDay_Filter>
}

export type QueryRewardsPerUserPerSourceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsPerUserPerSourcesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerSource_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerSource_Filter>
}

export type QueryRewardsPerUserPerTypeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsPerUserPerTypesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerType_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerType_Filter>
}

export type QueryRewardsPerUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUser_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUser_Filter>
}

export type QueryRewardsSingleDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsSingleDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsSingleDeposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsSingleDeposit_Filter>
}

export type QueryRewardsWithdrawArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRewardsWithdrawsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsWithdraw_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsWithdraw_Filter>
}

export type QueryRoyaltyConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryRoyaltyConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RoyaltyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RoyaltyConfig_Filter>
}

export type QuerySalesConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySalesConfigFixedPriceSaleStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigFixedPriceSaleStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigFixedPriceSaleStrategy_Filter>
}

export type QuerySalesConfigFixedPriceSaleStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySalesConfigMerkleMinterStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigMerkleMinterStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigMerkleMinterStrategy_Filter>
}

export type QuerySalesConfigMerkleMinterStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySalesConfigRedeemMinterStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigRedeemMinterStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigRedeemMinterStrategy_Filter>
}

export type QuerySalesConfigRedeemMinterStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySalesConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfig_Filter>
}

export type QuerySalesStrategyConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QuerySalesStrategyConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesStrategyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesStrategyConfig_Filter>
}

export type QueryToken1155HolderArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryToken1155HoldersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token1155Holder_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token1155Holder_Filter>
}

export type QueryTokenSaleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTokenSalesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TokenSale_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TokenSale_Filter>
}

export type QueryTransactionInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryTransactionInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TransactionInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TransactionInfo_Filter>
}

export type QueryUpgradeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryUpgradesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Upgrade_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Upgrade_Filter>
}

export type QueryZoraCreate721FactoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreate721Factory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreate721Factory_Filter>
}

export type QueryZoraCreate721FactoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreate1155FactoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreate1155Factory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreate1155Factory_Filter>
}

export type QueryZoraCreate1155FactoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreateContractArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreateContractsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreateContract_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreateContract_Filter>
}

export type QueryZoraCreateTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreateTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreateToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreateToken_Filter>
}

export type QueryZoraCreatorPermissionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreatorPermissionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorPermission_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreatorPermission_Filter>
}

export type QueryZoraCreatorRedeemConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type QueryZoraCreatorRedeemConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorRedeemConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreatorRedeemConfig_Filter>
}

export type RedeemInstructions = {
  __typename?: 'RedeemInstructions'
  amount: Scalars['BigInt']
  burnFunction: Scalars['Bytes']
  id: Scalars['ID']
  redeemMinter: SalesConfigRedeemMinterStrategy
  tokenContract: Scalars['Bytes']
  tokenIdEnd: Scalars['BigInt']
  tokenIdStart: Scalars['BigInt']
  tokenType: Scalars['Int']
  transferRecipient: Scalars['Bytes']
}

export type RedeemInstructions_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RedeemInstructions_Filter>>>
  burnFunction?: InputMaybe<Scalars['Bytes']>
  burnFunction_contains?: InputMaybe<Scalars['Bytes']>
  burnFunction_gt?: InputMaybe<Scalars['Bytes']>
  burnFunction_gte?: InputMaybe<Scalars['Bytes']>
  burnFunction_in?: InputMaybe<Array<Scalars['Bytes']>>
  burnFunction_lt?: InputMaybe<Scalars['Bytes']>
  burnFunction_lte?: InputMaybe<Scalars['Bytes']>
  burnFunction_not?: InputMaybe<Scalars['Bytes']>
  burnFunction_not_contains?: InputMaybe<Scalars['Bytes']>
  burnFunction_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RedeemInstructions_Filter>>>
  redeemMinter?: InputMaybe<Scalars['String']>
  redeemMinter_?: InputMaybe<SalesConfigRedeemMinterStrategy_Filter>
  redeemMinter_contains?: InputMaybe<Scalars['String']>
  redeemMinter_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_gt?: InputMaybe<Scalars['String']>
  redeemMinter_gte?: InputMaybe<Scalars['String']>
  redeemMinter_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_lt?: InputMaybe<Scalars['String']>
  redeemMinter_lte?: InputMaybe<Scalars['String']>
  redeemMinter_not?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_not_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenContract?: InputMaybe<Scalars['Bytes']>
  tokenContract_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_gt?: InputMaybe<Scalars['Bytes']>
  tokenContract_gte?: InputMaybe<Scalars['Bytes']>
  tokenContract_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenContract_lt?: InputMaybe<Scalars['Bytes']>
  tokenContract_lte?: InputMaybe<Scalars['Bytes']>
  tokenContract_not?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenIdEnd?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_gt?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_gte?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIdEnd_lt?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_lte?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_not?: InputMaybe<Scalars['BigInt']>
  tokenIdEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIdStart?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_gt?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_gte?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIdStart_lt?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_lte?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_not?: InputMaybe<Scalars['BigInt']>
  tokenIdStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenType?: InputMaybe<Scalars['Int']>
  tokenType_gt?: InputMaybe<Scalars['Int']>
  tokenType_gte?: InputMaybe<Scalars['Int']>
  tokenType_in?: InputMaybe<Array<Scalars['Int']>>
  tokenType_lt?: InputMaybe<Scalars['Int']>
  tokenType_lte?: InputMaybe<Scalars['Int']>
  tokenType_not?: InputMaybe<Scalars['Int']>
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>
  transferRecipient?: InputMaybe<Scalars['Bytes']>
  transferRecipient_contains?: InputMaybe<Scalars['Bytes']>
  transferRecipient_gt?: InputMaybe<Scalars['Bytes']>
  transferRecipient_gte?: InputMaybe<Scalars['Bytes']>
  transferRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  transferRecipient_lt?: InputMaybe<Scalars['Bytes']>
  transferRecipient_lte?: InputMaybe<Scalars['Bytes']>
  transferRecipient_not?: InputMaybe<Scalars['Bytes']>
  transferRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  transferRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum RedeemInstructions_OrderBy {
  Amount = 'amount',
  BurnFunction = 'burnFunction',
  Id = 'id',
  RedeemMinter = 'redeemMinter',
  RedeemMinterAddress = 'redeemMinter__address',
  RedeemMinterBlock = 'redeemMinter__block',
  RedeemMinterConfigAddress = 'redeemMinter__configAddress',
  RedeemMinterEthAmount = 'redeemMinter__ethAmount',
  RedeemMinterEthRecipient = 'redeemMinter__ethRecipient',
  RedeemMinterId = 'redeemMinter__id',
  RedeemMinterIsActive = 'redeemMinter__isActive',
  RedeemMinterRedeemsInstructionsHash = 'redeemMinter__redeemsInstructionsHash',
  RedeemMinterSaleEnd = 'redeemMinter__saleEnd',
  RedeemMinterSaleStart = 'redeemMinter__saleStart',
  RedeemMinterTarget = 'redeemMinter__target',
  RedeemMinterTimestamp = 'redeemMinter__timestamp',
  TokenContract = 'tokenContract',
  TokenIdEnd = 'tokenIdEnd',
  TokenIdStart = 'tokenIdStart',
  TokenType = 'tokenType',
  TransferRecipient = 'transferRecipient',
}

export type RedeemMintToken = {
  __typename?: 'RedeemMintToken'
  amount: Scalars['BigInt']
  id: Scalars['ID']
  tokenContract: Scalars['Bytes']
  tokenId: Scalars['BigInt']
  tokenType: Scalars['Int']
}

export type RedeemMintToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RedeemMintToken_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RedeemMintToken_Filter>>>
  tokenContract?: InputMaybe<Scalars['Bytes']>
  tokenContract_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_gt?: InputMaybe<Scalars['Bytes']>
  tokenContract_gte?: InputMaybe<Scalars['Bytes']>
  tokenContract_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenContract_lt?: InputMaybe<Scalars['Bytes']>
  tokenContract_lte?: InputMaybe<Scalars['Bytes']>
  tokenContract_not?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_contains?: InputMaybe<Scalars['Bytes']>
  tokenContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenType?: InputMaybe<Scalars['Int']>
  tokenType_gt?: InputMaybe<Scalars['Int']>
  tokenType_gte?: InputMaybe<Scalars['Int']>
  tokenType_in?: InputMaybe<Array<Scalars['Int']>>
  tokenType_lt?: InputMaybe<Scalars['Int']>
  tokenType_lte?: InputMaybe<Scalars['Int']>
  tokenType_not?: InputMaybe<Scalars['Int']>
  tokenType_not_in?: InputMaybe<Array<Scalars['Int']>>
}

export enum RedeemMintToken_OrderBy {
  Amount = 'amount',
  Id = 'id',
  TokenContract = 'tokenContract',
  TokenId = 'tokenId',
  TokenType = 'tokenType',
}

export type RedeemMinterProcessed = {
  __typename?: 'RedeemMinterProcessed'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  id: Scalars['ID']
  redeemMinter: SalesConfigRedeemMinterStrategy
  redeemsInstructionsHash: Scalars['Bytes']
  sender: Scalars['Bytes']
  target: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  tokenPairs: Array<RedeemProcessedTokenPair>
  txn: TransactionInfo
}

export type RedeemMinterProcessedTokenPairsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemProcessedTokenPair_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RedeemProcessedTokenPair_Filter>
}

export type RedeemMinterProcessed_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<RedeemMinterProcessed_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RedeemMinterProcessed_Filter>>>
  redeemMinter?: InputMaybe<Scalars['String']>
  redeemMinter_?: InputMaybe<SalesConfigRedeemMinterStrategy_Filter>
  redeemMinter_contains?: InputMaybe<Scalars['String']>
  redeemMinter_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_gt?: InputMaybe<Scalars['String']>
  redeemMinter_gte?: InputMaybe<Scalars['String']>
  redeemMinter_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_lt?: InputMaybe<Scalars['String']>
  redeemMinter_lte?: InputMaybe<Scalars['String']>
  redeemMinter_not?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_not_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemsInstructionsHash?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_contains?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_gt?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_gte?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_in?: InputMaybe<Array<Scalars['Bytes']>>
  redeemsInstructionsHash_lt?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_lte?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not_contains?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  sender?: InputMaybe<Scalars['Bytes']>
  sender_contains?: InputMaybe<Scalars['Bytes']>
  sender_gt?: InputMaybe<Scalars['Bytes']>
  sender_gte?: InputMaybe<Scalars['Bytes']>
  sender_in?: InputMaybe<Array<Scalars['Bytes']>>
  sender_lt?: InputMaybe<Scalars['Bytes']>
  sender_lte?: InputMaybe<Scalars['Bytes']>
  sender_not?: InputMaybe<Scalars['Bytes']>
  sender_not_contains?: InputMaybe<Scalars['Bytes']>
  sender_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  target?: InputMaybe<Scalars['Bytes']>
  target_contains?: InputMaybe<Scalars['Bytes']>
  target_gt?: InputMaybe<Scalars['Bytes']>
  target_gte?: InputMaybe<Scalars['Bytes']>
  target_in?: InputMaybe<Array<Scalars['Bytes']>>
  target_lt?: InputMaybe<Scalars['Bytes']>
  target_lte?: InputMaybe<Scalars['Bytes']>
  target_not?: InputMaybe<Scalars['Bytes']>
  target_not_contains?: InputMaybe<Scalars['Bytes']>
  target_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenPairs_?: InputMaybe<RedeemProcessedTokenPair_Filter>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum RedeemMinterProcessed_OrderBy {
  Address = 'address',
  Block = 'block',
  Id = 'id',
  RedeemMinter = 'redeemMinter',
  RedeemMinterAddress = 'redeemMinter__address',
  RedeemMinterBlock = 'redeemMinter__block',
  RedeemMinterConfigAddress = 'redeemMinter__configAddress',
  RedeemMinterEthAmount = 'redeemMinter__ethAmount',
  RedeemMinterEthRecipient = 'redeemMinter__ethRecipient',
  RedeemMinterId = 'redeemMinter__id',
  RedeemMinterIsActive = 'redeemMinter__isActive',
  RedeemMinterRedeemsInstructionsHash = 'redeemMinter__redeemsInstructionsHash',
  RedeemMinterSaleEnd = 'redeemMinter__saleEnd',
  RedeemMinterSaleStart = 'redeemMinter__saleStart',
  RedeemMinterTarget = 'redeemMinter__target',
  RedeemMinterTimestamp = 'redeemMinter__timestamp',
  RedeemsInstructionsHash = 'redeemsInstructionsHash',
  Sender = 'sender',
  Target = 'target',
  Timestamp = 'timestamp',
  TokenPairs = 'tokenPairs',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type RedeemProcessedTokenPair = {
  __typename?: 'RedeemProcessedTokenPair'
  amounts: Array<Scalars['BigInt']>
  id: Scalars['ID']
  index: Scalars['Int']
  processed: RedeemMinterProcessed
  tokenIds: Array<Scalars['BigInt']>
}

export type RedeemProcessedTokenPair_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amounts?: InputMaybe<Array<Scalars['BigInt']>>
  amounts_contains?: InputMaybe<Array<Scalars['BigInt']>>
  amounts_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  amounts_not?: InputMaybe<Array<Scalars['BigInt']>>
  amounts_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  amounts_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RedeemProcessedTokenPair_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  index?: InputMaybe<Scalars['Int']>
  index_gt?: InputMaybe<Scalars['Int']>
  index_gte?: InputMaybe<Scalars['Int']>
  index_in?: InputMaybe<Array<Scalars['Int']>>
  index_lt?: InputMaybe<Scalars['Int']>
  index_lte?: InputMaybe<Scalars['Int']>
  index_not?: InputMaybe<Scalars['Int']>
  index_not_in?: InputMaybe<Array<Scalars['Int']>>
  or?: InputMaybe<Array<InputMaybe<RedeemProcessedTokenPair_Filter>>>
  processed?: InputMaybe<Scalars['String']>
  processed_?: InputMaybe<RedeemMinterProcessed_Filter>
  processed_contains?: InputMaybe<Scalars['String']>
  processed_contains_nocase?: InputMaybe<Scalars['String']>
  processed_ends_with?: InputMaybe<Scalars['String']>
  processed_ends_with_nocase?: InputMaybe<Scalars['String']>
  processed_gt?: InputMaybe<Scalars['String']>
  processed_gte?: InputMaybe<Scalars['String']>
  processed_in?: InputMaybe<Array<Scalars['String']>>
  processed_lt?: InputMaybe<Scalars['String']>
  processed_lte?: InputMaybe<Scalars['String']>
  processed_not?: InputMaybe<Scalars['String']>
  processed_not_contains?: InputMaybe<Scalars['String']>
  processed_not_contains_nocase?: InputMaybe<Scalars['String']>
  processed_not_ends_with?: InputMaybe<Scalars['String']>
  processed_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  processed_not_in?: InputMaybe<Array<Scalars['String']>>
  processed_not_starts_with?: InputMaybe<Scalars['String']>
  processed_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  processed_starts_with?: InputMaybe<Scalars['String']>
  processed_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenIds?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIds_contains?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIds_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIds_not?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIds_not_contains?: InputMaybe<Array<Scalars['BigInt']>>
  tokenIds_not_contains_nocase?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum RedeemProcessedTokenPair_OrderBy {
  Amounts = 'amounts',
  Id = 'id',
  Index = 'index',
  Processed = 'processed',
  ProcessedAddress = 'processed__address',
  ProcessedBlock = 'processed__block',
  ProcessedId = 'processed__id',
  ProcessedRedeemsInstructionsHash = 'processed__redeemsInstructionsHash',
  ProcessedSender = 'processed__sender',
  ProcessedTarget = 'processed__target',
  ProcessedTimestamp = 'processed__timestamp',
  TokenIds = 'tokenIds',
}

export type RewardsAggregate = {
  __typename?: 'RewardsAggregate'
  amount: Scalars['BigInt']
  id: Scalars['ID']
  withdrawn: Scalars['BigInt']
}

export type RewardsAggregate_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsAggregate_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsAggregate_Filter>>>
  withdrawn?: InputMaybe<Scalars['BigInt']>
  withdrawn_gt?: InputMaybe<Scalars['BigInt']>
  withdrawn_gte?: InputMaybe<Scalars['BigInt']>
  withdrawn_in?: InputMaybe<Array<Scalars['BigInt']>>
  withdrawn_lt?: InputMaybe<Scalars['BigInt']>
  withdrawn_lte?: InputMaybe<Scalars['BigInt']>
  withdrawn_not?: InputMaybe<Scalars['BigInt']>
  withdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum RewardsAggregate_OrderBy {
  Amount = 'amount',
  Id = 'id',
  Withdrawn = 'withdrawn',
}

export type RewardsDeposit = {
  __typename?: 'RewardsDeposit'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  createReferral: Scalars['Bytes']
  createReferralReward: Scalars['BigInt']
  creator: Scalars['Bytes']
  creatorReward: Scalars['BigInt']
  firstMinter: Scalars['Bytes']
  firstMinterReward: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['ID']
  mintReferral: Scalars['Bytes']
  mintReferralReward: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
  zora: Scalars['Bytes']
  zoraReward: Scalars['BigInt']
}

export type RewardsDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<RewardsDeposit_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  createReferral?: InputMaybe<Scalars['Bytes']>
  createReferralReward?: InputMaybe<Scalars['BigInt']>
  createReferralReward_gt?: InputMaybe<Scalars['BigInt']>
  createReferralReward_gte?: InputMaybe<Scalars['BigInt']>
  createReferralReward_in?: InputMaybe<Array<Scalars['BigInt']>>
  createReferralReward_lt?: InputMaybe<Scalars['BigInt']>
  createReferralReward_lte?: InputMaybe<Scalars['BigInt']>
  createReferralReward_not?: InputMaybe<Scalars['BigInt']>
  createReferralReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  createReferral_contains?: InputMaybe<Scalars['Bytes']>
  createReferral_gt?: InputMaybe<Scalars['Bytes']>
  createReferral_gte?: InputMaybe<Scalars['Bytes']>
  createReferral_in?: InputMaybe<Array<Scalars['Bytes']>>
  createReferral_lt?: InputMaybe<Scalars['Bytes']>
  createReferral_lte?: InputMaybe<Scalars['Bytes']>
  createReferral_not?: InputMaybe<Scalars['Bytes']>
  createReferral_not_contains?: InputMaybe<Scalars['Bytes']>
  createReferral_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  creator?: InputMaybe<Scalars['Bytes']>
  creatorReward?: InputMaybe<Scalars['BigInt']>
  creatorReward_gt?: InputMaybe<Scalars['BigInt']>
  creatorReward_gte?: InputMaybe<Scalars['BigInt']>
  creatorReward_in?: InputMaybe<Array<Scalars['BigInt']>>
  creatorReward_lt?: InputMaybe<Scalars['BigInt']>
  creatorReward_lte?: InputMaybe<Scalars['BigInt']>
  creatorReward_not?: InputMaybe<Scalars['BigInt']>
  creatorReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  creator_contains?: InputMaybe<Scalars['Bytes']>
  creator_gt?: InputMaybe<Scalars['Bytes']>
  creator_gte?: InputMaybe<Scalars['Bytes']>
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>
  creator_lt?: InputMaybe<Scalars['Bytes']>
  creator_lte?: InputMaybe<Scalars['Bytes']>
  creator_not?: InputMaybe<Scalars['Bytes']>
  creator_not_contains?: InputMaybe<Scalars['Bytes']>
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  firstMinter?: InputMaybe<Scalars['Bytes']>
  firstMinterReward?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_gt?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_gte?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstMinterReward_lt?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_lte?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_not?: InputMaybe<Scalars['BigInt']>
  firstMinterReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstMinter_contains?: InputMaybe<Scalars['Bytes']>
  firstMinter_gt?: InputMaybe<Scalars['Bytes']>
  firstMinter_gte?: InputMaybe<Scalars['Bytes']>
  firstMinter_in?: InputMaybe<Array<Scalars['Bytes']>>
  firstMinter_lt?: InputMaybe<Scalars['Bytes']>
  firstMinter_lte?: InputMaybe<Scalars['Bytes']>
  firstMinter_not?: InputMaybe<Scalars['Bytes']>
  firstMinter_not_contains?: InputMaybe<Scalars['Bytes']>
  firstMinter_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  mintReferral?: InputMaybe<Scalars['Bytes']>
  mintReferralReward?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_gt?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_gte?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintReferralReward_lt?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_lte?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_not?: InputMaybe<Scalars['BigInt']>
  mintReferralReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintReferral_contains?: InputMaybe<Scalars['Bytes']>
  mintReferral_gt?: InputMaybe<Scalars['Bytes']>
  mintReferral_gte?: InputMaybe<Scalars['Bytes']>
  mintReferral_in?: InputMaybe<Array<Scalars['Bytes']>>
  mintReferral_lt?: InputMaybe<Scalars['Bytes']>
  mintReferral_lte?: InputMaybe<Scalars['Bytes']>
  mintReferral_not?: InputMaybe<Scalars['Bytes']>
  mintReferral_not_contains?: InputMaybe<Scalars['Bytes']>
  mintReferral_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<RewardsDeposit_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  zora?: InputMaybe<Scalars['Bytes']>
  zoraReward?: InputMaybe<Scalars['BigInt']>
  zoraReward_gt?: InputMaybe<Scalars['BigInt']>
  zoraReward_gte?: InputMaybe<Scalars['BigInt']>
  zoraReward_in?: InputMaybe<Array<Scalars['BigInt']>>
  zoraReward_lt?: InputMaybe<Scalars['BigInt']>
  zoraReward_lte?: InputMaybe<Scalars['BigInt']>
  zoraReward_not?: InputMaybe<Scalars['BigInt']>
  zoraReward_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  zora_contains?: InputMaybe<Scalars['Bytes']>
  zora_gt?: InputMaybe<Scalars['Bytes']>
  zora_gte?: InputMaybe<Scalars['Bytes']>
  zora_in?: InputMaybe<Array<Scalars['Bytes']>>
  zora_lt?: InputMaybe<Scalars['Bytes']>
  zora_lte?: InputMaybe<Scalars['Bytes']>
  zora_not?: InputMaybe<Scalars['Bytes']>
  zora_not_contains?: InputMaybe<Scalars['Bytes']>
  zora_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum RewardsDeposit_OrderBy {
  Address = 'address',
  Block = 'block',
  CreateReferral = 'createReferral',
  CreateReferralReward = 'createReferralReward',
  Creator = 'creator',
  CreatorReward = 'creatorReward',
  FirstMinter = 'firstMinter',
  FirstMinterReward = 'firstMinterReward',
  From = 'from',
  Id = 'id',
  MintReferral = 'mintReferral',
  MintReferralReward = 'mintReferralReward',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Zora = 'zora',
  ZoraReward = 'zoraReward',
}

export type RewardsPerSource = {
  __typename?: 'RewardsPerSource'
  amount: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['Bytes']
}

export type RewardsPerSource_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsPerSource_Filter>>>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['Bytes']>
  id_contains?: InputMaybe<Scalars['Bytes']>
  id_gt?: InputMaybe<Scalars['Bytes']>
  id_gte?: InputMaybe<Scalars['Bytes']>
  id_in?: InputMaybe<Array<Scalars['Bytes']>>
  id_lt?: InputMaybe<Scalars['Bytes']>
  id_lte?: InputMaybe<Scalars['Bytes']>
  id_not?: InputMaybe<Scalars['Bytes']>
  id_not_contains?: InputMaybe<Scalars['Bytes']>
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<RewardsPerSource_Filter>>>
}

export enum RewardsPerSource_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
}

export type RewardsPerUser = {
  __typename?: 'RewardsPerUser'
  address: Scalars['Bytes']
  amount: Scalars['BigInt']
  id: Scalars['Bytes']
  withdrawn: Scalars['BigInt']
}

export type RewardsPerUserPerDay = {
  __typename?: 'RewardsPerUserPerDay'
  amount: Scalars['BigInt']
  date: Scalars['String']
  id: Scalars['ID']
  timestamp: Scalars['BigInt']
  to: Scalars['Bytes']
}

export type RewardsPerUserPerDay_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsPerUserPerDay_Filter>>>
  date?: InputMaybe<Scalars['String']>
  date_contains?: InputMaybe<Scalars['String']>
  date_contains_nocase?: InputMaybe<Scalars['String']>
  date_ends_with?: InputMaybe<Scalars['String']>
  date_ends_with_nocase?: InputMaybe<Scalars['String']>
  date_gt?: InputMaybe<Scalars['String']>
  date_gte?: InputMaybe<Scalars['String']>
  date_in?: InputMaybe<Array<Scalars['String']>>
  date_lt?: InputMaybe<Scalars['String']>
  date_lte?: InputMaybe<Scalars['String']>
  date_not?: InputMaybe<Scalars['String']>
  date_not_contains?: InputMaybe<Scalars['String']>
  date_not_contains_nocase?: InputMaybe<Scalars['String']>
  date_not_ends_with?: InputMaybe<Scalars['String']>
  date_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  date_not_in?: InputMaybe<Array<Scalars['String']>>
  date_not_starts_with?: InputMaybe<Scalars['String']>
  date_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  date_starts_with?: InputMaybe<Scalars['String']>
  date_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsPerUserPerDay_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['Bytes']>
  to_contains?: InputMaybe<Scalars['Bytes']>
  to_gt?: InputMaybe<Scalars['Bytes']>
  to_gte?: InputMaybe<Scalars['Bytes']>
  to_in?: InputMaybe<Array<Scalars['Bytes']>>
  to_lt?: InputMaybe<Scalars['Bytes']>
  to_lte?: InputMaybe<Scalars['Bytes']>
  to_not?: InputMaybe<Scalars['Bytes']>
  to_not_contains?: InputMaybe<Scalars['Bytes']>
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum RewardsPerUserPerDay_OrderBy {
  Amount = 'amount',
  Date = 'date',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
}

export type RewardsPerUserPerSource = {
  __typename?: 'RewardsPerUserPerSource'
  amount: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['ID']
  to: Scalars['Bytes']
}

export type RewardsPerUserPerSource_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsPerUserPerSource_Filter>>>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsPerUserPerSource_Filter>>>
  to?: InputMaybe<Scalars['Bytes']>
  to_contains?: InputMaybe<Scalars['Bytes']>
  to_gt?: InputMaybe<Scalars['Bytes']>
  to_gte?: InputMaybe<Scalars['Bytes']>
  to_in?: InputMaybe<Array<Scalars['Bytes']>>
  to_lt?: InputMaybe<Scalars['Bytes']>
  to_lte?: InputMaybe<Scalars['Bytes']>
  to_not?: InputMaybe<Scalars['Bytes']>
  to_not_contains?: InputMaybe<Scalars['Bytes']>
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum RewardsPerUserPerSource_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
  To = 'to',
}

export type RewardsPerUserPerType = {
  __typename?: 'RewardsPerUserPerType'
  amount: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['ID']
  type?: Maybe<Scalars['String']>
}

export type RewardsPerUserPerType_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsPerUserPerType_Filter>>>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsPerUserPerType_Filter>>>
  type?: InputMaybe<Scalars['String']>
  type_contains?: InputMaybe<Scalars['String']>
  type_contains_nocase?: InputMaybe<Scalars['String']>
  type_ends_with?: InputMaybe<Scalars['String']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_gt?: InputMaybe<Scalars['String']>
  type_gte?: InputMaybe<Scalars['String']>
  type_in?: InputMaybe<Array<Scalars['String']>>
  type_lt?: InputMaybe<Scalars['String']>
  type_lte?: InputMaybe<Scalars['String']>
  type_not?: InputMaybe<Scalars['String']>
  type_not_contains?: InputMaybe<Scalars['String']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']>
  type_not_ends_with?: InputMaybe<Scalars['String']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_not_in?: InputMaybe<Array<Scalars['String']>>
  type_not_starts_with?: InputMaybe<Scalars['String']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  type_starts_with?: InputMaybe<Scalars['String']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum RewardsPerUserPerType_OrderBy {
  Amount = 'amount',
  From = 'from',
  Id = 'id',
  Type = 'type',
}

export type RewardsPerUser_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsPerUser_Filter>>>
  id?: InputMaybe<Scalars['Bytes']>
  id_contains?: InputMaybe<Scalars['Bytes']>
  id_gt?: InputMaybe<Scalars['Bytes']>
  id_gte?: InputMaybe<Scalars['Bytes']>
  id_in?: InputMaybe<Array<Scalars['Bytes']>>
  id_lt?: InputMaybe<Scalars['Bytes']>
  id_lte?: InputMaybe<Scalars['Bytes']>
  id_not?: InputMaybe<Scalars['Bytes']>
  id_not_contains?: InputMaybe<Scalars['Bytes']>
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<RewardsPerUser_Filter>>>
  withdrawn?: InputMaybe<Scalars['BigInt']>
  withdrawn_gt?: InputMaybe<Scalars['BigInt']>
  withdrawn_gte?: InputMaybe<Scalars['BigInt']>
  withdrawn_in?: InputMaybe<Array<Scalars['BigInt']>>
  withdrawn_lt?: InputMaybe<Scalars['BigInt']>
  withdrawn_lte?: InputMaybe<Scalars['BigInt']>
  withdrawn_not?: InputMaybe<Scalars['BigInt']>
  withdrawn_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum RewardsPerUser_OrderBy {
  Address = 'address',
  Amount = 'amount',
  Id = 'id',
  Withdrawn = 'withdrawn',
}

export type RewardsSingleDeposit = {
  __typename?: 'RewardsSingleDeposit'
  address: Scalars['Bytes']
  amount: Scalars['BigInt']
  block: Scalars['BigInt']
  comment?: Maybe<Scalars['String']>
  from: Scalars['Bytes']
  id: Scalars['ID']
  reason: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  to: Scalars['Bytes']
  txn: TransactionInfo
}

export type RewardsSingleDeposit_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsSingleDeposit_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  comment?: InputMaybe<Scalars['String']>
  comment_contains?: InputMaybe<Scalars['String']>
  comment_contains_nocase?: InputMaybe<Scalars['String']>
  comment_ends_with?: InputMaybe<Scalars['String']>
  comment_ends_with_nocase?: InputMaybe<Scalars['String']>
  comment_gt?: InputMaybe<Scalars['String']>
  comment_gte?: InputMaybe<Scalars['String']>
  comment_in?: InputMaybe<Array<Scalars['String']>>
  comment_lt?: InputMaybe<Scalars['String']>
  comment_lte?: InputMaybe<Scalars['String']>
  comment_not?: InputMaybe<Scalars['String']>
  comment_not_contains?: InputMaybe<Scalars['String']>
  comment_not_contains_nocase?: InputMaybe<Scalars['String']>
  comment_not_ends_with?: InputMaybe<Scalars['String']>
  comment_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  comment_not_in?: InputMaybe<Array<Scalars['String']>>
  comment_not_starts_with?: InputMaybe<Scalars['String']>
  comment_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  comment_starts_with?: InputMaybe<Scalars['String']>
  comment_starts_with_nocase?: InputMaybe<Scalars['String']>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsSingleDeposit_Filter>>>
  reason?: InputMaybe<Scalars['Bytes']>
  reason_contains?: InputMaybe<Scalars['Bytes']>
  reason_gt?: InputMaybe<Scalars['Bytes']>
  reason_gte?: InputMaybe<Scalars['Bytes']>
  reason_in?: InputMaybe<Array<Scalars['Bytes']>>
  reason_lt?: InputMaybe<Scalars['Bytes']>
  reason_lte?: InputMaybe<Scalars['Bytes']>
  reason_not?: InputMaybe<Scalars['Bytes']>
  reason_not_contains?: InputMaybe<Scalars['Bytes']>
  reason_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['Bytes']>
  to_contains?: InputMaybe<Scalars['Bytes']>
  to_gt?: InputMaybe<Scalars['Bytes']>
  to_gte?: InputMaybe<Scalars['Bytes']>
  to_in?: InputMaybe<Array<Scalars['Bytes']>>
  to_lt?: InputMaybe<Scalars['Bytes']>
  to_lte?: InputMaybe<Scalars['Bytes']>
  to_not?: InputMaybe<Scalars['Bytes']>
  to_not_contains?: InputMaybe<Scalars['Bytes']>
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum RewardsSingleDeposit_OrderBy {
  Address = 'address',
  Amount = 'amount',
  Block = 'block',
  Comment = 'comment',
  From = 'from',
  Id = 'id',
  Reason = 'reason',
  Timestamp = 'timestamp',
  To = 'to',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type RewardsWithdraw = {
  __typename?: 'RewardsWithdraw'
  address: Scalars['Bytes']
  amount: Scalars['BigInt']
  block: Scalars['BigInt']
  from: Scalars['Bytes']
  id: Scalars['ID']
  reason?: Maybe<Scalars['String']>
  timestamp: Scalars['BigInt']
  to: Scalars['Bytes']
  txn: TransactionInfo
}

export type RewardsWithdraw_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  amount?: InputMaybe<Scalars['BigInt']>
  amount_gt?: InputMaybe<Scalars['BigInt']>
  amount_gte?: InputMaybe<Scalars['BigInt']>
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>
  amount_lt?: InputMaybe<Scalars['BigInt']>
  amount_lte?: InputMaybe<Scalars['BigInt']>
  amount_not?: InputMaybe<Scalars['BigInt']>
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  and?: InputMaybe<Array<InputMaybe<RewardsWithdraw_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  from?: InputMaybe<Scalars['Bytes']>
  from_contains?: InputMaybe<Scalars['Bytes']>
  from_gt?: InputMaybe<Scalars['Bytes']>
  from_gte?: InputMaybe<Scalars['Bytes']>
  from_in?: InputMaybe<Array<Scalars['Bytes']>>
  from_lt?: InputMaybe<Scalars['Bytes']>
  from_lte?: InputMaybe<Scalars['Bytes']>
  from_not?: InputMaybe<Scalars['Bytes']>
  from_not_contains?: InputMaybe<Scalars['Bytes']>
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RewardsWithdraw_Filter>>>
  reason?: InputMaybe<Scalars['String']>
  reason_contains?: InputMaybe<Scalars['String']>
  reason_contains_nocase?: InputMaybe<Scalars['String']>
  reason_ends_with?: InputMaybe<Scalars['String']>
  reason_ends_with_nocase?: InputMaybe<Scalars['String']>
  reason_gt?: InputMaybe<Scalars['String']>
  reason_gte?: InputMaybe<Scalars['String']>
  reason_in?: InputMaybe<Array<Scalars['String']>>
  reason_lt?: InputMaybe<Scalars['String']>
  reason_lte?: InputMaybe<Scalars['String']>
  reason_not?: InputMaybe<Scalars['String']>
  reason_not_contains?: InputMaybe<Scalars['String']>
  reason_not_contains_nocase?: InputMaybe<Scalars['String']>
  reason_not_ends_with?: InputMaybe<Scalars['String']>
  reason_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  reason_not_in?: InputMaybe<Array<Scalars['String']>>
  reason_not_starts_with?: InputMaybe<Scalars['String']>
  reason_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  reason_starts_with?: InputMaybe<Scalars['String']>
  reason_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  to?: InputMaybe<Scalars['Bytes']>
  to_contains?: InputMaybe<Scalars['Bytes']>
  to_gt?: InputMaybe<Scalars['Bytes']>
  to_gte?: InputMaybe<Scalars['Bytes']>
  to_in?: InputMaybe<Array<Scalars['Bytes']>>
  to_lt?: InputMaybe<Scalars['Bytes']>
  to_lte?: InputMaybe<Scalars['Bytes']>
  to_not?: InputMaybe<Scalars['Bytes']>
  to_not_contains?: InputMaybe<Scalars['Bytes']>
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum RewardsWithdraw_OrderBy {
  Address = 'address',
  Amount = 'amount',
  Block = 'block',
  From = 'from',
  Id = 'id',
  Reason = 'reason',
  Timestamp = 'timestamp',
  To = 'to',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type RoyaltyConfig = {
  __typename?: 'RoyaltyConfig'
  contract?: Maybe<ZoraCreateContract>
  id: Scalars['ID']
  royaltyBPS: Scalars['BigInt']
  royaltyMintSchedule: Scalars['BigInt']
  royaltyRecipient: Scalars['Bytes']
  tokenAndContract?: Maybe<ZoraCreateToken>
  tokenId: Scalars['BigInt']
  user: Scalars['Bytes']
}

export type RoyaltyConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<RoyaltyConfig_Filter>>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<RoyaltyConfig_Filter>>>
  royaltyBPS?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_gt?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_gte?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_in?: InputMaybe<Array<Scalars['BigInt']>>
  royaltyBPS_lt?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_lte?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_not?: InputMaybe<Scalars['BigInt']>
  royaltyBPS_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  royaltyMintSchedule?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_gt?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_gte?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_in?: InputMaybe<Array<Scalars['BigInt']>>
  royaltyMintSchedule_lt?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_lte?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_not?: InputMaybe<Scalars['BigInt']>
  royaltyMintSchedule_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  royaltyRecipient?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_contains?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_gt?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_gte?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  royaltyRecipient_lt?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_lte?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_not?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  royaltyRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  user?: InputMaybe<Scalars['Bytes']>
  user_contains?: InputMaybe<Scalars['Bytes']>
  user_gt?: InputMaybe<Scalars['Bytes']>
  user_gte?: InputMaybe<Scalars['Bytes']>
  user_in?: InputMaybe<Array<Scalars['Bytes']>>
  user_lt?: InputMaybe<Scalars['Bytes']>
  user_lte?: InputMaybe<Scalars['Bytes']>
  user_not?: InputMaybe<Scalars['Bytes']>
  user_not_contains?: InputMaybe<Scalars['Bytes']>
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum RoyaltyConfig_OrderBy {
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  Id = 'id',
  RoyaltyBps = 'royaltyBPS',
  RoyaltyMintSchedule = 'royaltyMintSchedule',
  RoyaltyRecipient = 'royaltyRecipient',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  TokenId = 'tokenId',
  User = 'user',
}

export type SalesConfig = {
  __typename?: 'SalesConfig'
  id: Scalars['ID']
  maxSalePurchasePerAddress: Scalars['BigInt']
  presaleEnd: Scalars['BigInt']
  presaleMerkleRoot: Scalars['Bytes']
  presaleStart: Scalars['BigInt']
  publicSaleEnd: Scalars['BigInt']
  publicSalePrice: Scalars['BigInt']
  publicSaleStart: Scalars['BigInt']
}

export type SalesConfigFixedPriceSaleStrategy = {
  __typename?: 'SalesConfigFixedPriceSaleStrategy'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  configAddress: Scalars['Bytes']
  contract: ZoraCreateContract
  fundsRecipient?: Maybe<Scalars['Bytes']>
  id: Scalars['ID']
  maxTokensPerAddress: Scalars['BigInt']
  pricePerToken: Scalars['BigInt']
  saleEnd: Scalars['BigInt']
  saleStart: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  tokenId: Scalars['BigInt']
  txn: TransactionInfo
}

export type SalesConfigFixedPriceSaleStrategy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<SalesConfigFixedPriceSaleStrategy_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  configAddress?: InputMaybe<Scalars['Bytes']>
  configAddress_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_gt?: InputMaybe<Scalars['Bytes']>
  configAddress_gte?: InputMaybe<Scalars['Bytes']>
  configAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  configAddress_lt?: InputMaybe<Scalars['Bytes']>
  configAddress_lte?: InputMaybe<Scalars['Bytes']>
  configAddress_not?: InputMaybe<Scalars['Bytes']>
  configAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  fundsRecipient?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_contains?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_gt?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_gte?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  fundsRecipient_lt?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_lte?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  maxTokensPerAddress?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_gt?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_gte?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_in?: InputMaybe<Array<Scalars['BigInt']>>
  maxTokensPerAddress_lt?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_lte?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_not?: InputMaybe<Scalars['BigInt']>
  maxTokensPerAddress_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  or?: InputMaybe<Array<InputMaybe<SalesConfigFixedPriceSaleStrategy_Filter>>>
  pricePerToken?: InputMaybe<Scalars['BigInt']>
  pricePerToken_gt?: InputMaybe<Scalars['BigInt']>
  pricePerToken_gte?: InputMaybe<Scalars['BigInt']>
  pricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>
  pricePerToken_lt?: InputMaybe<Scalars['BigInt']>
  pricePerToken_lte?: InputMaybe<Scalars['BigInt']>
  pricePerToken_not?: InputMaybe<Scalars['BigInt']>
  pricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleEnd?: InputMaybe<Scalars['BigInt']>
  saleEnd_gt?: InputMaybe<Scalars['BigInt']>
  saleEnd_gte?: InputMaybe<Scalars['BigInt']>
  saleEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleEnd_lt?: InputMaybe<Scalars['BigInt']>
  saleEnd_lte?: InputMaybe<Scalars['BigInt']>
  saleEnd_not?: InputMaybe<Scalars['BigInt']>
  saleEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleStart?: InputMaybe<Scalars['BigInt']>
  saleStart_gt?: InputMaybe<Scalars['BigInt']>
  saleStart_gte?: InputMaybe<Scalars['BigInt']>
  saleStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleStart_lt?: InputMaybe<Scalars['BigInt']>
  saleStart_lte?: InputMaybe<Scalars['BigInt']>
  saleStart_not?: InputMaybe<Scalars['BigInt']>
  saleStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum SalesConfigFixedPriceSaleStrategy_OrderBy {
  Address = 'address',
  Block = 'block',
  ConfigAddress = 'configAddress',
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  FundsRecipient = 'fundsRecipient',
  Id = 'id',
  MaxTokensPerAddress = 'maxTokensPerAddress',
  PricePerToken = 'pricePerToken',
  SaleEnd = 'saleEnd',
  SaleStart = 'saleStart',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type SalesConfigMerkleMinterStrategy = {
  __typename?: 'SalesConfigMerkleMinterStrategy'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  configAddress: Scalars['Bytes']
  contract: ZoraCreateContract
  fundsRecipient?: Maybe<Scalars['Bytes']>
  id: Scalars['ID']
  merkleRoot: Scalars['Bytes']
  presaleEnd: Scalars['BigInt']
  presaleStart: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  tokenId: Scalars['BigInt']
  txn: TransactionInfo
}

export type SalesConfigMerkleMinterStrategy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<SalesConfigMerkleMinterStrategy_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  configAddress?: InputMaybe<Scalars['Bytes']>
  configAddress_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_gt?: InputMaybe<Scalars['Bytes']>
  configAddress_gte?: InputMaybe<Scalars['Bytes']>
  configAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  configAddress_lt?: InputMaybe<Scalars['Bytes']>
  configAddress_lte?: InputMaybe<Scalars['Bytes']>
  configAddress_not?: InputMaybe<Scalars['Bytes']>
  configAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  fundsRecipient?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_contains?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_gt?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_gte?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  fundsRecipient_lt?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_lte?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  fundsRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  merkleRoot?: InputMaybe<Scalars['Bytes']>
  merkleRoot_contains?: InputMaybe<Scalars['Bytes']>
  merkleRoot_gt?: InputMaybe<Scalars['Bytes']>
  merkleRoot_gte?: InputMaybe<Scalars['Bytes']>
  merkleRoot_in?: InputMaybe<Array<Scalars['Bytes']>>
  merkleRoot_lt?: InputMaybe<Scalars['Bytes']>
  merkleRoot_lte?: InputMaybe<Scalars['Bytes']>
  merkleRoot_not?: InputMaybe<Scalars['Bytes']>
  merkleRoot_not_contains?: InputMaybe<Scalars['Bytes']>
  merkleRoot_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<SalesConfigMerkleMinterStrategy_Filter>>>
  presaleEnd?: InputMaybe<Scalars['BigInt']>
  presaleEnd_gt?: InputMaybe<Scalars['BigInt']>
  presaleEnd_gte?: InputMaybe<Scalars['BigInt']>
  presaleEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleEnd_lt?: InputMaybe<Scalars['BigInt']>
  presaleEnd_lte?: InputMaybe<Scalars['BigInt']>
  presaleEnd_not?: InputMaybe<Scalars['BigInt']>
  presaleEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleStart?: InputMaybe<Scalars['BigInt']>
  presaleStart_gt?: InputMaybe<Scalars['BigInt']>
  presaleStart_gte?: InputMaybe<Scalars['BigInt']>
  presaleStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleStart_lt?: InputMaybe<Scalars['BigInt']>
  presaleStart_lte?: InputMaybe<Scalars['BigInt']>
  presaleStart_not?: InputMaybe<Scalars['BigInt']>
  presaleStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum SalesConfigMerkleMinterStrategy_OrderBy {
  Address = 'address',
  Block = 'block',
  ConfigAddress = 'configAddress',
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  FundsRecipient = 'fundsRecipient',
  Id = 'id',
  MerkleRoot = 'merkleRoot',
  PresaleEnd = 'presaleEnd',
  PresaleStart = 'presaleStart',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type SalesConfigRedeemMinterStrategy = {
  __typename?: 'SalesConfigRedeemMinterStrategy'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  configAddress: Scalars['Bytes']
  ethAmount: Scalars['BigInt']
  ethRecipient: Scalars['Bytes']
  id: Scalars['ID']
  isActive: Scalars['Boolean']
  redeemInstructions: Array<RedeemInstructions>
  redeemMintToken: RedeemMintToken
  redeemsInstructionsHash: Scalars['Bytes']
  saleEnd: Scalars['BigInt']
  saleStart: Scalars['BigInt']
  target: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
}

export type SalesConfigRedeemMinterStrategyRedeemInstructionsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemInstructions_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RedeemInstructions_Filter>
}

export type SalesConfigRedeemMinterStrategy_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<SalesConfigRedeemMinterStrategy_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  configAddress?: InputMaybe<Scalars['Bytes']>
  configAddress_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_gt?: InputMaybe<Scalars['Bytes']>
  configAddress_gte?: InputMaybe<Scalars['Bytes']>
  configAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  configAddress_lt?: InputMaybe<Scalars['Bytes']>
  configAddress_lte?: InputMaybe<Scalars['Bytes']>
  configAddress_not?: InputMaybe<Scalars['Bytes']>
  configAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  configAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  ethAmount?: InputMaybe<Scalars['BigInt']>
  ethAmount_gt?: InputMaybe<Scalars['BigInt']>
  ethAmount_gte?: InputMaybe<Scalars['BigInt']>
  ethAmount_in?: InputMaybe<Array<Scalars['BigInt']>>
  ethAmount_lt?: InputMaybe<Scalars['BigInt']>
  ethAmount_lte?: InputMaybe<Scalars['BigInt']>
  ethAmount_not?: InputMaybe<Scalars['BigInt']>
  ethAmount_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  ethRecipient?: InputMaybe<Scalars['Bytes']>
  ethRecipient_contains?: InputMaybe<Scalars['Bytes']>
  ethRecipient_gt?: InputMaybe<Scalars['Bytes']>
  ethRecipient_gte?: InputMaybe<Scalars['Bytes']>
  ethRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  ethRecipient_lt?: InputMaybe<Scalars['Bytes']>
  ethRecipient_lte?: InputMaybe<Scalars['Bytes']>
  ethRecipient_not?: InputMaybe<Scalars['Bytes']>
  ethRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  ethRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  isActive?: InputMaybe<Scalars['Boolean']>
  isActive_in?: InputMaybe<Array<Scalars['Boolean']>>
  isActive_not?: InputMaybe<Scalars['Boolean']>
  isActive_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  or?: InputMaybe<Array<InputMaybe<SalesConfigRedeemMinterStrategy_Filter>>>
  redeemInstructions_?: InputMaybe<RedeemInstructions_Filter>
  redeemMintToken?: InputMaybe<Scalars['String']>
  redeemMintToken_?: InputMaybe<RedeemMintToken_Filter>
  redeemMintToken_contains?: InputMaybe<Scalars['String']>
  redeemMintToken_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMintToken_ends_with?: InputMaybe<Scalars['String']>
  redeemMintToken_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMintToken_gt?: InputMaybe<Scalars['String']>
  redeemMintToken_gte?: InputMaybe<Scalars['String']>
  redeemMintToken_in?: InputMaybe<Array<Scalars['String']>>
  redeemMintToken_lt?: InputMaybe<Scalars['String']>
  redeemMintToken_lte?: InputMaybe<Scalars['String']>
  redeemMintToken_not?: InputMaybe<Scalars['String']>
  redeemMintToken_not_contains?: InputMaybe<Scalars['String']>
  redeemMintToken_not_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMintToken_not_ends_with?: InputMaybe<Scalars['String']>
  redeemMintToken_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMintToken_not_in?: InputMaybe<Array<Scalars['String']>>
  redeemMintToken_not_starts_with?: InputMaybe<Scalars['String']>
  redeemMintToken_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemMintToken_starts_with?: InputMaybe<Scalars['String']>
  redeemMintToken_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemsInstructionsHash?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_contains?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_gt?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_gte?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_in?: InputMaybe<Array<Scalars['Bytes']>>
  redeemsInstructionsHash_lt?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_lte?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not_contains?: InputMaybe<Scalars['Bytes']>
  redeemsInstructionsHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  saleEnd?: InputMaybe<Scalars['BigInt']>
  saleEnd_gt?: InputMaybe<Scalars['BigInt']>
  saleEnd_gte?: InputMaybe<Scalars['BigInt']>
  saleEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleEnd_lt?: InputMaybe<Scalars['BigInt']>
  saleEnd_lte?: InputMaybe<Scalars['BigInt']>
  saleEnd_not?: InputMaybe<Scalars['BigInt']>
  saleEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleStart?: InputMaybe<Scalars['BigInt']>
  saleStart_gt?: InputMaybe<Scalars['BigInt']>
  saleStart_gte?: InputMaybe<Scalars['BigInt']>
  saleStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  saleStart_lt?: InputMaybe<Scalars['BigInt']>
  saleStart_lte?: InputMaybe<Scalars['BigInt']>
  saleStart_not?: InputMaybe<Scalars['BigInt']>
  saleStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  target?: InputMaybe<Scalars['Bytes']>
  target_contains?: InputMaybe<Scalars['Bytes']>
  target_gt?: InputMaybe<Scalars['Bytes']>
  target_gte?: InputMaybe<Scalars['Bytes']>
  target_in?: InputMaybe<Array<Scalars['Bytes']>>
  target_lt?: InputMaybe<Scalars['Bytes']>
  target_lte?: InputMaybe<Scalars['Bytes']>
  target_not?: InputMaybe<Scalars['Bytes']>
  target_not_contains?: InputMaybe<Scalars['Bytes']>
  target_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum SalesConfigRedeemMinterStrategy_OrderBy {
  Address = 'address',
  Block = 'block',
  ConfigAddress = 'configAddress',
  EthAmount = 'ethAmount',
  EthRecipient = 'ethRecipient',
  Id = 'id',
  IsActive = 'isActive',
  RedeemInstructions = 'redeemInstructions',
  RedeemMintToken = 'redeemMintToken',
  RedeemMintTokenAmount = 'redeemMintToken__amount',
  RedeemMintTokenId = 'redeemMintToken__id',
  RedeemMintTokenTokenContract = 'redeemMintToken__tokenContract',
  RedeemMintTokenTokenId = 'redeemMintToken__tokenId',
  RedeemMintTokenTokenType = 'redeemMintToken__tokenType',
  RedeemsInstructionsHash = 'redeemsInstructionsHash',
  SaleEnd = 'saleEnd',
  SaleStart = 'saleStart',
  Target = 'target',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type SalesConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<SalesConfig_Filter>>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  maxSalePurchasePerAddress?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_gt?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_gte?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_in?: InputMaybe<Array<Scalars['BigInt']>>
  maxSalePurchasePerAddress_lt?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_lte?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_not?: InputMaybe<Scalars['BigInt']>
  maxSalePurchasePerAddress_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  or?: InputMaybe<Array<InputMaybe<SalesConfig_Filter>>>
  presaleEnd?: InputMaybe<Scalars['BigInt']>
  presaleEnd_gt?: InputMaybe<Scalars['BigInt']>
  presaleEnd_gte?: InputMaybe<Scalars['BigInt']>
  presaleEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleEnd_lt?: InputMaybe<Scalars['BigInt']>
  presaleEnd_lte?: InputMaybe<Scalars['BigInt']>
  presaleEnd_not?: InputMaybe<Scalars['BigInt']>
  presaleEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleMerkleRoot?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_contains?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_gt?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_gte?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_in?: InputMaybe<Array<Scalars['Bytes']>>
  presaleMerkleRoot_lt?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_lte?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_not?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_not_contains?: InputMaybe<Scalars['Bytes']>
  presaleMerkleRoot_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  presaleStart?: InputMaybe<Scalars['BigInt']>
  presaleStart_gt?: InputMaybe<Scalars['BigInt']>
  presaleStart_gte?: InputMaybe<Scalars['BigInt']>
  presaleStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  presaleStart_lt?: InputMaybe<Scalars['BigInt']>
  presaleStart_lte?: InputMaybe<Scalars['BigInt']>
  presaleStart_not?: InputMaybe<Scalars['BigInt']>
  presaleStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSaleEnd?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_gt?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_gte?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSaleEnd_lt?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_lte?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_not?: InputMaybe<Scalars['BigInt']>
  publicSaleEnd_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSalePrice?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_gt?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_gte?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSalePrice_lt?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_lte?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_not?: InputMaybe<Scalars['BigInt']>
  publicSalePrice_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSaleStart?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_gt?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_gte?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_in?: InputMaybe<Array<Scalars['BigInt']>>
  publicSaleStart_lt?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_lte?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_not?: InputMaybe<Scalars['BigInt']>
  publicSaleStart_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum SalesConfig_OrderBy {
  Id = 'id',
  MaxSalePurchasePerAddress = 'maxSalePurchasePerAddress',
  PresaleEnd = 'presaleEnd',
  PresaleMerkleRoot = 'presaleMerkleRoot',
  PresaleStart = 'presaleStart',
  PublicSaleEnd = 'publicSaleEnd',
  PublicSalePrice = 'publicSalePrice',
  PublicSaleStart = 'publicSaleStart',
}

export type SalesStrategyConfig = {
  __typename?: 'SalesStrategyConfig'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  contract?: Maybe<ZoraCreateContract>
  fixedPrice?: Maybe<SalesConfigFixedPriceSaleStrategy>
  id: Scalars['ID']
  presale?: Maybe<SalesConfigMerkleMinterStrategy>
  redeemMinter?: Maybe<SalesConfigRedeemMinterStrategy>
  timestamp: Scalars['BigInt']
  tokenAndContract?: Maybe<ZoraCreateToken>
  txn: TransactionInfo
  type: Scalars['String']
}

export type SalesStrategyConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<SalesStrategyConfig_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  fixedPrice?: InputMaybe<Scalars['String']>
  fixedPrice_?: InputMaybe<SalesConfigFixedPriceSaleStrategy_Filter>
  fixedPrice_contains?: InputMaybe<Scalars['String']>
  fixedPrice_contains_nocase?: InputMaybe<Scalars['String']>
  fixedPrice_ends_with?: InputMaybe<Scalars['String']>
  fixedPrice_ends_with_nocase?: InputMaybe<Scalars['String']>
  fixedPrice_gt?: InputMaybe<Scalars['String']>
  fixedPrice_gte?: InputMaybe<Scalars['String']>
  fixedPrice_in?: InputMaybe<Array<Scalars['String']>>
  fixedPrice_lt?: InputMaybe<Scalars['String']>
  fixedPrice_lte?: InputMaybe<Scalars['String']>
  fixedPrice_not?: InputMaybe<Scalars['String']>
  fixedPrice_not_contains?: InputMaybe<Scalars['String']>
  fixedPrice_not_contains_nocase?: InputMaybe<Scalars['String']>
  fixedPrice_not_ends_with?: InputMaybe<Scalars['String']>
  fixedPrice_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  fixedPrice_not_in?: InputMaybe<Array<Scalars['String']>>
  fixedPrice_not_starts_with?: InputMaybe<Scalars['String']>
  fixedPrice_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  fixedPrice_starts_with?: InputMaybe<Scalars['String']>
  fixedPrice_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  or?: InputMaybe<Array<InputMaybe<SalesStrategyConfig_Filter>>>
  presale?: InputMaybe<Scalars['String']>
  presale_?: InputMaybe<SalesConfigMerkleMinterStrategy_Filter>
  presale_contains?: InputMaybe<Scalars['String']>
  presale_contains_nocase?: InputMaybe<Scalars['String']>
  presale_ends_with?: InputMaybe<Scalars['String']>
  presale_ends_with_nocase?: InputMaybe<Scalars['String']>
  presale_gt?: InputMaybe<Scalars['String']>
  presale_gte?: InputMaybe<Scalars['String']>
  presale_in?: InputMaybe<Array<Scalars['String']>>
  presale_lt?: InputMaybe<Scalars['String']>
  presale_lte?: InputMaybe<Scalars['String']>
  presale_not?: InputMaybe<Scalars['String']>
  presale_not_contains?: InputMaybe<Scalars['String']>
  presale_not_contains_nocase?: InputMaybe<Scalars['String']>
  presale_not_ends_with?: InputMaybe<Scalars['String']>
  presale_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  presale_not_in?: InputMaybe<Array<Scalars['String']>>
  presale_not_starts_with?: InputMaybe<Scalars['String']>
  presale_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  presale_starts_with?: InputMaybe<Scalars['String']>
  presale_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter?: InputMaybe<Scalars['String']>
  redeemMinter_?: InputMaybe<SalesConfigRedeemMinterStrategy_Filter>
  redeemMinter_contains?: InputMaybe<Scalars['String']>
  redeemMinter_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_gt?: InputMaybe<Scalars['String']>
  redeemMinter_gte?: InputMaybe<Scalars['String']>
  redeemMinter_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_lt?: InputMaybe<Scalars['String']>
  redeemMinter_lte?: InputMaybe<Scalars['String']>
  redeemMinter_not?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains?: InputMaybe<Scalars['String']>
  redeemMinter_not_contains_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_not_in?: InputMaybe<Array<Scalars['String']>>
  redeemMinter_not_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with?: InputMaybe<Scalars['String']>
  redeemMinter_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  type_contains?: InputMaybe<Scalars['String']>
  type_contains_nocase?: InputMaybe<Scalars['String']>
  type_ends_with?: InputMaybe<Scalars['String']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_gt?: InputMaybe<Scalars['String']>
  type_gte?: InputMaybe<Scalars['String']>
  type_in?: InputMaybe<Array<Scalars['String']>>
  type_lt?: InputMaybe<Scalars['String']>
  type_lte?: InputMaybe<Scalars['String']>
  type_not?: InputMaybe<Scalars['String']>
  type_not_contains?: InputMaybe<Scalars['String']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']>
  type_not_ends_with?: InputMaybe<Scalars['String']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_not_in?: InputMaybe<Array<Scalars['String']>>
  type_not_starts_with?: InputMaybe<Scalars['String']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  type_starts_with?: InputMaybe<Scalars['String']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum SalesStrategyConfig_OrderBy {
  Address = 'address',
  Block = 'block',
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  FixedPrice = 'fixedPrice',
  FixedPriceAddress = 'fixedPrice__address',
  FixedPriceBlock = 'fixedPrice__block',
  FixedPriceConfigAddress = 'fixedPrice__configAddress',
  FixedPriceFundsRecipient = 'fixedPrice__fundsRecipient',
  FixedPriceId = 'fixedPrice__id',
  FixedPriceMaxTokensPerAddress = 'fixedPrice__maxTokensPerAddress',
  FixedPricePricePerToken = 'fixedPrice__pricePerToken',
  FixedPriceSaleEnd = 'fixedPrice__saleEnd',
  FixedPriceSaleStart = 'fixedPrice__saleStart',
  FixedPriceTimestamp = 'fixedPrice__timestamp',
  FixedPriceTokenId = 'fixedPrice__tokenId',
  Id = 'id',
  Presale = 'presale',
  PresaleAddress = 'presale__address',
  PresaleBlock = 'presale__block',
  PresaleConfigAddress = 'presale__configAddress',
  PresaleFundsRecipient = 'presale__fundsRecipient',
  PresaleId = 'presale__id',
  PresaleMerkleRoot = 'presale__merkleRoot',
  PresalePresaleEnd = 'presale__presaleEnd',
  PresalePresaleStart = 'presale__presaleStart',
  PresaleTimestamp = 'presale__timestamp',
  PresaleTokenId = 'presale__tokenId',
  RedeemMinter = 'redeemMinter',
  RedeemMinterAddress = 'redeemMinter__address',
  RedeemMinterBlock = 'redeemMinter__block',
  RedeemMinterConfigAddress = 'redeemMinter__configAddress',
  RedeemMinterEthAmount = 'redeemMinter__ethAmount',
  RedeemMinterEthRecipient = 'redeemMinter__ethRecipient',
  RedeemMinterId = 'redeemMinter__id',
  RedeemMinterIsActive = 'redeemMinter__isActive',
  RedeemMinterRedeemsInstructionsHash = 'redeemMinter__redeemsInstructionsHash',
  RedeemMinterSaleEnd = 'redeemMinter__saleEnd',
  RedeemMinterSaleStart = 'redeemMinter__saleStart',
  RedeemMinterTarget = 'redeemMinter__target',
  RedeemMinterTimestamp = 'redeemMinter__timestamp',
  Timestamp = 'timestamp',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Type = 'type',
}

export type Subscription = {
  __typename?: 'Subscription'
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>
  dropMetadata: Array<DropMetadata>
  editionMetadata: Array<EditionMetadata>
  knownRenderer?: Maybe<KnownRenderer>
  knownRenderers: Array<KnownRenderer>
  metadataInfo?: Maybe<MetadataInfo>
  metadataInfos: Array<MetadataInfo>
  mintComment?: Maybe<MintComment>
  mintComments: Array<MintComment>
  onChainMetadataHistories: Array<OnChainMetadataHistory>
  onChainMetadataHistory?: Maybe<OnChainMetadataHistory>
  redeemInstructions: Array<RedeemInstructions>
  redeemMintToken?: Maybe<RedeemMintToken>
  redeemMintTokens: Array<RedeemMintToken>
  redeemMinterProcessed?: Maybe<RedeemMinterProcessed>
  redeemMinterProcesseds: Array<RedeemMinterProcessed>
  redeemProcessedTokenPair?: Maybe<RedeemProcessedTokenPair>
  redeemProcessedTokenPairs: Array<RedeemProcessedTokenPair>
  rewardsAggregate?: Maybe<RewardsAggregate>
  rewardsAggregates: Array<RewardsAggregate>
  rewardsDeposit?: Maybe<RewardsDeposit>
  rewardsDeposits: Array<RewardsDeposit>
  rewardsPerSource?: Maybe<RewardsPerSource>
  rewardsPerSources: Array<RewardsPerSource>
  rewardsPerUser?: Maybe<RewardsPerUser>
  rewardsPerUserPerDay?: Maybe<RewardsPerUserPerDay>
  rewardsPerUserPerDays: Array<RewardsPerUserPerDay>
  rewardsPerUserPerSource?: Maybe<RewardsPerUserPerSource>
  rewardsPerUserPerSources: Array<RewardsPerUserPerSource>
  rewardsPerUserPerType?: Maybe<RewardsPerUserPerType>
  rewardsPerUserPerTypes: Array<RewardsPerUserPerType>
  rewardsPerUsers: Array<RewardsPerUser>
  rewardsSingleDeposit?: Maybe<RewardsSingleDeposit>
  rewardsSingleDeposits: Array<RewardsSingleDeposit>
  rewardsWithdraw?: Maybe<RewardsWithdraw>
  rewardsWithdraws: Array<RewardsWithdraw>
  royaltyConfig?: Maybe<RoyaltyConfig>
  royaltyConfigs: Array<RoyaltyConfig>
  salesConfig?: Maybe<SalesConfig>
  salesConfigFixedPriceSaleStrategies: Array<SalesConfigFixedPriceSaleStrategy>
  salesConfigFixedPriceSaleStrategy?: Maybe<SalesConfigFixedPriceSaleStrategy>
  salesConfigMerkleMinterStrategies: Array<SalesConfigMerkleMinterStrategy>
  salesConfigMerkleMinterStrategy?: Maybe<SalesConfigMerkleMinterStrategy>
  salesConfigRedeemMinterStrategies: Array<SalesConfigRedeemMinterStrategy>
  salesConfigRedeemMinterStrategy?: Maybe<SalesConfigRedeemMinterStrategy>
  salesConfigs: Array<SalesConfig>
  salesStrategyConfig?: Maybe<SalesStrategyConfig>
  salesStrategyConfigs: Array<SalesStrategyConfig>
  token1155Holder?: Maybe<Token1155Holder>
  token1155Holders: Array<Token1155Holder>
  tokenSale?: Maybe<TokenSale>
  tokenSales: Array<TokenSale>
  transactionInfo?: Maybe<TransactionInfo>
  transactionInfos: Array<TransactionInfo>
  upgrade?: Maybe<Upgrade>
  upgrades: Array<Upgrade>
  zoraCreate721Factories: Array<ZoraCreate721Factory>
  zoraCreate721Factory?: Maybe<ZoraCreate721Factory>
  zoraCreate1155Factories: Array<ZoraCreate1155Factory>
  zoraCreate1155Factory?: Maybe<ZoraCreate1155Factory>
  zoraCreateContract?: Maybe<ZoraCreateContract>
  zoraCreateContracts: Array<ZoraCreateContract>
  zoraCreateToken?: Maybe<ZoraCreateToken>
  zoraCreateTokens: Array<ZoraCreateToken>
  zoraCreatorPermission?: Maybe<ZoraCreatorPermission>
  zoraCreatorPermissions: Array<ZoraCreatorPermission>
  zoraCreatorRedeemConfig?: Maybe<ZoraCreatorRedeemConfig>
  zoraCreatorRedeemConfigs: Array<ZoraCreatorRedeemConfig>
}

export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>
}

export type SubscriptionDropMetadataArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<DropMetadata_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<DropMetadata_Filter>
}

export type SubscriptionEditionMetadataArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<EditionMetadata_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<EditionMetadata_Filter>
}

export type SubscriptionKnownRendererArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionKnownRenderersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<KnownRenderer_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<KnownRenderer_Filter>
}

export type SubscriptionMetadataInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMetadataInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<MetadataInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<MetadataInfo_Filter>
}

export type SubscriptionMintCommentArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionMintCommentsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<MintComment_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<MintComment_Filter>
}

export type SubscriptionOnChainMetadataHistoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OnChainMetadataHistory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<OnChainMetadataHistory_Filter>
}

export type SubscriptionOnChainMetadataHistoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRedeemInstructionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemInstructions_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemInstructions_Filter>
}

export type SubscriptionRedeemMintTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRedeemMintTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemMintToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemMintToken_Filter>
}

export type SubscriptionRedeemMinterProcessedArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRedeemMinterProcessedsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemMinterProcessed_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemMinterProcessed_Filter>
}

export type SubscriptionRedeemProcessedTokenPairArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRedeemProcessedTokenPairsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RedeemProcessedTokenPair_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RedeemProcessedTokenPair_Filter>
}

export type SubscriptionRewardsAggregateArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsAggregatesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsAggregate_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsAggregate_Filter>
}

export type SubscriptionRewardsDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsDeposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsDeposit_Filter>
}

export type SubscriptionRewardsPerSourceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsPerSourcesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerSource_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerSource_Filter>
}

export type SubscriptionRewardsPerUserArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsPerUserPerDayArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsPerUserPerDaysArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerDay_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerDay_Filter>
}

export type SubscriptionRewardsPerUserPerSourceArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsPerUserPerSourcesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerSource_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerSource_Filter>
}

export type SubscriptionRewardsPerUserPerTypeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsPerUserPerTypesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUserPerType_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUserPerType_Filter>
}

export type SubscriptionRewardsPerUsersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsPerUser_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsPerUser_Filter>
}

export type SubscriptionRewardsSingleDepositArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsSingleDepositsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsSingleDeposit_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsSingleDeposit_Filter>
}

export type SubscriptionRewardsWithdrawArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRewardsWithdrawsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RewardsWithdraw_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RewardsWithdraw_Filter>
}

export type SubscriptionRoyaltyConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionRoyaltyConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RoyaltyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<RoyaltyConfig_Filter>
}

export type SubscriptionSalesConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSalesConfigFixedPriceSaleStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigFixedPriceSaleStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigFixedPriceSaleStrategy_Filter>
}

export type SubscriptionSalesConfigFixedPriceSaleStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSalesConfigMerkleMinterStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigMerkleMinterStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigMerkleMinterStrategy_Filter>
}

export type SubscriptionSalesConfigMerkleMinterStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSalesConfigRedeemMinterStrategiesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfigRedeemMinterStrategy_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfigRedeemMinterStrategy_Filter>
}

export type SubscriptionSalesConfigRedeemMinterStrategyArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSalesConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesConfig_Filter>
}

export type SubscriptionSalesStrategyConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionSalesStrategyConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesStrategyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<SalesStrategyConfig_Filter>
}

export type SubscriptionToken1155HolderArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionToken1155HoldersArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token1155Holder_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Token1155Holder_Filter>
}

export type SubscriptionTokenSaleArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTokenSalesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TokenSale_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TokenSale_Filter>
}

export type SubscriptionTransactionInfoArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionTransactionInfosArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TransactionInfo_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<TransactionInfo_Filter>
}

export type SubscriptionUpgradeArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionUpgradesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Upgrade_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<Upgrade_Filter>
}

export type SubscriptionZoraCreate721FactoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreate721Factory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreate721Factory_Filter>
}

export type SubscriptionZoraCreate721FactoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreate1155FactoriesArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreate1155Factory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreate1155Factory_Filter>
}

export type SubscriptionZoraCreate1155FactoryArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreateContractArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreateContractsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreateContract_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreateContract_Filter>
}

export type SubscriptionZoraCreateTokenArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreateTokensArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreateToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreateToken_Filter>
}

export type SubscriptionZoraCreatorPermissionArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreatorPermissionsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorPermission_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreatorPermission_Filter>
}

export type SubscriptionZoraCreatorRedeemConfigArgs = {
  block?: InputMaybe<Block_Height>
  id: Scalars['ID']
  subgraphError?: _SubgraphErrorPolicy_
}

export type SubscriptionZoraCreatorRedeemConfigsArgs = {
  block?: InputMaybe<Block_Height>
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorRedeemConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  subgraphError?: _SubgraphErrorPolicy_
  where?: InputMaybe<ZoraCreatorRedeemConfig_Filter>
}

export type Token1155Holder = {
  __typename?: 'Token1155Holder'
  balance: Scalars['BigInt']
  id: Scalars['ID']
  lastUpdatedBlock: Scalars['BigInt']
  tokenAndContract: ZoraCreateToken
  user: Scalars['Bytes']
}

export type Token1155Holder_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<Token1155Holder_Filter>>>
  balance?: InputMaybe<Scalars['BigInt']>
  balance_gt?: InputMaybe<Scalars['BigInt']>
  balance_gte?: InputMaybe<Scalars['BigInt']>
  balance_in?: InputMaybe<Array<Scalars['BigInt']>>
  balance_lt?: InputMaybe<Scalars['BigInt']>
  balance_lte?: InputMaybe<Scalars['BigInt']>
  balance_not?: InputMaybe<Scalars['BigInt']>
  balance_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  lastUpdatedBlock?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_gt?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_gte?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_in?: InputMaybe<Array<Scalars['BigInt']>>
  lastUpdatedBlock_lt?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_lte?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_not?: InputMaybe<Scalars['BigInt']>
  lastUpdatedBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  or?: InputMaybe<Array<InputMaybe<Token1155Holder_Filter>>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  user?: InputMaybe<Scalars['Bytes']>
  user_contains?: InputMaybe<Scalars['Bytes']>
  user_gt?: InputMaybe<Scalars['Bytes']>
  user_gte?: InputMaybe<Scalars['Bytes']>
  user_in?: InputMaybe<Array<Scalars['Bytes']>>
  user_lt?: InputMaybe<Scalars['Bytes']>
  user_lte?: InputMaybe<Scalars['Bytes']>
  user_not?: InputMaybe<Scalars['Bytes']>
  user_not_contains?: InputMaybe<Scalars['Bytes']>
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum Token1155Holder_OrderBy {
  Balance = 'balance',
  Id = 'id',
  LastUpdatedBlock = 'lastUpdatedBlock',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  User = 'user',
}

export type TokenSale = {
  __typename?: 'TokenSale'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  firstPurchasedTokenId: Scalars['BigInt']
  id: Scalars['ID']
  mintRecipient: Scalars['Bytes']
  pricePerToken: Scalars['BigInt']
  quantity: Scalars['BigInt']
  timestamp: Scalars['BigInt']
  tokenAndContract: ZoraCreateToken
  txn: TransactionInfo
}

export type TokenSale_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<TokenSale_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstPurchasedTokenId?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_gt?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_gte?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  firstPurchasedTokenId_lt?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_lte?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_not?: InputMaybe<Scalars['BigInt']>
  firstPurchasedTokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  mintRecipient?: InputMaybe<Scalars['Bytes']>
  mintRecipient_contains?: InputMaybe<Scalars['Bytes']>
  mintRecipient_gt?: InputMaybe<Scalars['Bytes']>
  mintRecipient_gte?: InputMaybe<Scalars['Bytes']>
  mintRecipient_in?: InputMaybe<Array<Scalars['Bytes']>>
  mintRecipient_lt?: InputMaybe<Scalars['Bytes']>
  mintRecipient_lte?: InputMaybe<Scalars['Bytes']>
  mintRecipient_not?: InputMaybe<Scalars['Bytes']>
  mintRecipient_not_contains?: InputMaybe<Scalars['Bytes']>
  mintRecipient_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<TokenSale_Filter>>>
  pricePerToken?: InputMaybe<Scalars['BigInt']>
  pricePerToken_gt?: InputMaybe<Scalars['BigInt']>
  pricePerToken_gte?: InputMaybe<Scalars['BigInt']>
  pricePerToken_in?: InputMaybe<Array<Scalars['BigInt']>>
  pricePerToken_lt?: InputMaybe<Scalars['BigInt']>
  pricePerToken_lte?: InputMaybe<Scalars['BigInt']>
  pricePerToken_not?: InputMaybe<Scalars['BigInt']>
  pricePerToken_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  quantity?: InputMaybe<Scalars['BigInt']>
  quantity_gt?: InputMaybe<Scalars['BigInt']>
  quantity_gte?: InputMaybe<Scalars['BigInt']>
  quantity_in?: InputMaybe<Array<Scalars['BigInt']>>
  quantity_lt?: InputMaybe<Scalars['BigInt']>
  quantity_lte?: InputMaybe<Scalars['BigInt']>
  quantity_not?: InputMaybe<Scalars['BigInt']>
  quantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum TokenSale_OrderBy {
  Address = 'address',
  Block = 'block',
  FirstPurchasedTokenId = 'firstPurchasedTokenId',
  Id = 'id',
  MintRecipient = 'mintRecipient',
  PricePerToken = 'pricePerToken',
  Quantity = 'quantity',
  Timestamp = 'timestamp',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type TransactionInfo = {
  __typename?: 'TransactionInfo'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  chainId: Scalars['BigInt']
  id: Scalars['ID']
  logIndex: Scalars['BigInt']
  network: Scalars['String']
  timestamp: Scalars['BigInt']
}

export type TransactionInfo_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<TransactionInfo_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  chainId?: InputMaybe<Scalars['BigInt']>
  chainId_gt?: InputMaybe<Scalars['BigInt']>
  chainId_gte?: InputMaybe<Scalars['BigInt']>
  chainId_in?: InputMaybe<Array<Scalars['BigInt']>>
  chainId_lt?: InputMaybe<Scalars['BigInt']>
  chainId_lte?: InputMaybe<Scalars['BigInt']>
  chainId_not?: InputMaybe<Scalars['BigInt']>
  chainId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  logIndex?: InputMaybe<Scalars['BigInt']>
  logIndex_gt?: InputMaybe<Scalars['BigInt']>
  logIndex_gte?: InputMaybe<Scalars['BigInt']>
  logIndex_in?: InputMaybe<Array<Scalars['BigInt']>>
  logIndex_lt?: InputMaybe<Scalars['BigInt']>
  logIndex_lte?: InputMaybe<Scalars['BigInt']>
  logIndex_not?: InputMaybe<Scalars['BigInt']>
  logIndex_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  network?: InputMaybe<Scalars['String']>
  network_contains?: InputMaybe<Scalars['String']>
  network_contains_nocase?: InputMaybe<Scalars['String']>
  network_ends_with?: InputMaybe<Scalars['String']>
  network_ends_with_nocase?: InputMaybe<Scalars['String']>
  network_gt?: InputMaybe<Scalars['String']>
  network_gte?: InputMaybe<Scalars['String']>
  network_in?: InputMaybe<Array<Scalars['String']>>
  network_lt?: InputMaybe<Scalars['String']>
  network_lte?: InputMaybe<Scalars['String']>
  network_not?: InputMaybe<Scalars['String']>
  network_not_contains?: InputMaybe<Scalars['String']>
  network_not_contains_nocase?: InputMaybe<Scalars['String']>
  network_not_ends_with?: InputMaybe<Scalars['String']>
  network_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  network_not_in?: InputMaybe<Array<Scalars['String']>>
  network_not_starts_with?: InputMaybe<Scalars['String']>
  network_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  network_starts_with?: InputMaybe<Scalars['String']>
  network_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<TransactionInfo_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
}

export enum TransactionInfo_OrderBy {
  Address = 'address',
  Block = 'block',
  ChainId = 'chainId',
  Id = 'id',
  LogIndex = 'logIndex',
  Network = 'network',
  Timestamp = 'timestamp',
}

export type Upgrade = {
  __typename?: 'Upgrade'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  id: Scalars['ID']
  impl?: Maybe<Scalars['Bytes']>
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
  type?: Maybe<Scalars['String']>
}

export type Upgrade_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<Upgrade_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  impl?: InputMaybe<Scalars['Bytes']>
  impl_contains?: InputMaybe<Scalars['Bytes']>
  impl_gt?: InputMaybe<Scalars['Bytes']>
  impl_gte?: InputMaybe<Scalars['Bytes']>
  impl_in?: InputMaybe<Array<Scalars['Bytes']>>
  impl_lt?: InputMaybe<Scalars['Bytes']>
  impl_lte?: InputMaybe<Scalars['Bytes']>
  impl_not?: InputMaybe<Scalars['Bytes']>
  impl_not_contains?: InputMaybe<Scalars['Bytes']>
  impl_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<Upgrade_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  type?: InputMaybe<Scalars['String']>
  type_contains?: InputMaybe<Scalars['String']>
  type_contains_nocase?: InputMaybe<Scalars['String']>
  type_ends_with?: InputMaybe<Scalars['String']>
  type_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_gt?: InputMaybe<Scalars['String']>
  type_gte?: InputMaybe<Scalars['String']>
  type_in?: InputMaybe<Array<Scalars['String']>>
  type_lt?: InputMaybe<Scalars['String']>
  type_lte?: InputMaybe<Scalars['String']>
  type_not?: InputMaybe<Scalars['String']>
  type_not_contains?: InputMaybe<Scalars['String']>
  type_not_contains_nocase?: InputMaybe<Scalars['String']>
  type_not_ends_with?: InputMaybe<Scalars['String']>
  type_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  type_not_in?: InputMaybe<Array<Scalars['String']>>
  type_not_starts_with?: InputMaybe<Scalars['String']>
  type_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  type_starts_with?: InputMaybe<Scalars['String']>
  type_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum Upgrade_OrderBy {
  Address = 'address',
  Block = 'block',
  Id = 'id',
  Impl = 'impl',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Type = 'type',
}

export type ZoraCreate721Factory = {
  __typename?: 'ZoraCreate721Factory'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  dropMetadataRendererFactory: Scalars['Bytes']
  editionMetadataRendererFactory: Scalars['Bytes']
  id: Scalars['ID']
  implementation: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
  version: Scalars['String']
}

export type ZoraCreate721Factory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<ZoraCreate721Factory_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  dropMetadataRendererFactory?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_contains?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_gt?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_gte?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_in?: InputMaybe<Array<Scalars['Bytes']>>
  dropMetadataRendererFactory_lt?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_lte?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_not?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_not_contains?: InputMaybe<Scalars['Bytes']>
  dropMetadataRendererFactory_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  editionMetadataRendererFactory?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_contains?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_gt?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_gte?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_in?: InputMaybe<Array<Scalars['Bytes']>>
  editionMetadataRendererFactory_lt?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_lte?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_not?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_not_contains?: InputMaybe<Scalars['Bytes']>
  editionMetadataRendererFactory_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  implementation?: InputMaybe<Scalars['Bytes']>
  implementation_contains?: InputMaybe<Scalars['Bytes']>
  implementation_gt?: InputMaybe<Scalars['Bytes']>
  implementation_gte?: InputMaybe<Scalars['Bytes']>
  implementation_in?: InputMaybe<Array<Scalars['Bytes']>>
  implementation_lt?: InputMaybe<Scalars['Bytes']>
  implementation_lte?: InputMaybe<Scalars['Bytes']>
  implementation_not?: InputMaybe<Scalars['Bytes']>
  implementation_not_contains?: InputMaybe<Scalars['Bytes']>
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<ZoraCreate721Factory_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
  version_contains?: InputMaybe<Scalars['String']>
  version_contains_nocase?: InputMaybe<Scalars['String']>
  version_ends_with?: InputMaybe<Scalars['String']>
  version_ends_with_nocase?: InputMaybe<Scalars['String']>
  version_gt?: InputMaybe<Scalars['String']>
  version_gte?: InputMaybe<Scalars['String']>
  version_in?: InputMaybe<Array<Scalars['String']>>
  version_lt?: InputMaybe<Scalars['String']>
  version_lte?: InputMaybe<Scalars['String']>
  version_not?: InputMaybe<Scalars['String']>
  version_not_contains?: InputMaybe<Scalars['String']>
  version_not_contains_nocase?: InputMaybe<Scalars['String']>
  version_not_ends_with?: InputMaybe<Scalars['String']>
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  version_not_in?: InputMaybe<Array<Scalars['String']>>
  version_not_starts_with?: InputMaybe<Scalars['String']>
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  version_starts_with?: InputMaybe<Scalars['String']>
  version_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum ZoraCreate721Factory_OrderBy {
  Address = 'address',
  Block = 'block',
  DropMetadataRendererFactory = 'dropMetadataRendererFactory',
  EditionMetadataRendererFactory = 'editionMetadataRendererFactory',
  Id = 'id',
  Implementation = 'implementation',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Version = 'version',
}

export type ZoraCreate1155Factory = {
  __typename?: 'ZoraCreate1155Factory'
  block: Scalars['BigInt']
  fixedPriceSaleStrategyAddress: Scalars['Bytes']
  id: Scalars['ID']
  implementation: Scalars['Bytes']
  merkleSaleStrategyAddress: Scalars['Bytes']
  redeemMinterStrategyAddress?: Maybe<Scalars['Bytes']>
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
  version: Scalars['String']
}

export type ZoraCreate1155Factory_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<ZoraCreate1155Factory_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  fixedPriceSaleStrategyAddress?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_contains?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_gt?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_gte?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  fixedPriceSaleStrategyAddress_lt?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_lte?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_not?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  fixedPriceSaleStrategyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  implementation?: InputMaybe<Scalars['Bytes']>
  implementation_contains?: InputMaybe<Scalars['Bytes']>
  implementation_gt?: InputMaybe<Scalars['Bytes']>
  implementation_gte?: InputMaybe<Scalars['Bytes']>
  implementation_in?: InputMaybe<Array<Scalars['Bytes']>>
  implementation_lt?: InputMaybe<Scalars['Bytes']>
  implementation_lte?: InputMaybe<Scalars['Bytes']>
  implementation_not?: InputMaybe<Scalars['Bytes']>
  implementation_not_contains?: InputMaybe<Scalars['Bytes']>
  implementation_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  merkleSaleStrategyAddress?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_contains?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_gt?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_gte?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  merkleSaleStrategyAddress_lt?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_lte?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_not?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  merkleSaleStrategyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<ZoraCreate1155Factory_Filter>>>
  redeemMinterStrategyAddress?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_contains?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_gt?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_gte?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  redeemMinterStrategyAddress_lt?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_lte?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_not?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  redeemMinterStrategyAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  version?: InputMaybe<Scalars['String']>
  version_contains?: InputMaybe<Scalars['String']>
  version_contains_nocase?: InputMaybe<Scalars['String']>
  version_ends_with?: InputMaybe<Scalars['String']>
  version_ends_with_nocase?: InputMaybe<Scalars['String']>
  version_gt?: InputMaybe<Scalars['String']>
  version_gte?: InputMaybe<Scalars['String']>
  version_in?: InputMaybe<Array<Scalars['String']>>
  version_lt?: InputMaybe<Scalars['String']>
  version_lte?: InputMaybe<Scalars['String']>
  version_not?: InputMaybe<Scalars['String']>
  version_not_contains?: InputMaybe<Scalars['String']>
  version_not_contains_nocase?: InputMaybe<Scalars['String']>
  version_not_ends_with?: InputMaybe<Scalars['String']>
  version_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  version_not_in?: InputMaybe<Array<Scalars['String']>>
  version_not_starts_with?: InputMaybe<Scalars['String']>
  version_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  version_starts_with?: InputMaybe<Scalars['String']>
  version_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum ZoraCreate1155Factory_OrderBy {
  Block = 'block',
  FixedPriceSaleStrategyAddress = 'fixedPriceSaleStrategyAddress',
  Id = 'id',
  Implementation = 'implementation',
  MerkleSaleStrategyAddress = 'merkleSaleStrategyAddress',
  RedeemMinterStrategyAddress = 'redeemMinterStrategyAddress',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Version = 'version',
}

export type ZoraCreateContract = {
  __typename?: 'ZoraCreateContract'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  contractStandard: Scalars['String']
  contractURI?: Maybe<Scalars['String']>
  contractVersion?: Maybe<Scalars['String']>
  createdAtBlock: Scalars['BigInt']
  creator: Scalars['Bytes']
  id: Scalars['ID']
  initialDefaultAdmin?: Maybe<Scalars['Bytes']>
  likelyIsEdition?: Maybe<Scalars['Boolean']>
  metadata?: Maybe<MetadataInfo>
  metadataIPFSID?: Maybe<Scalars['String']>
  mintFeePerQuantity: Scalars['BigInt']
  name?: Maybe<Scalars['String']>
  owner: Scalars['Bytes']
  permissions: Array<ZoraCreatorPermission>
  rendererContract?: Maybe<Scalars['Bytes']>
  royalties?: Maybe<RoyaltyConfig>
  salesStrategies: Array<SalesStrategyConfig>
  symbol?: Maybe<Scalars['String']>
  timestamp: Scalars['BigInt']
  tokens: Array<ZoraCreateToken>
  txn: TransactionInfo
}

export type ZoraCreateContractPermissionsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorPermission_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ZoraCreatorPermission_Filter>
}

export type ZoraCreateContractSalesStrategiesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesStrategyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SalesStrategyConfig_Filter>
}

export type ZoraCreateContractTokensArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreateToken_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ZoraCreateToken_Filter>
}

export type ZoraCreateContract_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<ZoraCreateContract_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  contractStandard?: InputMaybe<Scalars['String']>
  contractStandard_contains?: InputMaybe<Scalars['String']>
  contractStandard_contains_nocase?: InputMaybe<Scalars['String']>
  contractStandard_ends_with?: InputMaybe<Scalars['String']>
  contractStandard_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractStandard_gt?: InputMaybe<Scalars['String']>
  contractStandard_gte?: InputMaybe<Scalars['String']>
  contractStandard_in?: InputMaybe<Array<Scalars['String']>>
  contractStandard_lt?: InputMaybe<Scalars['String']>
  contractStandard_lte?: InputMaybe<Scalars['String']>
  contractStandard_not?: InputMaybe<Scalars['String']>
  contractStandard_not_contains?: InputMaybe<Scalars['String']>
  contractStandard_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractStandard_not_ends_with?: InputMaybe<Scalars['String']>
  contractStandard_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractStandard_not_in?: InputMaybe<Array<Scalars['String']>>
  contractStandard_not_starts_with?: InputMaybe<Scalars['String']>
  contractStandard_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractStandard_starts_with?: InputMaybe<Scalars['String']>
  contractStandard_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI?: InputMaybe<Scalars['String']>
  contractURI_contains?: InputMaybe<Scalars['String']>
  contractURI_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_ends_with?: InputMaybe<Scalars['String']>
  contractURI_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_gt?: InputMaybe<Scalars['String']>
  contractURI_gte?: InputMaybe<Scalars['String']>
  contractURI_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_lt?: InputMaybe<Scalars['String']>
  contractURI_lte?: InputMaybe<Scalars['String']>
  contractURI_not?: InputMaybe<Scalars['String']>
  contractURI_not_contains?: InputMaybe<Scalars['String']>
  contractURI_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with?: InputMaybe<Scalars['String']>
  contractURI_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_not_in?: InputMaybe<Array<Scalars['String']>>
  contractURI_not_starts_with?: InputMaybe<Scalars['String']>
  contractURI_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractURI_starts_with?: InputMaybe<Scalars['String']>
  contractURI_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractVersion?: InputMaybe<Scalars['String']>
  contractVersion_contains?: InputMaybe<Scalars['String']>
  contractVersion_contains_nocase?: InputMaybe<Scalars['String']>
  contractVersion_ends_with?: InputMaybe<Scalars['String']>
  contractVersion_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractVersion_gt?: InputMaybe<Scalars['String']>
  contractVersion_gte?: InputMaybe<Scalars['String']>
  contractVersion_in?: InputMaybe<Array<Scalars['String']>>
  contractVersion_lt?: InputMaybe<Scalars['String']>
  contractVersion_lte?: InputMaybe<Scalars['String']>
  contractVersion_not?: InputMaybe<Scalars['String']>
  contractVersion_not_contains?: InputMaybe<Scalars['String']>
  contractVersion_not_contains_nocase?: InputMaybe<Scalars['String']>
  contractVersion_not_ends_with?: InputMaybe<Scalars['String']>
  contractVersion_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contractVersion_not_in?: InputMaybe<Array<Scalars['String']>>
  contractVersion_not_starts_with?: InputMaybe<Scalars['String']>
  contractVersion_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contractVersion_starts_with?: InputMaybe<Scalars['String']>
  contractVersion_starts_with_nocase?: InputMaybe<Scalars['String']>
  createdAtBlock?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  creator?: InputMaybe<Scalars['Bytes']>
  creator_contains?: InputMaybe<Scalars['Bytes']>
  creator_gt?: InputMaybe<Scalars['Bytes']>
  creator_gte?: InputMaybe<Scalars['Bytes']>
  creator_in?: InputMaybe<Array<Scalars['Bytes']>>
  creator_lt?: InputMaybe<Scalars['Bytes']>
  creator_lte?: InputMaybe<Scalars['Bytes']>
  creator_not?: InputMaybe<Scalars['Bytes']>
  creator_not_contains?: InputMaybe<Scalars['Bytes']>
  creator_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  initialDefaultAdmin?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_contains?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_gt?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_gte?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_in?: InputMaybe<Array<Scalars['Bytes']>>
  initialDefaultAdmin_lt?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_lte?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_not?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_not_contains?: InputMaybe<Scalars['Bytes']>
  initialDefaultAdmin_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  likelyIsEdition?: InputMaybe<Scalars['Boolean']>
  likelyIsEdition_in?: InputMaybe<Array<Scalars['Boolean']>>
  likelyIsEdition_not?: InputMaybe<Scalars['Boolean']>
  likelyIsEdition_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  metadata?: InputMaybe<Scalars['String']>
  metadataIPFSID?: InputMaybe<Scalars['String']>
  metadataIPFSID_contains?: InputMaybe<Scalars['String']>
  metadataIPFSID_contains_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_ends_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_gt?: InputMaybe<Scalars['String']>
  metadataIPFSID_gte?: InputMaybe<Scalars['String']>
  metadataIPFSID_in?: InputMaybe<Array<Scalars['String']>>
  metadataIPFSID_lt?: InputMaybe<Scalars['String']>
  metadataIPFSID_lte?: InputMaybe<Scalars['String']>
  metadataIPFSID_not?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_contains?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_contains_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_ends_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_in?: InputMaybe<Array<Scalars['String']>>
  metadataIPFSID_not_starts_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_starts_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadata_?: InputMaybe<MetadataInfo_Filter>
  metadata_contains?: InputMaybe<Scalars['String']>
  metadata_contains_nocase?: InputMaybe<Scalars['String']>
  metadata_ends_with?: InputMaybe<Scalars['String']>
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadata_gt?: InputMaybe<Scalars['String']>
  metadata_gte?: InputMaybe<Scalars['String']>
  metadata_in?: InputMaybe<Array<Scalars['String']>>
  metadata_lt?: InputMaybe<Scalars['String']>
  metadata_lte?: InputMaybe<Scalars['String']>
  metadata_not?: InputMaybe<Scalars['String']>
  metadata_not_contains?: InputMaybe<Scalars['String']>
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>
  metadata_not_ends_with?: InputMaybe<Scalars['String']>
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>
  metadata_not_starts_with?: InputMaybe<Scalars['String']>
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadata_starts_with?: InputMaybe<Scalars['String']>
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>
  mintFeePerQuantity?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_gt?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_gte?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_in?: InputMaybe<Array<Scalars['BigInt']>>
  mintFeePerQuantity_lt?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_lte?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_not?: InputMaybe<Scalars['BigInt']>
  mintFeePerQuantity_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  name?: InputMaybe<Scalars['String']>
  name_contains?: InputMaybe<Scalars['String']>
  name_contains_nocase?: InputMaybe<Scalars['String']>
  name_ends_with?: InputMaybe<Scalars['String']>
  name_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_gt?: InputMaybe<Scalars['String']>
  name_gte?: InputMaybe<Scalars['String']>
  name_in?: InputMaybe<Array<Scalars['String']>>
  name_lt?: InputMaybe<Scalars['String']>
  name_lte?: InputMaybe<Scalars['String']>
  name_not?: InputMaybe<Scalars['String']>
  name_not_contains?: InputMaybe<Scalars['String']>
  name_not_contains_nocase?: InputMaybe<Scalars['String']>
  name_not_ends_with?: InputMaybe<Scalars['String']>
  name_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  name_not_in?: InputMaybe<Array<Scalars['String']>>
  name_not_starts_with?: InputMaybe<Scalars['String']>
  name_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  name_starts_with?: InputMaybe<Scalars['String']>
  name_starts_with_nocase?: InputMaybe<Scalars['String']>
  or?: InputMaybe<Array<InputMaybe<ZoraCreateContract_Filter>>>
  owner?: InputMaybe<Scalars['Bytes']>
  owner_contains?: InputMaybe<Scalars['Bytes']>
  owner_gt?: InputMaybe<Scalars['Bytes']>
  owner_gte?: InputMaybe<Scalars['Bytes']>
  owner_in?: InputMaybe<Array<Scalars['Bytes']>>
  owner_lt?: InputMaybe<Scalars['Bytes']>
  owner_lte?: InputMaybe<Scalars['Bytes']>
  owner_not?: InputMaybe<Scalars['Bytes']>
  owner_not_contains?: InputMaybe<Scalars['Bytes']>
  owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  permissions_?: InputMaybe<ZoraCreatorPermission_Filter>
  rendererContract?: InputMaybe<Scalars['Bytes']>
  rendererContract_contains?: InputMaybe<Scalars['Bytes']>
  rendererContract_gt?: InputMaybe<Scalars['Bytes']>
  rendererContract_gte?: InputMaybe<Scalars['Bytes']>
  rendererContract_in?: InputMaybe<Array<Scalars['Bytes']>>
  rendererContract_lt?: InputMaybe<Scalars['Bytes']>
  rendererContract_lte?: InputMaybe<Scalars['Bytes']>
  rendererContract_not?: InputMaybe<Scalars['Bytes']>
  rendererContract_not_contains?: InputMaybe<Scalars['Bytes']>
  rendererContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  royalties_?: InputMaybe<RoyaltyConfig_Filter>
  salesStrategies_?: InputMaybe<SalesStrategyConfig_Filter>
  symbol?: InputMaybe<Scalars['String']>
  symbol_contains?: InputMaybe<Scalars['String']>
  symbol_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_ends_with?: InputMaybe<Scalars['String']>
  symbol_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_gt?: InputMaybe<Scalars['String']>
  symbol_gte?: InputMaybe<Scalars['String']>
  symbol_in?: InputMaybe<Array<Scalars['String']>>
  symbol_lt?: InputMaybe<Scalars['String']>
  symbol_lte?: InputMaybe<Scalars['String']>
  symbol_not?: InputMaybe<Scalars['String']>
  symbol_not_contains?: InputMaybe<Scalars['String']>
  symbol_not_contains_nocase?: InputMaybe<Scalars['String']>
  symbol_not_ends_with?: InputMaybe<Scalars['String']>
  symbol_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  symbol_not_in?: InputMaybe<Array<Scalars['String']>>
  symbol_not_starts_with?: InputMaybe<Scalars['String']>
  symbol_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  symbol_starts_with?: InputMaybe<Scalars['String']>
  symbol_starts_with_nocase?: InputMaybe<Scalars['String']>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokens_?: InputMaybe<ZoraCreateToken_Filter>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum ZoraCreateContract_OrderBy {
  Address = 'address',
  Block = 'block',
  ContractStandard = 'contractStandard',
  ContractUri = 'contractURI',
  ContractVersion = 'contractVersion',
  CreatedAtBlock = 'createdAtBlock',
  Creator = 'creator',
  Id = 'id',
  InitialDefaultAdmin = 'initialDefaultAdmin',
  LikelyIsEdition = 'likelyIsEdition',
  Metadata = 'metadata',
  MetadataIpfsid = 'metadataIPFSID',
  MetadataAnimationUrl = 'metadata__animationUrl',
  MetadataDecimals = 'metadata__decimals',
  MetadataDescription = 'metadata__description',
  MetadataId = 'metadata__id',
  MetadataImage = 'metadata__image',
  MetadataName = 'metadata__name',
  MetadataRawJson = 'metadata__rawJson',
  MintFeePerQuantity = 'mintFeePerQuantity',
  Name = 'name',
  Owner = 'owner',
  Permissions = 'permissions',
  RendererContract = 'rendererContract',
  Royalties = 'royalties',
  RoyaltiesId = 'royalties__id',
  RoyaltiesRoyaltyBps = 'royalties__royaltyBPS',
  RoyaltiesRoyaltyMintSchedule = 'royalties__royaltyMintSchedule',
  RoyaltiesRoyaltyRecipient = 'royalties__royaltyRecipient',
  RoyaltiesTokenId = 'royalties__tokenId',
  RoyaltiesUser = 'royalties__user',
  SalesStrategies = 'salesStrategies',
  Symbol = 'symbol',
  Timestamp = 'timestamp',
  Tokens = 'tokens',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type ZoraCreateToken = {
  __typename?: 'ZoraCreateToken'
  address: Scalars['Bytes']
  block: Scalars['BigInt']
  contract: ZoraCreateContract
  createdAtBlock: Scalars['BigInt']
  holders1155: Array<Token1155Holder>
  holders1155Number: Scalars['BigInt']
  id: Scalars['ID']
  maxSupply: Scalars['BigInt']
  metadata?: Maybe<MetadataInfo>
  metadataIPFSID?: Maybe<Scalars['String']>
  mintComments: Array<MintComment>
  onChainMetadataHistory: Array<OnChainMetadataHistory>
  permissions: Array<ZoraCreatorPermission>
  rendererContract?: Maybe<Scalars['Bytes']>
  royalties: Array<RoyaltyConfig>
  sales: Array<TokenSale>
  salesStrategies: Array<SalesStrategyConfig>
  timestamp: Scalars['BigInt']
  tokenId: Scalars['BigInt']
  tokenStandard: Scalars['String']
  totalMinted: Scalars['BigInt']
  totalSupply: Scalars['BigInt']
  txn: TransactionInfo
  uri?: Maybe<Scalars['String']>
}

export type ZoraCreateTokenHolders1155Args = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<Token1155Holder_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<Token1155Holder_Filter>
}

export type ZoraCreateTokenMintCommentsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<MintComment_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<MintComment_Filter>
}

export type ZoraCreateTokenOnChainMetadataHistoryArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<OnChainMetadataHistory_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<OnChainMetadataHistory_Filter>
}

export type ZoraCreateTokenPermissionsArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<ZoraCreatorPermission_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<ZoraCreatorPermission_Filter>
}

export type ZoraCreateTokenRoyaltiesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<RoyaltyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<RoyaltyConfig_Filter>
}

export type ZoraCreateTokenSalesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<TokenSale_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<TokenSale_Filter>
}

export type ZoraCreateTokenSalesStrategiesArgs = {
  first?: InputMaybe<Scalars['Int']>
  orderBy?: InputMaybe<SalesStrategyConfig_OrderBy>
  orderDirection?: InputMaybe<OrderDirection>
  skip?: InputMaybe<Scalars['Int']>
  where?: InputMaybe<SalesStrategyConfig_Filter>
}

export type ZoraCreateToken_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  address?: InputMaybe<Scalars['Bytes']>
  address_contains?: InputMaybe<Scalars['Bytes']>
  address_gt?: InputMaybe<Scalars['Bytes']>
  address_gte?: InputMaybe<Scalars['Bytes']>
  address_in?: InputMaybe<Array<Scalars['Bytes']>>
  address_lt?: InputMaybe<Scalars['Bytes']>
  address_lte?: InputMaybe<Scalars['Bytes']>
  address_not?: InputMaybe<Scalars['Bytes']>
  address_not_contains?: InputMaybe<Scalars['Bytes']>
  address_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  and?: InputMaybe<Array<InputMaybe<ZoraCreateToken_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  createdAtBlock?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_gte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_in?: InputMaybe<Array<Scalars['BigInt']>>
  createdAtBlock_lt?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_lte?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not?: InputMaybe<Scalars['BigInt']>
  createdAtBlock_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  holders1155Number?: InputMaybe<Scalars['BigInt']>
  holders1155Number_gt?: InputMaybe<Scalars['BigInt']>
  holders1155Number_gte?: InputMaybe<Scalars['BigInt']>
  holders1155Number_in?: InputMaybe<Array<Scalars['BigInt']>>
  holders1155Number_lt?: InputMaybe<Scalars['BigInt']>
  holders1155Number_lte?: InputMaybe<Scalars['BigInt']>
  holders1155Number_not?: InputMaybe<Scalars['BigInt']>
  holders1155Number_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  holders1155_?: InputMaybe<Token1155Holder_Filter>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  maxSupply?: InputMaybe<Scalars['BigInt']>
  maxSupply_gt?: InputMaybe<Scalars['BigInt']>
  maxSupply_gte?: InputMaybe<Scalars['BigInt']>
  maxSupply_in?: InputMaybe<Array<Scalars['BigInt']>>
  maxSupply_lt?: InputMaybe<Scalars['BigInt']>
  maxSupply_lte?: InputMaybe<Scalars['BigInt']>
  maxSupply_not?: InputMaybe<Scalars['BigInt']>
  maxSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  metadata?: InputMaybe<Scalars['String']>
  metadataIPFSID?: InputMaybe<Scalars['String']>
  metadataIPFSID_contains?: InputMaybe<Scalars['String']>
  metadataIPFSID_contains_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_ends_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_gt?: InputMaybe<Scalars['String']>
  metadataIPFSID_gte?: InputMaybe<Scalars['String']>
  metadataIPFSID_in?: InputMaybe<Array<Scalars['String']>>
  metadataIPFSID_lt?: InputMaybe<Scalars['String']>
  metadataIPFSID_lte?: InputMaybe<Scalars['String']>
  metadataIPFSID_not?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_contains?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_contains_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_ends_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_in?: InputMaybe<Array<Scalars['String']>>
  metadataIPFSID_not_starts_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadataIPFSID_starts_with?: InputMaybe<Scalars['String']>
  metadataIPFSID_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadata_?: InputMaybe<MetadataInfo_Filter>
  metadata_contains?: InputMaybe<Scalars['String']>
  metadata_contains_nocase?: InputMaybe<Scalars['String']>
  metadata_ends_with?: InputMaybe<Scalars['String']>
  metadata_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadata_gt?: InputMaybe<Scalars['String']>
  metadata_gte?: InputMaybe<Scalars['String']>
  metadata_in?: InputMaybe<Array<Scalars['String']>>
  metadata_lt?: InputMaybe<Scalars['String']>
  metadata_lte?: InputMaybe<Scalars['String']>
  metadata_not?: InputMaybe<Scalars['String']>
  metadata_not_contains?: InputMaybe<Scalars['String']>
  metadata_not_contains_nocase?: InputMaybe<Scalars['String']>
  metadata_not_ends_with?: InputMaybe<Scalars['String']>
  metadata_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  metadata_not_in?: InputMaybe<Array<Scalars['String']>>
  metadata_not_starts_with?: InputMaybe<Scalars['String']>
  metadata_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  metadata_starts_with?: InputMaybe<Scalars['String']>
  metadata_starts_with_nocase?: InputMaybe<Scalars['String']>
  mintComments_?: InputMaybe<MintComment_Filter>
  onChainMetadataHistory_?: InputMaybe<OnChainMetadataHistory_Filter>
  or?: InputMaybe<Array<InputMaybe<ZoraCreateToken_Filter>>>
  permissions_?: InputMaybe<ZoraCreatorPermission_Filter>
  rendererContract?: InputMaybe<Scalars['Bytes']>
  rendererContract_contains?: InputMaybe<Scalars['Bytes']>
  rendererContract_gt?: InputMaybe<Scalars['Bytes']>
  rendererContract_gte?: InputMaybe<Scalars['Bytes']>
  rendererContract_in?: InputMaybe<Array<Scalars['Bytes']>>
  rendererContract_lt?: InputMaybe<Scalars['Bytes']>
  rendererContract_lte?: InputMaybe<Scalars['Bytes']>
  rendererContract_not?: InputMaybe<Scalars['Bytes']>
  rendererContract_not_contains?: InputMaybe<Scalars['Bytes']>
  rendererContract_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  royalties_?: InputMaybe<RoyaltyConfig_Filter>
  salesStrategies_?: InputMaybe<SalesStrategyConfig_Filter>
  sales_?: InputMaybe<TokenSale_Filter>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenStandard?: InputMaybe<Scalars['String']>
  tokenStandard_contains?: InputMaybe<Scalars['String']>
  tokenStandard_contains_nocase?: InputMaybe<Scalars['String']>
  tokenStandard_ends_with?: InputMaybe<Scalars['String']>
  tokenStandard_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenStandard_gt?: InputMaybe<Scalars['String']>
  tokenStandard_gte?: InputMaybe<Scalars['String']>
  tokenStandard_in?: InputMaybe<Array<Scalars['String']>>
  tokenStandard_lt?: InputMaybe<Scalars['String']>
  tokenStandard_lte?: InputMaybe<Scalars['String']>
  tokenStandard_not?: InputMaybe<Scalars['String']>
  tokenStandard_not_contains?: InputMaybe<Scalars['String']>
  tokenStandard_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenStandard_not_ends_with?: InputMaybe<Scalars['String']>
  tokenStandard_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenStandard_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenStandard_not_starts_with?: InputMaybe<Scalars['String']>
  tokenStandard_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenStandard_starts_with?: InputMaybe<Scalars['String']>
  tokenStandard_starts_with_nocase?: InputMaybe<Scalars['String']>
  totalMinted?: InputMaybe<Scalars['BigInt']>
  totalMinted_gt?: InputMaybe<Scalars['BigInt']>
  totalMinted_gte?: InputMaybe<Scalars['BigInt']>
  totalMinted_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalMinted_lt?: InputMaybe<Scalars['BigInt']>
  totalMinted_lte?: InputMaybe<Scalars['BigInt']>
  totalMinted_not?: InputMaybe<Scalars['BigInt']>
  totalMinted_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalSupply?: InputMaybe<Scalars['BigInt']>
  totalSupply_gt?: InputMaybe<Scalars['BigInt']>
  totalSupply_gte?: InputMaybe<Scalars['BigInt']>
  totalSupply_in?: InputMaybe<Array<Scalars['BigInt']>>
  totalSupply_lt?: InputMaybe<Scalars['BigInt']>
  totalSupply_lte?: InputMaybe<Scalars['BigInt']>
  totalSupply_not?: InputMaybe<Scalars['BigInt']>
  totalSupply_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  uri?: InputMaybe<Scalars['String']>
  uri_contains?: InputMaybe<Scalars['String']>
  uri_contains_nocase?: InputMaybe<Scalars['String']>
  uri_ends_with?: InputMaybe<Scalars['String']>
  uri_ends_with_nocase?: InputMaybe<Scalars['String']>
  uri_gt?: InputMaybe<Scalars['String']>
  uri_gte?: InputMaybe<Scalars['String']>
  uri_in?: InputMaybe<Array<Scalars['String']>>
  uri_lt?: InputMaybe<Scalars['String']>
  uri_lte?: InputMaybe<Scalars['String']>
  uri_not?: InputMaybe<Scalars['String']>
  uri_not_contains?: InputMaybe<Scalars['String']>
  uri_not_contains_nocase?: InputMaybe<Scalars['String']>
  uri_not_ends_with?: InputMaybe<Scalars['String']>
  uri_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  uri_not_in?: InputMaybe<Array<Scalars['String']>>
  uri_not_starts_with?: InputMaybe<Scalars['String']>
  uri_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  uri_starts_with?: InputMaybe<Scalars['String']>
  uri_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum ZoraCreateToken_OrderBy {
  Address = 'address',
  Block = 'block',
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  CreatedAtBlock = 'createdAtBlock',
  Holders1155 = 'holders1155',
  Holders1155Number = 'holders1155Number',
  Id = 'id',
  MaxSupply = 'maxSupply',
  Metadata = 'metadata',
  MetadataIpfsid = 'metadataIPFSID',
  MetadataAnimationUrl = 'metadata__animationUrl',
  MetadataDecimals = 'metadata__decimals',
  MetadataDescription = 'metadata__description',
  MetadataId = 'metadata__id',
  MetadataImage = 'metadata__image',
  MetadataName = 'metadata__name',
  MetadataRawJson = 'metadata__rawJson',
  MintComments = 'mintComments',
  OnChainMetadataHistory = 'onChainMetadataHistory',
  Permissions = 'permissions',
  RendererContract = 'rendererContract',
  Royalties = 'royalties',
  Sales = 'sales',
  SalesStrategies = 'salesStrategies',
  Timestamp = 'timestamp',
  TokenId = 'tokenId',
  TokenStandard = 'tokenStandard',
  TotalMinted = 'totalMinted',
  TotalSupply = 'totalSupply',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  Uri = 'uri',
}

export type ZoraCreatorPermission = {
  __typename?: 'ZoraCreatorPermission'
  block: Scalars['BigInt']
  contract?: Maybe<ZoraCreateContract>
  id: Scalars['ID']
  isAdmin: Scalars['Boolean']
  isFundsManager: Scalars['Boolean']
  isMetadataManager: Scalars['Boolean']
  isMinter: Scalars['Boolean']
  isSalesManager: Scalars['Boolean']
  timestamp: Scalars['BigInt']
  tokenAndContract?: Maybe<ZoraCreateToken>
  tokenId: Scalars['BigInt']
  txn: TransactionInfo
  user: Scalars['Bytes']
}

export type ZoraCreatorPermission_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<ZoraCreatorPermission_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  contract?: InputMaybe<Scalars['String']>
  contract_?: InputMaybe<ZoraCreateContract_Filter>
  contract_contains?: InputMaybe<Scalars['String']>
  contract_contains_nocase?: InputMaybe<Scalars['String']>
  contract_ends_with?: InputMaybe<Scalars['String']>
  contract_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_gt?: InputMaybe<Scalars['String']>
  contract_gte?: InputMaybe<Scalars['String']>
  contract_in?: InputMaybe<Array<Scalars['String']>>
  contract_lt?: InputMaybe<Scalars['String']>
  contract_lte?: InputMaybe<Scalars['String']>
  contract_not?: InputMaybe<Scalars['String']>
  contract_not_contains?: InputMaybe<Scalars['String']>
  contract_not_contains_nocase?: InputMaybe<Scalars['String']>
  contract_not_ends_with?: InputMaybe<Scalars['String']>
  contract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  contract_not_in?: InputMaybe<Array<Scalars['String']>>
  contract_not_starts_with?: InputMaybe<Scalars['String']>
  contract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  contract_starts_with?: InputMaybe<Scalars['String']>
  contract_starts_with_nocase?: InputMaybe<Scalars['String']>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  isAdmin?: InputMaybe<Scalars['Boolean']>
  isAdmin_in?: InputMaybe<Array<Scalars['Boolean']>>
  isAdmin_not?: InputMaybe<Scalars['Boolean']>
  isAdmin_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  isFundsManager?: InputMaybe<Scalars['Boolean']>
  isFundsManager_in?: InputMaybe<Array<Scalars['Boolean']>>
  isFundsManager_not?: InputMaybe<Scalars['Boolean']>
  isFundsManager_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  isMetadataManager?: InputMaybe<Scalars['Boolean']>
  isMetadataManager_in?: InputMaybe<Array<Scalars['Boolean']>>
  isMetadataManager_not?: InputMaybe<Scalars['Boolean']>
  isMetadataManager_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  isMinter?: InputMaybe<Scalars['Boolean']>
  isMinter_in?: InputMaybe<Array<Scalars['Boolean']>>
  isMinter_not?: InputMaybe<Scalars['Boolean']>
  isMinter_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  isSalesManager?: InputMaybe<Scalars['Boolean']>
  isSalesManager_in?: InputMaybe<Array<Scalars['Boolean']>>
  isSalesManager_not?: InputMaybe<Scalars['Boolean']>
  isSalesManager_not_in?: InputMaybe<Array<Scalars['Boolean']>>
  or?: InputMaybe<Array<InputMaybe<ZoraCreatorPermission_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenAndContract?: InputMaybe<Scalars['String']>
  tokenAndContract_?: InputMaybe<ZoraCreateToken_Filter>
  tokenAndContract_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_gt?: InputMaybe<Scalars['String']>
  tokenAndContract_gte?: InputMaybe<Scalars['String']>
  tokenAndContract_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_lt?: InputMaybe<Scalars['String']>
  tokenAndContract_lte?: InputMaybe<Scalars['String']>
  tokenAndContract_not?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains?: InputMaybe<Scalars['String']>
  tokenAndContract_not_contains_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_not_in?: InputMaybe<Array<Scalars['String']>>
  tokenAndContract_not_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with?: InputMaybe<Scalars['String']>
  tokenAndContract_starts_with_nocase?: InputMaybe<Scalars['String']>
  tokenId?: InputMaybe<Scalars['BigInt']>
  tokenId_gt?: InputMaybe<Scalars['BigInt']>
  tokenId_gte?: InputMaybe<Scalars['BigInt']>
  tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>
  tokenId_lt?: InputMaybe<Scalars['BigInt']>
  tokenId_lte?: InputMaybe<Scalars['BigInt']>
  tokenId_not?: InputMaybe<Scalars['BigInt']>
  tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
  user?: InputMaybe<Scalars['Bytes']>
  user_contains?: InputMaybe<Scalars['Bytes']>
  user_gt?: InputMaybe<Scalars['Bytes']>
  user_gte?: InputMaybe<Scalars['Bytes']>
  user_in?: InputMaybe<Array<Scalars['Bytes']>>
  user_lt?: InputMaybe<Scalars['Bytes']>
  user_lte?: InputMaybe<Scalars['Bytes']>
  user_not?: InputMaybe<Scalars['Bytes']>
  user_not_contains?: InputMaybe<Scalars['Bytes']>
  user_not_in?: InputMaybe<Array<Scalars['Bytes']>>
}

export enum ZoraCreatorPermission_OrderBy {
  Block = 'block',
  Contract = 'contract',
  ContractAddress = 'contract__address',
  ContractBlock = 'contract__block',
  ContractContractStandard = 'contract__contractStandard',
  ContractContractUri = 'contract__contractURI',
  ContractContractVersion = 'contract__contractVersion',
  ContractCreatedAtBlock = 'contract__createdAtBlock',
  ContractCreator = 'contract__creator',
  ContractId = 'contract__id',
  ContractInitialDefaultAdmin = 'contract__initialDefaultAdmin',
  ContractLikelyIsEdition = 'contract__likelyIsEdition',
  ContractMetadataIpfsid = 'contract__metadataIPFSID',
  ContractMintFeePerQuantity = 'contract__mintFeePerQuantity',
  ContractName = 'contract__name',
  ContractOwner = 'contract__owner',
  ContractRendererContract = 'contract__rendererContract',
  ContractSymbol = 'contract__symbol',
  ContractTimestamp = 'contract__timestamp',
  Id = 'id',
  IsAdmin = 'isAdmin',
  IsFundsManager = 'isFundsManager',
  IsMetadataManager = 'isMetadataManager',
  IsMinter = 'isMinter',
  IsSalesManager = 'isSalesManager',
  Timestamp = 'timestamp',
  TokenAndContract = 'tokenAndContract',
  TokenAndContractAddress = 'tokenAndContract__address',
  TokenAndContractBlock = 'tokenAndContract__block',
  TokenAndContractCreatedAtBlock = 'tokenAndContract__createdAtBlock',
  TokenAndContractHolders1155Number = 'tokenAndContract__holders1155Number',
  TokenAndContractId = 'tokenAndContract__id',
  TokenAndContractMaxSupply = 'tokenAndContract__maxSupply',
  TokenAndContractMetadataIpfsid = 'tokenAndContract__metadataIPFSID',
  TokenAndContractRendererContract = 'tokenAndContract__rendererContract',
  TokenAndContractTimestamp = 'tokenAndContract__timestamp',
  TokenAndContractTokenId = 'tokenAndContract__tokenId',
  TokenAndContractTokenStandard = 'tokenAndContract__tokenStandard',
  TokenAndContractTotalMinted = 'tokenAndContract__totalMinted',
  TokenAndContractTotalSupply = 'tokenAndContract__totalSupply',
  TokenAndContractUri = 'tokenAndContract__uri',
  TokenId = 'tokenId',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
  User = 'user',
}

export type ZoraCreatorRedeemConfig = {
  __typename?: 'ZoraCreatorRedeemConfig'
  block: Scalars['BigInt']
  creatorAddress: Scalars['Bytes']
  id: Scalars['ID']
  minterAddress: Scalars['Bytes']
  timestamp: Scalars['BigInt']
  txn: TransactionInfo
}

export type ZoraCreatorRedeemConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>
  and?: InputMaybe<Array<InputMaybe<ZoraCreatorRedeemConfig_Filter>>>
  block?: InputMaybe<Scalars['BigInt']>
  block_gt?: InputMaybe<Scalars['BigInt']>
  block_gte?: InputMaybe<Scalars['BigInt']>
  block_in?: InputMaybe<Array<Scalars['BigInt']>>
  block_lt?: InputMaybe<Scalars['BigInt']>
  block_lte?: InputMaybe<Scalars['BigInt']>
  block_not?: InputMaybe<Scalars['BigInt']>
  block_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  creatorAddress?: InputMaybe<Scalars['Bytes']>
  creatorAddress_contains?: InputMaybe<Scalars['Bytes']>
  creatorAddress_gt?: InputMaybe<Scalars['Bytes']>
  creatorAddress_gte?: InputMaybe<Scalars['Bytes']>
  creatorAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  creatorAddress_lt?: InputMaybe<Scalars['Bytes']>
  creatorAddress_lte?: InputMaybe<Scalars['Bytes']>
  creatorAddress_not?: InputMaybe<Scalars['Bytes']>
  creatorAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  creatorAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  id?: InputMaybe<Scalars['ID']>
  id_gt?: InputMaybe<Scalars['ID']>
  id_gte?: InputMaybe<Scalars['ID']>
  id_in?: InputMaybe<Array<Scalars['ID']>>
  id_lt?: InputMaybe<Scalars['ID']>
  id_lte?: InputMaybe<Scalars['ID']>
  id_not?: InputMaybe<Scalars['ID']>
  id_not_in?: InputMaybe<Array<Scalars['ID']>>
  minterAddress?: InputMaybe<Scalars['Bytes']>
  minterAddress_contains?: InputMaybe<Scalars['Bytes']>
  minterAddress_gt?: InputMaybe<Scalars['Bytes']>
  minterAddress_gte?: InputMaybe<Scalars['Bytes']>
  minterAddress_in?: InputMaybe<Array<Scalars['Bytes']>>
  minterAddress_lt?: InputMaybe<Scalars['Bytes']>
  minterAddress_lte?: InputMaybe<Scalars['Bytes']>
  minterAddress_not?: InputMaybe<Scalars['Bytes']>
  minterAddress_not_contains?: InputMaybe<Scalars['Bytes']>
  minterAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>
  or?: InputMaybe<Array<InputMaybe<ZoraCreatorRedeemConfig_Filter>>>
  timestamp?: InputMaybe<Scalars['BigInt']>
  timestamp_gt?: InputMaybe<Scalars['BigInt']>
  timestamp_gte?: InputMaybe<Scalars['BigInt']>
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>
  timestamp_lt?: InputMaybe<Scalars['BigInt']>
  timestamp_lte?: InputMaybe<Scalars['BigInt']>
  timestamp_not?: InputMaybe<Scalars['BigInt']>
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>
  txn?: InputMaybe<Scalars['String']>
  txn_?: InputMaybe<TransactionInfo_Filter>
  txn_contains?: InputMaybe<Scalars['String']>
  txn_contains_nocase?: InputMaybe<Scalars['String']>
  txn_ends_with?: InputMaybe<Scalars['String']>
  txn_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_gt?: InputMaybe<Scalars['String']>
  txn_gte?: InputMaybe<Scalars['String']>
  txn_in?: InputMaybe<Array<Scalars['String']>>
  txn_lt?: InputMaybe<Scalars['String']>
  txn_lte?: InputMaybe<Scalars['String']>
  txn_not?: InputMaybe<Scalars['String']>
  txn_not_contains?: InputMaybe<Scalars['String']>
  txn_not_contains_nocase?: InputMaybe<Scalars['String']>
  txn_not_ends_with?: InputMaybe<Scalars['String']>
  txn_not_ends_with_nocase?: InputMaybe<Scalars['String']>
  txn_not_in?: InputMaybe<Array<Scalars['String']>>
  txn_not_starts_with?: InputMaybe<Scalars['String']>
  txn_not_starts_with_nocase?: InputMaybe<Scalars['String']>
  txn_starts_with?: InputMaybe<Scalars['String']>
  txn_starts_with_nocase?: InputMaybe<Scalars['String']>
}

export enum ZoraCreatorRedeemConfig_OrderBy {
  Block = 'block',
  CreatorAddress = 'creatorAddress',
  Id = 'id',
  MinterAddress = 'minterAddress',
  Timestamp = 'timestamp',
  Txn = 'txn',
  TxnAddress = 'txn__address',
  TxnBlock = 'txn__block',
  TxnChainId = 'txn__chainId',
  TxnId = 'txn__id',
  TxnLogIndex = 'txn__logIndex',
  TxnNetwork = 'txn__network',
  TxnTimestamp = 'txn__timestamp',
}

export type _Block_ = {
  __typename?: '_Block_'
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>
  /** The block number */
  number: Scalars['Int']
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>
}

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_'
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_
  /** The deployment ID */
  deployment: Scalars['String']
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean']
}

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny',
}

export type CollectionFragment = {
  __typename?: 'ZoraCreateContract'
  id: Address
  address: Address
  name?: string | null
  symbol?: string | null
  owner: Address
  creator: Address
  contractURI?: string | null
  contractStandard: string
  contractVersion?: string | null
  mintFeePerQuantity: string
  timestamp: string
  metadata?: {
    __typename?: 'MetadataInfo'
    name?: string | null
    description?: string | null
    image?: string | null
    animationUrl?: string | null
    rawJson?: string | null
  } | null
  tokens: Array<{
    __typename?: 'ZoraCreateToken'
    id: Address
    tokenId: string
    address: Address
    uri?: string | null
    maxSupply: string
    totalMinted: string
    rendererContract?: Address | null
    contract: {
      __typename?: 'ZoraCreateContract'
      id: Address
      owner: Address
      creator: Address
      contractVersion?: string | null
      metadata?: {
        __typename?: 'MetadataInfo'
        name?: string | null
        description?: string | null
        image?: string | null
        animationUrl?: string | null
        rawJson?: string | null
      } | null
    }
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      description?: string | null
      image?: string | null
      animationUrl?: string | null
      rawJson?: string | null
    } | null
    permissions: Array<{ __typename?: 'ZoraCreatorPermission'; user: Address }>
    salesStrategies: Array<{
      __typename?: 'SalesStrategyConfig'
      presale?: {
        __typename?: 'SalesConfigMerkleMinterStrategy'
        presaleStart: string
        presaleEnd: string
        merkleRoot: Address
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      fixedPrice?: {
        __typename?: 'SalesConfigFixedPriceSaleStrategy'
        maxTokensPerAddress: string
        saleStart: string
        saleEnd: string
        pricePerToken: string
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      redeemMinter?: {
        __typename?: 'SalesConfigRedeemMinterStrategy'
        configAddress: Address
        redeemsInstructionsHash: Address
        ethAmount: string
        ethRecipient: Address
        isActive: boolean
        saleEnd: string
        saleStart: string
        target: Address
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
        redeemMintToken: {
          __typename?: 'RedeemMintToken'
          tokenId: string
          tokenType: number
          tokenContract: Address
          amount: string
        }
        redeemInstructions: Array<{
          __typename?: 'RedeemInstructions'
          amount: string
          tokenType: number
          tokenIdStart: string
          tokenIdEnd: string
          burnFunction: Address
          tokenContract: Address
          transferRecipient: Address
        }>
      } | null
    }>
    royalties: Array<{
      __typename?: 'RoyaltyConfig'
      royaltyBPS: string
      royaltyRecipient: Address
      royaltyMintSchedule: string
    }>
  }>
  salesStrategies: Array<{
    __typename?: 'SalesStrategyConfig'
    presale?: {
      __typename?: 'SalesConfigMerkleMinterStrategy'
      presaleStart: string
      presaleEnd: string
      merkleRoot: Address
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    fixedPrice?: {
      __typename?: 'SalesConfigFixedPriceSaleStrategy'
      maxTokensPerAddress: string
      saleStart: string
      saleEnd: string
      pricePerToken: string
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    redeemMinter?: {
      __typename?: 'SalesConfigRedeemMinterStrategy'
      configAddress: Address
      redeemsInstructionsHash: Address
      ethAmount: string
      ethRecipient: Address
      isActive: boolean
      saleEnd: string
      saleStart: string
      target: Address
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
      redeemMintToken: {
        __typename?: 'RedeemMintToken'
        tokenId: string
        tokenType: number
        tokenContract: Address
        amount: string
      }
      redeemInstructions: Array<{
        __typename?: 'RedeemInstructions'
        amount: string
        tokenType: number
        tokenIdStart: string
        tokenIdEnd: string
        burnFunction: Address
        tokenContract: Address
        transferRecipient: Address
      }>
    } | null
  }>
  royalties?: {
    __typename?: 'RoyaltyConfig'
    royaltyBPS: string
    royaltyRecipient: Address
    royaltyMintSchedule: string
  } | null
  txn: { __typename?: 'TransactionInfo'; id: Address; block: string; timestamp: string }
}

export type MetadataFragment = {
  __typename?: 'MetadataInfo'
  name?: string | null
  description?: string | null
  image?: string | null
  animationUrl?: string | null
  rawJson?: string | null
}

export type RoyaltiesFragment = {
  __typename?: 'RoyaltyConfig'
  royaltyBPS: string
  royaltyRecipient: Address
  royaltyMintSchedule: string
}

export type SalesStrategyFragment = {
  __typename?: 'SalesStrategyConfig'
  presale?: {
    __typename?: 'SalesConfigMerkleMinterStrategy'
    presaleStart: string
    presaleEnd: string
    merkleRoot: Address
    configAddress: Address
    fundsRecipient?: Address | null
    txn: { __typename?: 'TransactionInfo'; timestamp: string }
  } | null
  fixedPrice?: {
    __typename?: 'SalesConfigFixedPriceSaleStrategy'
    maxTokensPerAddress: string
    saleStart: string
    saleEnd: string
    pricePerToken: string
    configAddress: Address
    fundsRecipient?: Address | null
    txn: { __typename?: 'TransactionInfo'; timestamp: string }
  } | null
  redeemMinter?: {
    __typename?: 'SalesConfigRedeemMinterStrategy'
    configAddress: Address
    redeemsInstructionsHash: Address
    ethAmount: string
    ethRecipient: Address
    isActive: boolean
    saleEnd: string
    saleStart: string
    target: Address
    txn: { __typename?: 'TransactionInfo'; timestamp: string }
    redeemMintToken: {
      __typename?: 'RedeemMintToken'
      tokenId: string
      tokenType: number
      tokenContract: Address
      amount: string
    }
    redeemInstructions: Array<{
      __typename?: 'RedeemInstructions'
      amount: string
      tokenType: number
      tokenIdStart: string
      tokenIdEnd: string
      burnFunction: Address
      tokenContract: Address
      transferRecipient: Address
    }>
  } | null
}

export type TokenFragment = {
  __typename?: 'ZoraCreateToken'
  id: Address
  tokenId: string
  address: Address
  uri?: string | null
  maxSupply: string
  totalMinted: string
  rendererContract?: Address | null
  contract: {
    __typename?: 'ZoraCreateContract'
    id: Address
    owner: Address
    creator: Address
    contractVersion?: string | null
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      description?: string | null
      image?: string | null
      animationUrl?: string | null
      rawJson?: string | null
    } | null
  }
  metadata?: {
    __typename?: 'MetadataInfo'
    name?: string | null
    description?: string | null
    image?: string | null
    animationUrl?: string | null
    rawJson?: string | null
  } | null
  permissions: Array<{ __typename?: 'ZoraCreatorPermission'; user: Address }>
  salesStrategies: Array<{
    __typename?: 'SalesStrategyConfig'
    presale?: {
      __typename?: 'SalesConfigMerkleMinterStrategy'
      presaleStart: string
      presaleEnd: string
      merkleRoot: Address
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    fixedPrice?: {
      __typename?: 'SalesConfigFixedPriceSaleStrategy'
      maxTokensPerAddress: string
      saleStart: string
      saleEnd: string
      pricePerToken: string
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    redeemMinter?: {
      __typename?: 'SalesConfigRedeemMinterStrategy'
      configAddress: Address
      redeemsInstructionsHash: Address
      ethAmount: string
      ethRecipient: Address
      isActive: boolean
      saleEnd: string
      saleStart: string
      target: Address
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
      redeemMintToken: {
        __typename?: 'RedeemMintToken'
        tokenId: string
        tokenType: number
        tokenContract: Address
        amount: string
      }
      redeemInstructions: Array<{
        __typename?: 'RedeemInstructions'
        amount: string
        tokenType: number
        tokenIdStart: string
        tokenIdEnd: string
        burnFunction: Address
        tokenContract: Address
        transferRecipient: Address
      }>
    } | null
  }>
  royalties: Array<{
    __typename?: 'RoyaltyConfig'
    royaltyBPS: string
    royaltyRecipient: Address
    royaltyMintSchedule: string
  }>
}

export type TxnInfoFragment = {
  __typename?: 'TransactionInfo'
  id: Address
  block: string
  timestamp: string
}

export type ZoraCreate1155FactoryFragment = {
  __typename?: 'ZoraCreate1155Factory'
  fixedPriceSaleStrategyAddress: Address
  id: Address
  implementation: Address
  merkleSaleStrategyAddress: Address
  redeemMinterStrategyAddress?: Address | null
}

export type ZoraCreateTokenFragment = {
  __typename?: 'ZoraCreateToken'
  address: Address
  tokenId: string
  totalSupply: string
  maxSupply: string
  totalMinted: string
  uri?: string | null
  rendererContract?: Address | null
  contract: { __typename?: 'ZoraCreateContract'; contractVersion?: string | null }
  metadata?: {
    __typename?: 'MetadataInfo'
    name?: string | null
    description?: string | null
    image?: string | null
    animationUrl?: string | null
  } | null
  salesStrategies: Array<{
    __typename?: 'SalesStrategyConfig'
    presale?: {
      __typename?: 'SalesConfigMerkleMinterStrategy'
      presaleStart: string
      presaleEnd: string
      merkleRoot: Address
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    fixedPrice?: {
      __typename?: 'SalesConfigFixedPriceSaleStrategy'
      maxTokensPerAddress: string
      saleStart: string
      saleEnd: string
      pricePerToken: string
      configAddress: Address
      fundsRecipient?: Address | null
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
    } | null
    redeemMinter?: {
      __typename?: 'SalesConfigRedeemMinterStrategy'
      configAddress: Address
      redeemsInstructionsHash: Address
      ethAmount: string
      ethRecipient: Address
      isActive: boolean
      saleEnd: string
      saleStart: string
      target: Address
      txn: { __typename?: 'TransactionInfo'; timestamp: string }
      redeemMintToken: {
        __typename?: 'RedeemMintToken'
        tokenId: string
        tokenType: number
        tokenContract: Address
        amount: string
      }
      redeemInstructions: Array<{
        __typename?: 'RedeemInstructions'
        amount: string
        tokenType: number
        tokenIdStart: string
        tokenIdEnd: string
        burnFunction: Address
        tokenContract: Address
        transferRecipient: Address
      }>
    } | null
  }>
  royalties: Array<{
    __typename?: 'RoyaltyConfig'
    id: Address
    user: Address
    royaltyBPS: string
    royaltyRecipient: Address
    royaltyMintSchedule: string
  }>
}

export type ZoraCreateActive1155TokensQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>
  now?: InputMaybe<Scalars['BigInt']>
  limit?: InputMaybe<Scalars['Int']>
}>

export type ZoraCreateActive1155TokensQuery = {
  __typename?: 'Query'
  zoraCreateTokens: Array<{
    __typename?: 'ZoraCreateToken'
    totalMinted: string
    maxSupply: string
    totalSupply: string
    tokenId: string
    contract: {
      __typename?: 'ZoraCreateContract'
      id: Address
      contractVersion?: string | null
    }
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      image?: string | null
    } | null
    salesStrategies: Array<{
      __typename?: 'SalesStrategyConfig'
      type: string
      fixedPrice?: {
        __typename?: 'SalesConfigFixedPriceSaleStrategy'
        configAddress: Address
        saleStart: string
        saleEnd: string
        pricePerToken: string
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
    }>
  }>
}

export type ZoraCreateContractQueryVariables = Exact<{
  address: Scalars['ID']
}>

export type ZoraCreateContractQuery = {
  __typename?: 'Query'
  zoraCreateContract?: {
    __typename?: 'ZoraCreateContract'
    address: Address
    mintFeePerQuantity: string
    owner: Address
    creator: Address
    symbol?: string | null
    contractVersion?: string | null
    contractStandard: string
    rendererContract?: Address | null
    contractURI?: string | null
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      description?: string | null
      animationUrl?: string | null
      image?: string | null
    } | null
    salesStrategies: Array<{
      __typename?: 'SalesStrategyConfig'
      presale?: {
        __typename?: 'SalesConfigMerkleMinterStrategy'
        presaleStart: string
        presaleEnd: string
        merkleRoot: Address
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      fixedPrice?: {
        __typename?: 'SalesConfigFixedPriceSaleStrategy'
        maxTokensPerAddress: string
        saleStart: string
        saleEnd: string
        pricePerToken: string
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      redeemMinter?: {
        __typename?: 'SalesConfigRedeemMinterStrategy'
        configAddress: Address
        redeemsInstructionsHash: Address
        ethAmount: string
        ethRecipient: Address
        isActive: boolean
        saleEnd: string
        saleStart: string
        target: Address
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
        redeemMintToken: {
          __typename?: 'RedeemMintToken'
          tokenId: string
          tokenType: number
          tokenContract: Address
          amount: string
        }
        redeemInstructions: Array<{
          __typename?: 'RedeemInstructions'
          amount: string
          tokenType: number
          tokenIdStart: string
          tokenIdEnd: string
          burnFunction: Address
          tokenContract: Address
          transferRecipient: Address
        }>
      } | null
    }>
    royalties?: {
      __typename?: 'RoyaltyConfig'
      id: Address
      user: Address
      royaltyBPS: string
      royaltyRecipient: Address
      royaltyMintSchedule: string
    } | null
    tokens: Array<{
      __typename?: 'ZoraCreateToken'
      address: Address
      tokenId: string
      totalSupply: string
      maxSupply: string
      totalMinted: string
      uri?: string | null
      rendererContract?: Address | null
      contract: { __typename?: 'ZoraCreateContract'; contractVersion?: string | null }
      metadata?: {
        __typename?: 'MetadataInfo'
        name?: string | null
        description?: string | null
        image?: string | null
        animationUrl?: string | null
      } | null
      salesStrategies: Array<{
        __typename?: 'SalesStrategyConfig'
        presale?: {
          __typename?: 'SalesConfigMerkleMinterStrategy'
          presaleStart: string
          presaleEnd: string
          merkleRoot: Address
          configAddress: Address
          fundsRecipient?: Address | null
          txn: { __typename?: 'TransactionInfo'; timestamp: string }
        } | null
        fixedPrice?: {
          __typename?: 'SalesConfigFixedPriceSaleStrategy'
          maxTokensPerAddress: string
          saleStart: string
          saleEnd: string
          pricePerToken: string
          configAddress: Address
          fundsRecipient?: Address | null
          txn: { __typename?: 'TransactionInfo'; timestamp: string }
        } | null
        redeemMinter?: {
          __typename?: 'SalesConfigRedeemMinterStrategy'
          configAddress: Address
          redeemsInstructionsHash: Address
          ethAmount: string
          ethRecipient: Address
          isActive: boolean
          saleEnd: string
          saleStart: string
          target: Address
          txn: { __typename?: 'TransactionInfo'; timestamp: string }
          redeemMintToken: {
            __typename?: 'RedeemMintToken'
            tokenId: string
            tokenType: number
            tokenContract: Address
            amount: string
          }
          redeemInstructions: Array<{
            __typename?: 'RedeemInstructions'
            amount: string
            tokenType: number
            tokenIdStart: string
            tokenIdEnd: string
            burnFunction: Address
            tokenContract: Address
            transferRecipient: Address
          }>
        } | null
      }>
      royalties: Array<{
        __typename?: 'RoyaltyConfig'
        id: Address
        user: Address
        royaltyBPS: string
        royaltyRecipient: Address
        royaltyMintSchedule: string
      }>
    }>
  } | null
}

export type ZoraCreateTokenQueryVariables = Exact<{
  collectionAddress: Scalars['String']
  tokenId: Scalars['BigInt']
}>

export type ZoraCreateTokenQuery = {
  __typename?: 'Query'
  zoraCreateTokens: Array<{
    __typename?: 'ZoraCreateToken'
    address: Address
    tokenId: string
    totalSupply: string
    maxSupply: string
    totalMinted: string
    uri?: string | null
    rendererContract?: Address | null
    contract: { __typename?: 'ZoraCreateContract'; contractVersion?: string | null }
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      description?: string | null
      image?: string | null
      animationUrl?: string | null
    } | null
    salesStrategies: Array<{
      __typename?: 'SalesStrategyConfig'
      presale?: {
        __typename?: 'SalesConfigMerkleMinterStrategy'
        presaleStart: string
        presaleEnd: string
        merkleRoot: Address
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      fixedPrice?: {
        __typename?: 'SalesConfigFixedPriceSaleStrategy'
        maxTokensPerAddress: string
        saleStart: string
        saleEnd: string
        pricePerToken: string
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      redeemMinter?: {
        __typename?: 'SalesConfigRedeemMinterStrategy'
        configAddress: Address
        redeemsInstructionsHash: Address
        ethAmount: string
        ethRecipient: Address
        isActive: boolean
        saleEnd: string
        saleStart: string
        target: Address
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
        redeemMintToken: {
          __typename?: 'RedeemMintToken'
          tokenId: string
          tokenType: number
          tokenContract: Address
          amount: string
        }
        redeemInstructions: Array<{
          __typename?: 'RedeemInstructions'
          amount: string
          tokenType: number
          tokenIdStart: string
          tokenIdEnd: string
          burnFunction: Address
          tokenContract: Address
          transferRecipient: Address
        }>
      } | null
    }>
    royalties: Array<{
      __typename?: 'RoyaltyConfig'
      id: Address
      user: Address
      royaltyBPS: string
      royaltyRecipient: Address
      royaltyMintSchedule: string
    }>
  }>
}

export type ZoraCreateTokensQueryVariables = Exact<{
  collectionAddress: Scalars['String']
  perPage: Scalars['Int']
  offset: Scalars['Int']
  orderBy: ZoraCreateToken_OrderBy
  orderDirection: OrderDirection
}>

export type ZoraCreateTokensQuery = {
  __typename?: 'Query'
  zoraCreateTokens: Array<{
    __typename?: 'ZoraCreateToken'
    address: Address
    tokenId: string
    totalSupply: string
    maxSupply: string
    totalMinted: string
    uri?: string | null
    rendererContract?: Address | null
    contract: { __typename?: 'ZoraCreateContract'; contractVersion?: string | null }
    metadata?: {
      __typename?: 'MetadataInfo'
      name?: string | null
      description?: string | null
      image?: string | null
      animationUrl?: string | null
    } | null
    salesStrategies: Array<{
      __typename?: 'SalesStrategyConfig'
      presale?: {
        __typename?: 'SalesConfigMerkleMinterStrategy'
        presaleStart: string
        presaleEnd: string
        merkleRoot: Address
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      fixedPrice?: {
        __typename?: 'SalesConfigFixedPriceSaleStrategy'
        maxTokensPerAddress: string
        saleStart: string
        saleEnd: string
        pricePerToken: string
        configAddress: Address
        fundsRecipient?: Address | null
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
      } | null
      redeemMinter?: {
        __typename?: 'SalesConfigRedeemMinterStrategy'
        configAddress: Address
        redeemsInstructionsHash: Address
        ethAmount: string
        ethRecipient: Address
        isActive: boolean
        saleEnd: string
        saleStart: string
        target: Address
        txn: { __typename?: 'TransactionInfo'; timestamp: string }
        redeemMintToken: {
          __typename?: 'RedeemMintToken'
          tokenId: string
          tokenType: number
          tokenContract: Address
          amount: string
        }
        redeemInstructions: Array<{
          __typename?: 'RedeemInstructions'
          amount: string
          tokenType: number
          tokenIdStart: string
          tokenIdEnd: string
          burnFunction: Address
          tokenContract: Address
          transferRecipient: Address
        }>
      } | null
    }>
    royalties: Array<{
      __typename?: 'RoyaltyConfig'
      id: Address
      user: Address
      royaltyBPS: string
      royaltyRecipient: Address
      royaltyMintSchedule: string
    }>
  }>
}

export const MetadataFragmentDoc = gql`
  fragment Metadata on MetadataInfo {
    name
    description
    image
    animationUrl
    rawJson
  }
`
export const SalesStrategyFragmentDoc = gql`
  fragment SalesStrategy on SalesStrategyConfig {
    presale {
      presaleStart
      presaleEnd
      merkleRoot
      configAddress
      fundsRecipient
      txn {
        timestamp
      }
    }
    fixedPrice {
      maxTokensPerAddress
      saleStart
      saleEnd
      pricePerToken
      configAddress
      fundsRecipient
      txn {
        timestamp
      }
    }
    redeemMinter {
      configAddress
      redeemsInstructionsHash
      ethAmount
      ethRecipient
      isActive
      saleEnd
      saleStart
      target
      txn {
        timestamp
      }
      redeemMintToken {
        tokenId
        tokenType
        tokenContract
        amount
      }
      redeemInstructions {
        amount
        tokenType
        tokenIdStart
        tokenIdEnd
        burnFunction
        tokenContract
        transferRecipient
      }
    }
  }
`
export const RoyaltiesFragmentDoc = gql`
  fragment Royalties on RoyaltyConfig {
    royaltyBPS
    royaltyRecipient
    royaltyMintSchedule
  }
`
export const TokenFragmentDoc = gql`
  fragment Token on ZoraCreateToken {
    id
    tokenId
    address
    uri
    maxSupply
    totalMinted
    rendererContract
    contract {
      id
      owner
      creator
      contractVersion
      metadata {
        ...Metadata
      }
    }
    metadata {
      ...Metadata
    }
    permissions {
      user
    }
    salesStrategies {
      ...SalesStrategy
    }
    royalties {
      ...Royalties
    }
  }
  ${MetadataFragmentDoc}
  ${SalesStrategyFragmentDoc}
  ${RoyaltiesFragmentDoc}
`
export const TxnInfoFragmentDoc = gql`
  fragment TxnInfo on TransactionInfo {
    id
    block
    timestamp
  }
`
export const CollectionFragmentDoc = gql`
  fragment Collection on ZoraCreateContract {
    id
    address
    name
    symbol
    owner
    creator
    contractURI
    contractStandard
    contractVersion
    mintFeePerQuantity
    timestamp
    metadata {
      ...Metadata
    }
    tokens {
      ...Token
    }
    salesStrategies {
      ...SalesStrategy
    }
    royalties {
      ...Royalties
    }
    txn {
      ...TxnInfo
    }
  }
  ${MetadataFragmentDoc}
  ${TokenFragmentDoc}
  ${SalesStrategyFragmentDoc}
  ${RoyaltiesFragmentDoc}
  ${TxnInfoFragmentDoc}
`
export const ZoraCreate1155FactoryFragmentDoc = gql`
  fragment ZoraCreate1155Factory on ZoraCreate1155Factory {
    fixedPriceSaleStrategyAddress
    id
    implementation
    merkleSaleStrategyAddress
    redeemMinterStrategyAddress
  }
`
export const ZoraCreateTokenFragmentDoc = gql`
  fragment ZoraCreateToken on ZoraCreateToken {
    address
    tokenId
    totalSupply
    maxSupply
    totalMinted
    uri
    rendererContract
    contract {
      contractVersion
    }
    metadata {
      name
      description
      image
      animationUrl
    }
    salesStrategies {
      ...SalesStrategy
    }
    royalties {
      id
      user
      royaltyBPS
      royaltyRecipient
      royaltyMintSchedule
    }
  }
  ${SalesStrategyFragmentDoc}
`
export const ZoraCreateActive1155TokensDocument = gql`
  query zoraCreateActive1155Tokens($address: String, $now: BigInt, $limit: Int) {
    zoraCreateTokens(
      where: {
        contract: $address
        tokenId_gt: 0
        salesStrategies_: { type: "FIXED_PRICE" }
      }
      orderBy: createdAtBlock
      orderDirection: asc
      first: $limit
    ) {
      contract {
        id
        contractVersion
      }
      totalMinted
      maxSupply
      totalSupply
      tokenId
      metadata {
        name
        image
      }
      salesStrategies(where: { fixedPrice_: { saleStart_lt: $now, saleEnd_gt: $now } }) {
        type
        fixedPrice {
          configAddress
          saleStart
          saleEnd
          pricePerToken
          txn {
            timestamp
          }
        }
      }
    }
  }
`
export const ZoraCreateContractDocument = gql`
  query zoraCreateContract($address: ID!) {
    zoraCreateContract(id: $address) {
      address
      mintFeePerQuantity
      owner
      creator
      symbol
      contractVersion
      contractStandard
      rendererContract
      contractURI
      metadata {
        name
        description
        animationUrl
        image
      }
      salesStrategies {
        ...SalesStrategy
      }
      royalties {
        id
        user
        royaltyBPS
        royaltyRecipient
        royaltyMintSchedule
      }
      tokens(where: { tokenId: 0 }) {
        ...ZoraCreateToken
      }
    }
  }
  ${SalesStrategyFragmentDoc}
  ${ZoraCreateTokenFragmentDoc}
`
export const ZoraCreateTokenDocument = gql`
  query zoraCreateToken($collectionAddress: String!, $tokenId: BigInt!) {
    zoraCreateTokens(where: { contract: $collectionAddress, tokenId: $tokenId }) {
      ...ZoraCreateToken
    }
  }
  ${ZoraCreateTokenFragmentDoc}
`
export const ZoraCreateTokensDocument = gql`
  query zoraCreateTokens(
    $collectionAddress: String!
    $perPage: Int!
    $offset: Int!
    $orderBy: ZoraCreateToken_orderBy!
    $orderDirection: OrderDirection!
  ) {
    zoraCreateTokens(
      where: { contract: $collectionAddress, tokenId_gt: 0 }
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $perPage
      skip: $offset
    ) {
      ...ZoraCreateToken
    }
  }
  ${ZoraCreateTokenFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) =>
  action()

export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper
) {
  return {
    zoraCreateActive1155Tokens(
      variables?: ZoraCreateActive1155TokensQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ZoraCreateActive1155TokensQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ZoraCreateActive1155TokensQuery>(
            ZoraCreateActive1155TokensDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        'zoraCreateActive1155Tokens',
        'query'
      )
    },
    zoraCreateContract(
      variables: ZoraCreateContractQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ZoraCreateContractQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ZoraCreateContractQuery>(ZoraCreateContractDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'zoraCreateContract',
        'query'
      )
    },
    zoraCreateToken(
      variables: ZoraCreateTokenQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ZoraCreateTokenQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ZoraCreateTokenQuery>(ZoraCreateTokenDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'zoraCreateToken',
        'query'
      )
    },
    zoraCreateTokens(
      variables: ZoraCreateTokensQueryVariables,
      requestHeaders?: Dom.RequestInit['headers']
    ): Promise<ZoraCreateTokensQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ZoraCreateTokensQuery>(ZoraCreateTokensDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'zoraCreateTokens',
        'query'
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
