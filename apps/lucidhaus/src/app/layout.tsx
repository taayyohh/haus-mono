'use client'

import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import Image from 'next/image'
import config from '@/constants/config'
import { PrivyProvider } from '@privy-io/react-auth'
import { handlePrivySuccess } from '@/modules/auth/utils/handlePrivySuccess'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'
import { configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { zora, mainnet } from 'viem/chains'
import Navigation from '@/components/navigation/Navigation'
import { Player } from '@/modules/player'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'
import { infuraProvider } from 'wagmi/providers/infura'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const configureChainsConfig = configureChains(
    [zora, mainnet],
    [infuraProvider({ apiKey: config.infura as string }), publicProvider()],
    { stallTimeout: 5000 }
  )

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={'relative mx-auto w-full'}>
          <PrivyProvider
            appId={config.privyAppId as string}
            onSuccess={handlePrivySuccess}
            config={{
              appearance: { theme: 'dark' },
              supportedChains: [zora, mainnet],
            }}
          >
            <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>
              <>
                <div
                  className={
                    'flex items-center justify-between h-20 px-4 sm:px-8 mx-auto z-20'
                  }
                >
                  <div
                    className={
                      'flex items-center justify-between fixed left-0 w-full h-20 px-4 sm:px-8 z-10'
                    }
                  >
                    <Link href={'/'}>
                      <Image
                        src={'/header-logo.png'}
                        alt={'Logo'}
                        width="100"
                        height="80"
                        priority
                      />
                    </Link>

                    <Navigation />
                  </div>
                </div>
                <div>{children}</div>
                <div
                  className={
                    'flex justify-between py-6 px-4 sm:px-8 mx-auto text-xs uppercase mt-24'
                  }
                >
                  <Player />
                  <Toaster
                    toastOptions={{
                      unstyled: true,
                      classNames: {
                        toast: 'bg-[#1b1b1b]',
                        title: 'text-white',
                      },
                    }}
                  />
                  <Footer />
                  <div>&copy; {new Date().getFullYear()} LucidHaus</div>
                </div>
              </>
            </PrivyWagmiConnector>
          </PrivyProvider>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
