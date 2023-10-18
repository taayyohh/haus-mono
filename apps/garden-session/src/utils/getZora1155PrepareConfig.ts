import { Address, encodeAbiParameters, parseAbiParameters } from 'viem'
import { zoraCreate1155ABI } from '@/constants/abi/zoraCreate1155ABI'
import { UsePrepareContractWriteConfig } from 'wagmi'
import config from '@/constants/config'
import { ZORA_CHAIN_ID } from '@/constants'

export const getZora1155PrepareConfig = (
  saleStrategyAddress: Address,
  collectionAddress: Address,
  userAddress: Address,
  tokenId: number,
  mintFee: string,
  comment?: string
): UsePrepareContractWriteConfig<typeof zoraCreate1155ABI, 'mintWithRewards'> => {
  //@ts-ignore
  const encodedParams = !!comment //@ts-ignore
    ? encodeAbiParameters(parseAbiParameters('address, string'), [userAddress, comment]) //@ts-ignore
    : encodeAbiParameters(parseAbiParameters('address'), [userAddress])

  const args = [saleStrategyAddress, BigInt(tokenId), BigInt(1), encodedParams] as const

  return {
    abi: zoraCreate1155ABI,
    address: collectionAddress!,
    chainId: ZORA_CHAIN_ID,
    value: BigInt(mintFee),
    functionName: 'mintWithRewards',
    args: [...args, config.adminWallet as `0x${string}`],
  }
}
