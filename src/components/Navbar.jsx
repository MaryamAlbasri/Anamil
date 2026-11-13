import { useState } from 'react'
import { Link } from 'react-router-dom'

import crafts from '../data/crafts'
export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-6 py-6 md:px-10">
        <nav className="hidden gap-7 text-sm font-medium text-ink md:flex">
          <Link to="/browse">Hobbies</Link>
          <Link to="/about">About us</Link>
        </nav>

        <button className="text-2xl md:hidden" onClick={() => setOpen(!open)}>
          {open ? '✕' : '☰'}
        </button>

        <Link to="/" className="text-xl font-medium tracking-[0.4em] text-ink md:text-2xl">
          ANAMIL
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-ink">
          <Link to="/login" className="hidden md:block">Account</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-cream px-6 py-4 text-ink md:hidden">
          <Link to="/browse" onClick={() => setOpen(false)}>Hobbies</Link>
          <Link to="/about" onClick={() => setOpen(false)}>About us</Link>
          <Link to="/login" onClick={() => setOpen(false)}>Account</Link>
        </nav>
      )}

      <div className="flex justify-center px-6 pb-2 md:px-10">
        <Link to="/find-my-hobby" className="flex w-full max-w-2xl items-center justify-between rounded-full border border-blush bg-cream px-6 py-4 text-muted">
          <span><span className="text-clay">✦</span> Describe a hobby you'd enjoy…</span>
          <span>🔍</span>
        </Link>
      </div>
      
      <nav className="flex gap-6 overflow-x-auto border-b border-cream px-6 py-4 text-ink md:justify-center md:gap-8">
        {crafts.slice(0, 7).map((c) => (
          <Link key={c.id} to={`/browse?craft=${c.id}`} className="whitespace-nowrap">
            {c.name}
          </Link>
        ))}
        <Link to="/browse" className="whitespace-nowrap font-medium text-clay">
          All hobbies →
        </Link>
      </nav>
    </header>
  )
}