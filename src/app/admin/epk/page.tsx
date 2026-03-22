'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface EPK {
  id: string
  title: string
  slug: string
  type: string
  isPublished: boolean
  artist: { name: string }
}

export default function AdminEPKPage() {
  const [epks, setEPKs] = useState<EPK[]>([])

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ epksByArtist(artistSlug: "") { id title slug type isPublished artist { name } } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setEPKs(data?.epksByArtist || []))
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase text-white">EPK Management</h1>
      </div>

      <div className="space-y-2">
        {epks.map((epk) => (
          <Link
            key={epk.id}
            href={`/admin/epk/${epk.id}`}
            className="flex items-center justify-between border border-white-13 p-4 hover:bg-white/5"
          >
            <div>
              <div className="text-white text-sm uppercase">{epk.title}</div>
              <div className="text-white/40 text-xs">{epk.artist.name} &middot; {epk.type}</div>
            </div>
            <span className={`text-xs uppercase ${epk.isPublished ? 'text-green-400' : 'text-white/30'}`}>
              {epk.isPublished ? 'Published' : 'Draft'}
            </span>
          </Link>
        ))}
        {epks.length === 0 && (
          <p className="text-white/40 text-sm py-8 text-center">
            No EPKs found. EPKs are managed per artist via the seed script or will be available through the admin form.
          </p>
        )}
      </div>
    </div>
  )
}
