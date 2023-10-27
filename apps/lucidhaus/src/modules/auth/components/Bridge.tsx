import {
  useAccount,
  useBalance,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Address, parseAbi, parseEther } from 'viem'
import { useState, useCallback, useEffect, useMemo } from 'react'
import { ZORA_CHAIN_ID } from '@/constants'
import Zorb from '../../../../public/icons/zorb.svg'
import ETH from '../../../../public/icons/eth.svg'

const L2_BRIDGING_GAS_LIMIT = BigInt(100000)
// @ts-ignore
const ZORA_BRIDGE = '0x1a0ad011913A150f69f6A19DF447A0CfD9551054'
// @ts-ignore
export const optimismPortalAbi = parseAbi([
  'function depositTransaction(address _to, uint256 _value, uint64 _gasLimit, bool _isCreation, bytes memory _data) external payable' as const,
])

export default function Bridge() {
  const { address } = useAccount()
  const { data: ethBalance } = useBalance({ address, chainId: 1 })
  const { data: zoraBalance } = useBalance({ address, chainId: ZORA_CHAIN_ID })
  const [value, setValue] = useState('0')
  const {
    config,
    error: prepareError,
    refetch,
  } = usePrepareContractWrite({
    chainId: 1,
    abi: optimismPortalAbi,
    address: ZORA_BRIDGE,
    functionName: 'depositTransaction',
    args: [address!, parseEther(value || '0'), L2_BRIDGING_GAS_LIMIT, false, '0x'],
    value: parseEther(value),
    enabled: parseEther(value) !== BigInt(0),
  })

  const {
    data: writeData,
    write,
    isLoading,
    isIdle,
    error: sendError,
  } = useContractWrite({
    ...config,
  })

  const { data: receipt, isLoading: transactionProcessing } = useWaitForTransaction({
    hash: writeData?.hash,
    chainId: 1,
  })

  const handleBridge = useCallback(async () => {
    write?.()
  }, [write])

  const isDisabled = useMemo(() => {
    return Number(value) <= 0 || !!prepareError || isLoading
  }, [value, prepareError, isLoading])

  useEffect(() => {
    if (address && isIdle) refetch()
  }, [isIdle, address, refetch])

  return (
    <div className="p-8 pt-12 rounded-lg w-full sm:w-[500px]">
      <div>
        <div className={'flex items-center gap-3 w-full justify-center py-4 pb-8'}>
          <div className={'w-12 h-12'}>
            <ETH />
          </div>
          <div className={'text-4xl'}>{'=>'}</div>
          <div className={'w-8 h-8'}>
            <Zorb />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="value" className="block mb-2 text-white uppercase text-sm">
            Your Balance on Ethereum:
          </label>
          <div className={'flex gap-3 items-center text-3xl'}>
            <div className={'w-8 h-8'}>
              <ETH />
            </div>
            {Number(ethBalance?.formatted).toFixed(7)} ETH
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="value" className="block mb-2 text-white uppercase text-sm">
            Amount to Bridge
          </label>
          <input
            id="value"
            type="number"
            className="p-6 text-3xl border-white-13 border rounded-lg w-full text-black"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            step={0.005}
          />
        </div>
        <button
          type="submit"
          className={`p-2 bg-[#1b1b1b] ${
            !isDisabled && 'hover:bg-[#111]'
          }  w-full border border-white-13 text-white rounded-lg`}
          onClick={handleBridge}
          disabled={isDisabled}
          style={isDisabled ? { border: '1px solid #1b1b1b' } : undefined}
        >
          {receipt?.status === 'success' ? 'Bridged!' : 'Bridge'}
        </button>
        <div className="mb-4 border-t border-white-13 mt-12 pt-4">
          <label htmlFor="value" className="block mb-2 text-white uppercase text-sm">
            Your Balance on Zora:
          </label>
          <div className={'flex gap-3 items-center text-3xl'}>
            <div className={'w-8 h-8'}>
              <Zorb />
            </div>
            {Number(zoraBalance?.formatted).toFixed(7)} ETH
          </div>
        </div>
      </div>
    </div>
  )
}
