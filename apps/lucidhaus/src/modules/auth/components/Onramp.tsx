import {
  CryptoElements,
  OnrampElement,
} from '@/modules/store/components/StripeCryptoElements'
import React from 'react'
import { StripeOnramp } from '@stripe/crypto'
import { OnrampSessionResult } from '@stripe/crypto/types/api/onramp'

export default function Onramp({
  onramp,
  stripePromise,
}: {
  onramp: OnrampSessionResult
  stripePromise: Promise<StripeOnramp | null>
}) {
  return (
    <CryptoElements stripeOnramp={stripePromise}>
      {onramp?.client_secret && (
        <OnrampElement
          clientSecret={onramp.client_secret}
          appearance={{ theme: 'dark' }}
          onChange={() => console.log('on change')}
          onReady={() => console.log('ready')}
        />
      )}
    </CryptoElements>
  )
}
