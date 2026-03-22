'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Artists', href: '/admin/artists' },
  { label: 'Albums', href: '/admin/albums' },
  { label: 'Products', href: '/admin/products' },
  { label: 'Orders', href: '/admin/orders' },
  { label: 'EPK', href: '/admin/epk' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <nav className="w-48 border-r border-white-13 p-4 hidden sm:block">
        <div className="text-xs uppercase tracking-widest text-white/30 mb-4">Admin</div>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block px-3 py-2 text-sm uppercase ${
                  pathname === item.href
                    ? 'text-white bg-white/10'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile nav */}
      <div className="sm:hidden border-b border-white-13 w-full fixed top-20 z-40 bg-background overflow-x-auto">
        <div className="flex gap-2 p-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1 text-xs uppercase whitespace-nowrap ${
                pathname === item.href
                  ? 'text-white border border-white-13'
                  : 'text-white/40'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-4 sm:p-8">
        {children}
      </main>
    </div>
  )
}
