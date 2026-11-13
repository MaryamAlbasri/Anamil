import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import crafts from '../data/crafts'

const active = ({ isActive }) => (isActive ? 'text-clay' : '')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="grid grid-cols-3 items-center px-6 py-5 md:px-10">
        {/* Left: logo + links */}
        <div className="flex items-center gap-8">
          <Link to="/">
            <img src="/images/logo.png" alt="Anamil logo" className="h-18 w-auto" />
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-ink lg:flex">
            <NavLink to="/" end className={active}>Home</NavLink>
            <NavLink to="/browse" className={active}>Hobbies</NavLink>
            <NavLink to="/about" className={active}>About us</NavLink>
            <NavLink to="/how-it-works" className={active}>How it works</NavLink>
          </nav>
        </div>

        {/* Center: name */}
        <Link to="/" className="justify-self-center text-xl font-medium tracking-[0.4em] text-ink md:text-2xl">
          ANAMIL
        </Link>

        {/* Right: account, cart, ☰ */}
        <div className="flex items-center justify-end gap-6 text-sm font-medium text-ink">
          <NavLink to="/login" className={({ isActive }) => `hidden lg:block ${isActive ? 'text-clay' : ''}`}>Account</NavLink>
          <NavLink to="/cart" className={active}>Cart</NavLink>
          <button className="text-2xl lg:hidden" onClick={() => setOpen(!open)}>
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-cream px-6 py-4 text-ink md:hidden">
          <NavLink to="/" end className={active} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/browse" className={active} onClick={() => setOpen(false)}>Hobbies</NavLink>
          <NavLink to="/about" className={active} onClick={() => setOpen(false)}>About us</NavLink>
          <NavLink to="/how-it-works" className={active} onClick={() => setOpen(false)}>How it works</NavLink>
          <NavLink to="/login" className={active} onClick={() => setOpen(false)}>Account</NavLink>
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
          <Link key={c.id} to={`/browse?craft=${c.id}`} className="whitespace-nowrap">{c.name}</Link>
        ))}
        <Link to="/browse" className="whitespace-nowrap font-medium text-clay">All hobbies →</Link>
      </nav>
    </header>
  )
}