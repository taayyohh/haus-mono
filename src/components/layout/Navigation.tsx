'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { List, X, ShoppingBag, User, SignOut } from 'phosphor-react';
import { useCart } from '@/hooks/useCart';
import { usePrivy } from '@privy-io/react-auth';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { itemCount: cartCount } = useCart();

  let authenticated = false;
  let login: (() => void) | undefined;
  let logout: (() => void) | undefined;
  let privyUser: any = null;
  try {
    const privy = usePrivy();
    authenticated = privy.authenticated;
    login = privy.login;
    logout = privy.logout;
    privyUser = privy.user;
  } catch {
    // Privy provider not available
  }

  // Fetch user role when authenticated
  useEffect(() => {
    if (!authenticated) { setUserRole(null); return; }
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query: '{ currentUser { role } }' }),
    })
      .then(r => r.json())
      .then(({ data }) => setUserRole(data?.currentUser?.role || null))
      .catch(() => {});
  }, [authenticated]);

  const isAdmin = userRole === 'ADMIN';

  return (
    <>
      <header className="fixed left-0 w-full h-20 px-4 sm:px-8 z-50 flex items-center justify-between bg-background/80 backdrop-blur-sm">
        <Link href="/">
          <Image
            src="/header-logo.png"
            alt="Lucid Haus"
            width={100}
            height={80}
            priority
          />
        </Link>

        <div className="hidden sm:flex items-center gap-6">
          <nav className="flex items-center gap-6 text-sm uppercase text-white/80">
            <Link href="/artists" className="hover:text-white transition-colors">Artists</Link>
            <Link href="/discography" className="hover:text-white transition-colors">Discography</Link>
            <Link href="/videos" className="hover:text-white transition-colors">Videos</Link>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          </nav>

          <Link href="/cart" className="relative text-white/80 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </Link>

          {/* Auth */}
          {authenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <User size={20} />
              </button>
              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-8 z-50 bg-[#1b1b1b] border border-white-13 rounded shadow-lg min-w-[180px]">
                    <div className="px-4 py-3 border-b border-white-13 text-xs text-white/40">
                      {privyUser?.email?.address || 'Account'}
                    </div>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-sm text-white hover:bg-white/5 uppercase"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Admin
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      className="block px-4 py-3 text-sm text-white hover:bg-white/5 uppercase"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Orders
                    </Link>
                    <button
                      onClick={() => { logout?.(); setUserMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 text-sm text-white/60 hover:bg-white/5 uppercase flex items-center gap-2"
                    >
                      <SignOut size={14} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => login?.()}
              className="text-sm uppercase text-white/60 hover:text-white transition-colors"
            >
              Sign In
            </button>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 sm:hidden">
          <Link href="/cart" className="relative text-white p-2">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full" />
            )}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-20">
          <nav className="flex flex-col gap-4 p-8 text-sm uppercase text-white">
            <Link href="/artists" onClick={() => setIsOpen(false)}>Artists</Link>
            <Link href="/discography" onClick={() => setIsOpen(false)}>Discography</Link>
            <Link href="/videos" onClick={() => setIsOpen(false)}>Videos</Link>
            <Link href="/shop" onClick={() => setIsOpen(false)}>Shop</Link>
            {authenticated ? (
              <>
                {isAdmin && <Link href="/admin" onClick={() => setIsOpen(false)}>Admin</Link>}
                <Link href="/orders" onClick={() => setIsOpen(false)}>Orders</Link>
                <button onClick={() => { logout?.(); setIsOpen(false); }} className="text-left text-white/60">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { login?.(); setIsOpen(false); }} className="text-left">Sign In</button>
            )}
          </nav>
        </div>
      )}

      <div className="h-20" />
    </>
  );
}
