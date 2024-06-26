import { cookies } from 'next/headers'
import { LOGIN_COOKIE_NAME } from '@/constants'
import isSuperAdmin from '@/modules/auth/utils/isSuperAdmin'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const login = cookieStore.get(LOGIN_COOKIE_NAME)
  const hasAccess = login ? await isSuperAdmin(login) : false

  if (!hasAccess) redirect('/')

  return (
    <div className="border border-white-13 mt-12 px-6 pt-8 pb-20 w-11/12 mx-auto flex flex-col space-y-4 min-h-[70vh] overflow-y-scroll text-white">
      <div className="text-xs uppercase mb-4 border-t border-white-13 pt-2">
        <Link href={'/admin'}>Admin</Link>
      </div>
      {children}
    </div>
  )
}
