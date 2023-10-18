import { cookies } from 'next/headers'
import { LOGIN_COOKIE_NAME } from '@/constants'
import isSuperAdmin from '@/modules/auth/utils/isSuperAdmin'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
import { loadStripeOnramp } from '@stripe/crypto'
import config from '@/constants/config'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies()
  const login = cookieStore.get(LOGIN_COOKIE_NAME)
  const isAdmin = login ? await isSuperAdmin(login) : false

  return (
    <div className="border-solid border-8 border-white mt-12 px-6 pt-8 pb-20 max-w-xl mx-auto flex flex-col space-y-4 max-h-[70vh] overflow-y-scroll text-white">
      <Script src="https://js.stripe.com/v3/" />
      <Script src="https://crypto-js.stripe.com/crypto-onramp-outer.js" />
      {isAdmin && (
        <div className="text-xs uppercase mb-4 border-t pt-2">
          <Link href={'/admin'}>Admin</Link>
        </div>
      )}
      {children}
    </div>
  )
}
