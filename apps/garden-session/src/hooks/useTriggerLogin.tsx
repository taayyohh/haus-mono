import { useMemo } from 'react'

import { useAccount } from 'wagmi'
import { usePrivyWagmi } from '@privy-io/wagmi-connector/dist/index'
import { usePrivy } from '@privy-io/react-auth'

export const useTriggerLogin = (
  action: (() => void) | undefined
): (() => void) | undefined => {
  const { wallet } = usePrivyWagmi()
  const { login } = usePrivy()

  const { address } = useAccount()
  return useMemo(() => (!wallet?.address ? login : action), [wallet?.address, login, action])
}
