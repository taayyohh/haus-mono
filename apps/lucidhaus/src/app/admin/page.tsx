import React from 'react'
import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <h2 className="text-right mb-8 border-b border-white-13 pb-2">Manage</h2>
      <div className={'flex flex-col'}>
        <ul>
          <li>
            <Link href={'/admin/albums'}>Albums</Link>
          </li>
          <li>
            <Link href={'/admin/albums/genre'}>Genre</Link>
          </li>
          <li>
            <Link href={'/admin/videos'}>Videos</Link>
          </li>
          <li>
            <Link href={'/admin/artists'}>Artists</Link>
          </li>
          <li>
            <Link href={'/admin/products'}>Products</Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
