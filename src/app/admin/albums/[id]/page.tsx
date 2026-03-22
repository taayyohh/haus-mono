'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

interface Track {
  id: string
  title: string
  trackNumber: number
  duration: number | null
  audioUrl: string | null
}

export default function EditAlbumPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({ title: '', coverImageUri: '', albumNotes: '', releaseDate: '' })
  const [tracks, setTracks] = useState<Track[]>([])
  const [newTrack, setNewTrack] = useState({ title: '', trackNumber: '' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  const fetchAlbum = () => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query: `{ album(id: "${params.id}") { id title coverImageUri albumNotes releaseDate tracks { id title trackNumber duration audioUrl } } }` }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        if (data?.album) {
          const a = data.album
          setForm({
            title: a.title,
            coverImageUri: a.coverImageUri || '',
            albumNotes: a.albumNotes || '',
            releaseDate: a.releaseDate ? a.releaseDate.split('T')[0] : '',
          })
          setTracks(a.tracks || [])
        }
      })
  }

  useEffect(() => { fetchAlbum() }, [params.id])

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      if (data.url) setForm(f => ({ ...f, coverImageUri: data.url }))
    } catch { /* ignore */ }
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `mutation { updateAlbum(id: "${params.id}", input: {
          title: "${form.title}",
          coverImageUri: "${form.coverImageUri}",
          albumNotes: ${JSON.stringify(form.albumNotes)},
          ${form.releaseDate ? `releaseDate: "${form.releaseDate}T00:00:00Z"` : ''}
        }) { id } }`,
      }),
    })
    setSaving(false)
    router.push('/admin/albums')
  }

  const handleAddTrack = async () => {
    if (!newTrack.title) return
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `mutation { addTrack(input: { title: "${newTrack.title}", trackNumber: ${parseInt(newTrack.trackNumber) || tracks.length + 1}, albumId: "${params.id}" }) { id } }`,
      }),
    })
    setNewTrack({ title: '', trackNumber: '' })
    fetchAlbum()
  }

  const handleRemoveTrack = async (trackId: string) => {
    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query: `mutation { removeTrack(id: "${trackId}") }` }),
    })
    fetchAlbum()
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl uppercase text-white mb-8">Edit Album</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Title</label>
          <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Release Date</label>
          <input type="date" value={form.releaseDate} onChange={e => setForm(f => ({ ...f, releaseDate: e.target.value }))} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Cover Art</label>
          {form.coverImageUri && <img src={form.coverImageUri} alt="" className="w-32 h-32 object-cover mb-2 border border-white-13" />}
          <input type="file" accept="image/*" onChange={handleCoverUpload} disabled={uploading} className="text-white/40 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Notes</label>
          <textarea value={form.albumNotes} onChange={e => setForm(f => ({ ...f, albumNotes: e.target.value }))} rows={4} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
        </div>

        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-white text-black text-sm uppercase font-medium hover:bg-gray-200 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>

        {/* Tracklist */}
        <div className="border-t border-white-13 pt-6">
          <h2 className="text-sm uppercase text-white/60 mb-4">Tracklist ({tracks.length} tracks)</h2>
          <div className="space-y-1">
            {tracks.map(t => (
              <div key={t.id} className="flex items-center justify-between border border-white-13 px-4 py-3 text-sm">
                <span className="text-white">
                  <span className="text-white/40 mr-4">{t.trackNumber < 10 ? `0${t.trackNumber}` : t.trackNumber}</span>
                  {t.title}
                </span>
                <button onClick={() => handleRemoveTrack(t.id)} className="text-red-400 text-xs uppercase hover:text-red-300">Remove</button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <input type="number" placeholder="#" value={newTrack.trackNumber} onChange={e => setNewTrack(t => ({ ...t, trackNumber: e.target.value }))} className="w-16 p-2 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
            <input type="text" placeholder="Track title" value={newTrack.title} onChange={e => setNewTrack(t => ({ ...t, title: e.target.value }))} className="flex-1 p-2 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
            <button onClick={handleAddTrack} className="px-4 py-2 bg-white text-black text-xs uppercase hover:bg-gray-200">Add</button>
          </div>
        </div>
      </div>
    </div>
  )
}
