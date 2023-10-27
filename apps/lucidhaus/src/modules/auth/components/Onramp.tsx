import {
  CryptoElements,
  OnrampElement,
} from '@/modules/store/components/StripeCryptoElements'
import React from 'react'
import { StripeOnramp } from '@stripe/crypto'
import { OnrampSessionResult } from '@stripe/crypto/types/api/onramp'
import ETH from '../../../../public/icons/eth.svg'
import Haus from '../../../../public/icons/haus-alt-2.svg'

export default function Onramp({
  onramp,
  stripePromise,
}: {
  onramp: OnrampSessionResult
  stripePromise: Promise<StripeOnramp | null>
}) {
  return (
    <div className={'flex flex-col items-center w-full'}>
      <div className={'flex items-center gap-3 w-full justify-center py-4 pb-8'}>
        <div className={'w-8 h-8'}>
          <Haus />
        </div>
        <div className={'text-4xl'}>{'=>'}</div>
        <div className={'w-12 h-12'}>
          <ETH />
        </div>
      </div>
      <div className={'flex flex-col items-center w-full'}>
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
      </div>
    </div>
  )
}
