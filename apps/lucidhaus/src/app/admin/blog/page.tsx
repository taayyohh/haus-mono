import React from 'react'
import Link from 'next/link'

export default async function Page() {
  return (
    <div>
      <h2 className="text-right mb-8 border-b border-white-13 pb-2">Manage | Blog</h2>
      <div className={'flex flex-col'}>
        <Link href={'/admin/blog/create'}>Create</Link>
        <Link href={'/admin/blog/edit'}>Edit</Link>
      </div>
    </div>
  )
}
