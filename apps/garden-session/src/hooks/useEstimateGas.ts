import { UsePrepareContractWriteConfig, usePublicClient } from 'wagmi'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import useSWR from 'swr'
import { ZORA_CHAIN_ID } from '@/constants'

export const useEstimatedGas = (config?: UsePrepareContractWriteConfig) => {
  const { wallet } = usePrivyWagmi()
  const publicClient = usePublicClient({ chainId: ZORA_CHAIN_ID })

  // const { data: estimatedGas } = useSWR(
  //   async () => {
  //     if (!wallet?.address || !config) {
  //       return undefined
  //     }
  //
  //     if (!config.address || !config.abi || !config.functionName) {
  //       return undefined
  //     }
  //
  //     return await publicClient.estimateContractGas({
  //       address: config.address,
  //       abi: config.abi,
  //       functionName: config.functionName,
  //       account: wallet?.address,
  //       args: config.args,
  //       value: config.value,
  //     })
  //   },
  //   { refreshInterval: 10000 }
  // )
  //
  // if (!estimatedGas) return
  //
  // const pad = (gas: bigint) => (gas * BigInt(150)) / BigInt(100)
  //
  // return pad(estimatedGas)
}
