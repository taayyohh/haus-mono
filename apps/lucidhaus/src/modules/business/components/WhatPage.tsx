'use client'

import Haus from '../../../../public/icons/haus-alt-2.svg'
import { AnimatePresence, motion } from 'framer-motion'
import Zorb from '../../../../public/icons/zorb.svg'
import { usePrivy } from '@privy-io/react-auth'
import Link from 'next/link'

const WhatPage = () => {
  const { login, user } = usePrivy()

  return (
    <AnimatePresence>
      <motion.div
        key={'about-page'}
        variants={{
          closed: {
            y: 0,
            opacity: 0,
          },
          open: {
            y: 0,
            opacity: 1,
          },
        }}
        initial="closed"
        animate="open"
        exit="closed"
      >
        <div className={'mt-12 grid grid-cols-1 w-full gap-4'}>
          <div className={'flex flex-col px-4 sm:px-8 items-center gap-8'}>
            <div className={'flex flex-col px-4 sm:px-8 items-center gap-4'}>
              <div className={'flex gap-4 sm:gap-8 items-center'}>
                <div className={'flex relative w-12 h-12'}>
                  <Haus />
                </div>
                <div
                  className={
                    'text-2xl sm:text-6xl w-full sm:w-[800px] font-bold uppercase text-white'
                  }
                >
                  Decentralized Media
                </div>
              </div>
              <div
                className={
                  'border border-white-13 p-4 sm:p-8 w-full max-w-3xl text-white'
                }
              >
                The audio and image files that power lucid.haus are stored on{' '}
                <a
                  href="https://ipfs.tech/"
                  target="_blank"
                  className={'underline hover:opacity-70'}
                >
                  IPFS
                </a>{' '}
                (InterPlanetary File System), which means no central entity controls the
                availability of the data. Yay!
              </div>
            </div>
            <div className={'flex flex-col px-4 sm:px-8 items-center gap-4'}>
              <div className={'flex gap-4 sm:gap-8 items-center'}>
                <div className={'flex relative w-12 h-12'}>
                  <Haus />
                </div>
                <div
                  className={
                    'text-2xl sm:text-6xl w-full sm:w-[800px] font-bold uppercase text-white'
                  }
                >
                  Artist Owned Distribution and Control
                </div>
              </div>
              <div
                className={
                  'border border-white-13 p-4 sm:p-8 w-full max-w-3xl text-white'
                }
              >
                Every song and video is an{' '}
                <a
                  href={
                    'https://ethereum.org/en/developers/docs/standards/tokens/erc-1155/'
                  }
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  ERC-1155 Multi-Token
                </a>{' '}
                Smart Contract, deployed on{' '}
                <a
                  href={'https://docs.zora.co/docs/zora-network/intro'}
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  Zora Network
                </a>
                . We used{' '}
                <a
                  href="https://docs.zora.co/docs/smart-contracts/creator-tools/Deploy1155Contract"
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  Zora&#39;s implementation
                </a>{' '}
                of an ERC-1155, which can be created for free at{' '}
                <a
                  href="https://zora.c/create"
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  zora.co
                </a>
                .
                <br />
                <br />
                Each artist&#39;s wallet owns the Smart Contract for their songs and
                videos. They control the distribution, they control if, and when, and at
                what price, and how much, to sell their art for; and their wallet directly
                receives payment for tokens sold in the form of{' '}
                <a
                  href="https://ethereum.org/en/eth/"
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  Ether (ETH)
                </a>
                , digital, global money.
              </div>
            </div>

            <div className={'flex flex-col px-4 sm:px-8 items-center gap-4'}>
              <div className={'flex gap-4 sm:gap-8 items-center'}>
                <div className={'flex relative w-12 h-12'}>
                  <Haus />
                </div>
                <div
                  className={
                    'text-2xl sm:text-6xl w-full sm:w-[800px] font-bold uppercase text-white'
                  }
                >
                  Online {'=>'} Onchain
                </div>
              </div>
              <div
                className={
                  'border border-white-13 p-4 sm:p-8 w-full max-w-3xl text-white'
                }
              >
                We believe in the power of blockchains, specifically Ethereum and its
                ecosystem, as a promising solution to adequately and equitably value music
                and pay artists!
                <br />
                <br />
                To own our artists art forever, you can collect their work by minting it!
                just look for this button.
                <br />
                <br />
                <div
                  className={
                    'inline-flex px-4 gap-3 py-1 border border-white-13 rounded bg-[#1b1b1b] uppercase text-sm items-center'
                  }
                >
                  Mint
                  <div className={'flex self-start h-6 w-6'}>
                    <Zorb />
                  </div>
                </div>
                <br />
                <br />
                Each song is priced at 0 ETH with a{' '}
                <a
                  href={
                    'https://support.zora.co/en/articles/4981037-zora-mint-collect-fees'
                  }
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  Zora Protocol Reward Fee
                </a>{' '}
                of .000777ETH ~$1.40. This reward is{' '}
                <a
                  href="https://support.zora.co/en/articles/8192123-understanding-protocol-rewards-on-zora"
                  target={'_blank'}
                  className={'underline hover:opacity-70'}
                >
                  equitably split between
                </a>{' '}
                the artists, the lucidhaus, and Zora.
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default WhatPage
