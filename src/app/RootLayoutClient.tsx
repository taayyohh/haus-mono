'use client';

import { useState, useEffect } from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';
import Player from '@/modules/player/components/Player';

const RelayProvider = dynamic(
  () => import('@/components/providers/RelayProvider').then(mod => mod.RelayProvider),
  { ssr: false }
);

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <header className="fixed left-0 w-full h-20 px-4 sm:px-8 z-10 flex items-center justify-between">
          <a href="/">
            <img src="/header-logo.png" alt="Lucid Haus" width={100} height={80} />
          </a>
        </header>
        <div className="h-20" />
        <main className="flex-1">{children}</main>
        <footer className="py-6 px-4 sm:px-8 text-xs uppercase mt-24">
          <p className="text-white/30">&copy; {new Date().getFullYear()} Lucid Haus</p>
        </footer>
      </div>
    );
  }

  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  const content = (
    <RelayProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Toaster
          toastOptions={{
            unstyled: true,
            classNames: {
              toast: 'bg-[#1b1b1b] border border-white-13 p-4 rounded',
              title: 'text-white text-sm',
            },
          }}
        />
        <Player />
          <Footer />
        </div>
      </RelayProvider>
  );

  if (!privyAppId) {
    return content;
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        loginMethods: ['email', 'wallet'],
        appearance: {
          theme: 'dark',
          accentColor: '#A8E4DA',
        },
      }}
    >
      {content}
    </PrivyProvider>
  );
}
