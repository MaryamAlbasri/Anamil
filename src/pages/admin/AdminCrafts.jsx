import { useState } from 'react'
import Sidebar from '../../components/Sidebar'
import { adminLinks } from './AdminVerification'
import craftsData from '../../data/crafts'

export default function AdminCrafts() {
  const [crafts, setCrafts] = useState(craftsData)
  const [newName, setNewName] = useState('')
  const [error, setError] = useState('')

  function addCraft(e) {
    e.preventDefault()
    const name = newName.trim()
    if (!name) return setError('Please enter a craft name.')
    if (crafts.some((c) => c.name.toLowerCase() === name.toLowerCase())) {
      return setError('This craft already exists.')
    }
    setCrafts([...crafts, { id: name.toLowerCase().replace(/\s+/g, '-'), name }])
    setNewName('')
    setError('')
  }

  function removeCraft(id) {
    setCrafts(crafts.filter((c) => c.id !== id))
  }

  return (
    <div className="md:flex">
      <Sidebar title="ADMIN" links={adminLinks} />
      <main className="flex-1 p-6 md:p-10">
        <h1 className="text-3xl font-light text-ink">Crafts list</h1>
        <p className="mt-2 text-muted">The AI finder only suggests crafts from this list.</p>

        <form onSubmit={addCraft} className="mt-6 flex max-w-lg gap-3">
          <input value={newName} onChange={(e) => { setNewName(e.target.value); setError('') }}
            placeholder="New craft, e.g. Mosaic art"
            className="flex-1 rounded-full border border-blush px-5 py-3" />
          <button className="rounded-full bg-clay px-6 py-3 text-sm text-white">Add</button>
        </form>
        {error && <p className="mt-2 text-sm text-red-700">{error}</p>}

        <ul className="mt-8 grid max-w-2xl gap-3 sm:grid-cols-2">
          {crafts.map((c) => (
            <li key={c.id} className="flex items-center justify-between rounded-xl border border-cream px-4 py-3">
              <span className="text-ink">{c.name}</span>
              <button onClick={() => removeCraft(c.id)} className="text-sm text-muted hover:text-red-700">Remove</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}