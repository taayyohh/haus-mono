'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl uppercase text-white mb-4">Something went wrong</h1>
        <p className="text-white/40 mb-8 text-sm">{error.message}</p>
        <button
          onClick={reset}
          className="border border-white-13 px-8 py-3 text-sm uppercase text-white hover:bg-white/5"
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
