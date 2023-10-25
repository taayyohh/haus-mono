'use client'

import Haus from '../../../../public/icons/haus-alt-2.svg'
import { AnimatePresence, motion } from 'framer-motion'

const AboutPage = () => {
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
        <div
          className={
            'border-t border-b border-solid px-4 sm:px-8 py-4 mb-4 uppercase text-3xl'
          }
        >
          LucidHaus Records
        </div>
        <div className={'grid grid-cols-1 sm:grid-cols-2 w-full gap-4'}>
          <div className={'flex flex-col px-4 sm:px-8 items-center'}>
            <div className={'text-6xl max-w-xl font-bold uppercase'}>
              LucidHaus is the home of timeless, post-genre Black music.
            </div>
            <div className={'flex relative w-48 h-48 my-12'}>
              <Haus />
            </div>
          </div>
          <div className={'px-4 sm:px-7 flex flex-col gap-2'}>
            <div>
              Founded in 2017, by Nappy Nina, Théo Mode and Ryann Holmes, LucidHaus is an
              artist owned and operated record label based in Brooklyn, New York.
            </div>
            <div>
              We operate onchain, on{' '}
              <a
                href={'https://ethereum.org/en/'}
                className={'hover:opacity-70'}
                target={'_blank'}
              >
                Ethereum
              </a>
              , wielding{' '}
              <a
                href={'https://zora.energy/'}
                className={'hover:opacity-70'}
                target={'_blank'}
              >
                Zora
              </a>{' '}
              at lucidhaus.eth.
            </div>
            <div className={'mt-5 gap-2 uppercase text-sm'}>
              <div className={'pb-2 text-xs'}>Socials</div>
              <div className={'flex gap-4'}>
                <a
                  href={'https://twitter.com/lucidhaus'}
                  className={'hover:opacity-70'}
                  target={'_blank'}
                >
                  Twitter
                </a>
                <a
                  href={'https://instagram.com/lucidhaus'}
                  className={'hover:opacity-70'}
                  target={'_blank'}
                >
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AboutPage
