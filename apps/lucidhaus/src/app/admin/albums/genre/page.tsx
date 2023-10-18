import React from 'react'
import Link from 'next/link'
import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import { fetchGenres } from '@/modules/albums/utils/fetchGenres'

export default async function Page() {
  const { data: genres } = await fetchGenres(1, 10)

  return (
    <div>
      <h2 className="text-right mb-8 border-b pb-2">Manage | Genre</h2>
      <div className={'flex flex-col'}>
        <Link href={'/admin/albums/genre/create'}>Create</Link>

        <div className={'font-bold mt-4'}>Genres:</div>
        {genres &&
          genres.map((genre) => (
            <div key={genre._id}>
              <Link href={`/admin/albums/genre/${genre.slug}/edit`}>{genre.name}</Link>
            </div>
          ))}
      </div>
    </div>
  )
}
