'use client'

export default function AdminError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl uppercase text-white mb-4">Admin Error</h1>
      <p className="text-red-400 text-sm mb-4">{error.message}</p>
      <button onClick={reset} className="border border-white-13 px-6 py-2 text-sm uppercase text-white hover:bg-white/5">
        Try Again
      </button>
    </div>
  )
}
