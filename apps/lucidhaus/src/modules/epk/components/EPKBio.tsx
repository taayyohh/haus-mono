'use client'

import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface EPKBioProps {
  bio: string
}

export default function EPKBio({ bio }: EPKBioProps) {
  return (
    <div className="w-full sm:w-3/4 mx-auto prose prose-invert prose-xl">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        className="text-white text-lg sm:text-xl leading-relaxed"
      >
        {bio}
      </ReactMarkdown>
    </div>
  )
}
