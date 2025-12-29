'use client'

import { useState, FormEvent } from 'react'

interface PasswordGateProps {
  slug: string
}

export default function PasswordGate({ slug }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/epk/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ slug, password }),
      })

      if (response.ok) {
        // Password correct, cookie has been set, reload the page
        window.location.reload()
      } else {
        // Incorrect password
        setError('Incorrect password')
        setLoading(false)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#131313]">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold uppercase text-white mb-4">EPK Access</h1>
          <p className="text-white opacity-60">This page is password protected</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full bg-[#1b1b1b] border border-white-13 rounded px-4 py-3 text-white placeholder-white placeholder-opacity-40 focus:outline-none focus:border-white-13 focus:ring-1 focus:ring-white-13"
              disabled={loading}
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-[#1b1b1b] hover:bg-[#111] text-white border border-white-13 rounded py-3 px-8 uppercase text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Access EPK'}
          </button>
        </form>
      </div>
    </div>
  )
}
