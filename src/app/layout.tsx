import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { RootLayoutClient } from './RootLayoutClient';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || 'https://lucid.haus';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Lucid Haus',
    template: '%s | Lucid Haus',
  },
  description: 'Lucid Haus is an independent music label.',
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Lucid Haus',
    title: 'Lucid Haus',
    description: 'Lucid Haus is an independent music label.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lucid Haus',
    description: 'Lucid Haus is an independent music label.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
