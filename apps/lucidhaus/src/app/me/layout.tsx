import { cookies } from 'next/headers'
import { LOGIN_COOKIE_NAME } from '@/constants'
import isSuperAdmin from '@/modules/auth/utils/isSuperAdmin'
import React from 'react'
import Link from 'next/link'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const login = cookieStore.get(LOGIN_COOKIE_NAME)
  const isAdmin = login ? await isSuperAdmin(login) : false

  return (
    <div className="px-6 pt-8 pb-20 max-w-xl mx-auto flex flex-col space-y-4 text-white">
      {isAdmin && (
        <div className="text-xs uppercase mb-4 border-t border-white-13 pt-2">
          <Link href={'/admin'}>Admin</Link>
        </div>
      )}
      {children}
    </div>
  )
}
