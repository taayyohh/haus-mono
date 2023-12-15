'use client'

import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { IArtist } from '@/models/Artist'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import { IAlbum } from '@/models/Album'
import AlbumCard from '@/modules/albums/components/AlbumCard'
import { Tabs, Tab } from '@/components/Tabs'
import { IBlogPost } from '@/models/Blog'
import BlogCard from '@/modules/blog/components/BlogCard'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'

const ArtistPage = ({
  artist,
  albums,
  blog,
}: {
  artist: IArtist
  albums: IAlbum[]
  blog: {
    post: IBlogPost
    tokens: ZoraCreateTokenQuery['zoraCreateTokens']
    collection: ZoraCreateContractQuery['zoraCreateContract']
  }
}) => {
  const { tokens, collection, post } = blog

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
          <div className="mx-auto mt-[0vh] h-full w-full rounded bg-[#131313] text-white sm:mt-[45vh] sm:min-h-[100vh] sm:w-11/12">
            <div className={'mx-auto w-full'}>
              <div
                className={'py-12 text-center text-4xl sm:text-6xl font-bold uppercase'}
              >
                {artist.name}
              </div>
              <div className={'mx-auto mb-20 w-11/12'}>
                <Tabs defaultTab={!!tokens.length ? 'Blog' : 'Bio'}>
                  <Tab label="Bio">
                    <div className={'relative w-full sm:sm-3/4 mx-auto'}>
                      <ReactMarkdown
                        rehypePlugins={[rehypeRaw, rehypeSanitize]}
                        remarkPlugins={[remarkGfm]}
                      >
                        {artist.bio}
                      </ReactMarkdown>
                    </div>
                  </Tab>
                  {!!tokens.length ? (
                    <Tab label="Blog">
                      <div className={'grid grid-cols-1 sm:grid-cols-2 gap-4'}>
                        {tokens.map((token) => (
                          <BlogCard
                            key={token.tokenId}
                            post={post}
                            token={token}
                            collection={collection}
                          />
                        ))}
                      </div>
                    </Tab>
                  ) : (
                    <></>
                  )}
                </Tabs>
              </div>

              <div className={'flex flex-col'}>
                <div className={'px-2 sm:px-8 uppercase text-lg py-4'}>Discography</div>
                <div
                  className={'grid grid-cols-1 sm:grid-cols-4 border-t border-white-13'}
                >
                  {albums &&
                    albums.map((album) => (
                      <div key={album._id}>
                        <AlbumCard
                          album={{ ...album, artist } as IAlbum & { artist: IArtist }}
                          link={`/discography/${album.slug}`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default ArtistPage
