'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditArtistPage() {
  const router = useRouter()
  const params = useParams()
  const [form, setForm] = useState({ name: '', bio: '', heroImage: '', socialLinks: '{}' })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ query: `{ artist(id: "${params.id}") { id name bio heroImage socialLinks } }` }),
    })
      .then(r => r.json())
      .then(({ data }) => {
        if (data?.artist) {
          const a = data.artist
          setForm({ name: a.name, bio: a.bio, heroImage: a.heroImage, socialLinks: JSON.stringify(a.socialLinks || {}, null, 2) })
        }
      })
  }, [params.id])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await fetch('/api/upload', { method: 'POST', credentials: 'include', body: fd })
      const data = await res.json()
      if (data.url) setForm(f => ({ ...f, heroImage: data.url }))
    } catch { /* ignore */ }
    setUploading(false)
  }

  const handleSave = async () => {
    setSaving(true)
    let socialLinksJson = '{}'
    try { socialLinksJson = JSON.stringify(JSON.parse(form.socialLinks)) } catch { /* ignore */ }

    await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `mutation { updateArtist(id: "${params.id}", input: {
          name: "${form.name}",
          bio: ${JSON.stringify(form.bio)},
          heroImage: "${form.heroImage}",
          socialLinks: ${socialLinksJson}
        }) { id } }`,
      }),
    })
    setSaving(false)
    router.push('/admin/artists')
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl uppercase text-white mb-8">Edit Artist</h1>
      <div className="space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Name</label>
          <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Bio</label>
          <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={8} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Hero Image</label>
          {form.heroImage && <img src={form.heroImage} alt="" className="w-32 h-32 object-cover mb-2 border border-white-13" />}
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="text-white/40 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-white/60 mb-1">Social Links (JSON)</label>
          <textarea value={form.socialLinks} onChange={e => setForm(f => ({ ...f, socialLinks: e.target.value }))} rows={4} className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm font-mono" />
        </div>
        <button onClick={handleSave} disabled={saving} className="w-full py-3 bg-white text-black text-sm uppercase font-medium hover:bg-gray-200 disabled:opacity-50">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}
