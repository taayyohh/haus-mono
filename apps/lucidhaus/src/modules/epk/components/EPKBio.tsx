'use client'

import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'

interface EPKBioProps {
  bio: string
}

export default function EPKBio({ bio }: EPKBioProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Split bio into paragraphs and get first paragraph as preview
  const paragraphs = bio.split('\n\n')
  const preview = paragraphs[0]
  const hasMore = paragraphs.length > 1

  return (
    <div className="w-full sm:w-3/4 mx-auto prose prose-invert prose-xl">
      <ReactMarkdown
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        remarkPlugins={[remarkGfm]}
        className="text-white text-lg sm:text-xl leading-relaxed"
      >
        {isExpanded ? bio : preview}
      </ReactMarkdown>

      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-white text-sm uppercase opacity-60 hover:opacity-100 transition-opacity underline"
        >
          {isExpanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}
