import { getAddress } from 'viem'

export function isAddress(value: any): string | false {
  try {
    return getAddress(value)
  } catch (e: any) {
    return false
  }
}

export const addressRegex = /^0x[a-fA-F0-9]{40}/

export function shortenAddress(address?: string, chars = 4, validate = true): string {
  if (!address) {
    return ''
  }

  if (!addressRegex.test(address)) {
    return address
  }

  let parsed: string | false = ''
  if (validate) {
    parsed = isAddress(address)
    if (!parsed) {
      //console.error(`Invalid 'address' parameter '${address}'.`)
      return ''
    }
  } else {
    parsed = address
  }
  return chars * 2 + 2 > parsed.length
    ? parsed
    : `${parsed.substring(0, chars + 2)}…${parsed.substring(42 - chars)}`
}
