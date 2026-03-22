import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
}

export default function AboutPage() {
  return (
    <div className="px-4 sm:px-8 py-16 max-w-3xl mx-auto">
      <h1 className="text-3xl uppercase font-bold text-white mb-8">About</h1>
      <div className="text-white/80 text-lg leading-relaxed space-y-6">
        <p>
          Lucid Haus is an independent music label based in Brooklyn, NY.
        </p>
      </div>
    </div>
  )
}
