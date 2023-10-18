import React from 'react'
import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <h2 className="text-right mb-8 border-b pb-2">Manage | Albums</h2>
      <div className={'flex flex-col'}>
        <Link href={'/admin/albums/create'}>Create</Link>
      </div>
    </div>
  )
}
