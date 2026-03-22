'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'merch',
    images: [] as string[],
    quantity: '0',
    stock: [] as { size: string; quantity: string }[],
  })
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()
      if (data.url) {
        setForm(f => ({ ...f, images: [...f.images, data.url] }))
      }
    } catch {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const addSize = () => {
    setForm(f => ({ ...f, stock: [...f.stock, { size: '', quantity: '0' }] }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const stockInput = form.stock
      .filter(s => s.size)
      .map(s => `{ size: "${s.size}", quantity: ${parseInt(s.quantity) || 0} }`)
      .join(', ')

    const mutation = `mutation {
      createProduct(input: {
        name: "${form.name}"
        description: "${form.description.replace(/"/g, '\\"')}"
        price: ${parseFloat(form.price) || 0}
        images: [${form.images.map(i => `"${i}"`).join(', ')}]
        category: "${form.category}"
        quantity: ${parseInt(form.quantity) || 0}
        ${stockInput ? `stock: [${stockInput}]` : ''}
      }) { id }
    }`

    try {
      await fetch('/api/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query: mutation }),
      })
      router.push('/admin/products')
    } catch {
      alert('Failed to create product')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl uppercase text-white mb-8">New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm text-white/60 mb-1">Name</label>
          <input
            type="text"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
            rows={4}
            className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/60 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
              className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-white/60 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
              className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
            >
              <option value="merch">Merch</option>
              <option value="vinyl">Vinyl</option>
              <option value="apparel">Apparel</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-white/60 mb-1">Quantity (non-sized)</label>
          <input
            type="number"
            value={form.quantity}
            onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
            className="w-full p-3 bg-[#1b1b1b] border border-white-13 text-white text-sm"
          />
        </div>

        {/* Size/stock management */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-white/60">Sizes & Stock</label>
            <button type="button" onClick={addSize} className="text-xs text-white/40 hover:text-white uppercase">
              + Add Size
            </button>
          </div>
          {form.stock.map((s, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <select
                value={s.size}
                onChange={e => {
                  const stock = [...form.stock]
                  stock[i].size = e.target.value
                  setForm(f => ({ ...f, stock }))
                }}
                className="p-2 bg-[#1b1b1b] border border-white-13 text-white text-sm"
              >
                <option value="">Select</option>
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(sz => (
                  <option key={sz} value={sz}>{sz}</option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Qty"
                value={s.quantity}
                onChange={e => {
                  const stock = [...form.stock]
                  stock[i].quantity = e.target.value
                  setForm(f => ({ ...f, stock }))
                }}
                className="w-20 p-2 bg-[#1b1b1b] border border-white-13 text-white text-sm"
              />
              <button
                type="button"
                onClick={() => setForm(f => ({ ...f, stock: f.stock.filter((_, j) => j !== i) }))}
                className="text-white/40 hover:text-white text-xs"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm text-white/60 mb-2">Images</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {form.images.map((img, i) => (
              <div key={i} className="relative w-20 h-20 border border-white-13">
                <img src={img} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, images: f.images.filter((_, j) => j !== i) }))}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full"
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="text-white/40 text-sm"
          />
          {uploading && <p className="text-white/40 text-xs mt-1">Uploading...</p>}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full py-3 bg-white text-black text-sm uppercase font-medium hover:bg-gray-200 disabled:opacity-50"
        >
          {saving ? 'Creating...' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}
