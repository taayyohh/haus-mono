'use client'

import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IArtist } from '@/models/Artist'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

const ArtistPage = ({ artist }: { artist: IArtist }) => {
  return (
    <AnimatePresence>
      <motion.div
        key={artist._id}
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
        <div className={'mx-auto w-full pt-32 sm:w-4/5'}>
          <div>
            {artist.heroImage && (
              <div
                className={'fixed left-0 top-0 -z-10 h-[100vh] w-full overflow-hidden'}
              >
                <Image
                  src={getIpfsGateway(artist.heroImage)}
                  className={'-mt-12 sm:mt-0 h-full w-full object-cover'}
                  alt={'artist cover image'}
                  priority
                  fill
                />
              </div>
            )}
          </div>
        </div>

        <div>
          {/*{discography?.length > 0 ? (*/}
          <div className="mx-auto mt-[0vh] h-full w-full rounded border-t bg-white sm:mt-[45vh] sm:min-h-[100vh] sm:w-11/12">
            <div className={'mx-auto w-full'}>
              <div
                className={'py-12 text-center text-4xl sm:text-6xl font-bold uppercase text-black'}
              >
                {artist.name}
              </div>
              <div className={'mx-auto mb-20 w-11/12 sm:w-3/4 md:w-3/4 lg:w-1/2'}>
                <div className={'text-black gap-3 pb-12'}>
                  <ReactMarkdown
                    rehypePlugins={[rehypeRaw, rehypeSanitize]}
                    remarkPlugins={[remarkGfm]}
                  >
                  {artist.bio}
                  </ReactMarkdown>
                </div>
              </div>
              {/*<div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-3 lg:grid-cols-4">*/}
              {/*  {discography?.map((release: any, i: any) => (*/}
              {/*    <SongCard key={i} release={release} />*/}
              {/*  ))}*/}
              {/*</div>*/}
            </div>
          </div>
          {/*) : null}*/}
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ArtistPage
