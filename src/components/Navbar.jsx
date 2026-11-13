import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import crafts from '../data/crafts'

const active = ({ isActive }) => (isActive ? 'text-clay' : '')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-5 py-3 lg:grid lg:grid-cols-3 lg:px-10 lg:py-5">
        {/* Left: logo (+ name on phone) + links on laptop */}
        <div className="flex items-center gap-3 lg:gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Anamil logo" className="h-10 w-auto lg:h-14" />
            <span className="text-base font-medium tracking-[0.25em] text-ink lg:hidden">ANAMIL</span>
          </Link>
          <nav className="hidden gap-6 text-sm font-medium text-ink lg:flex">
            <NavLink to="/" end className={active}>Home</NavLink>
            <NavLink to="/browse" className={active}>Hobbies</NavLink>
            <NavLink to="/about" className={active}>About us</NavLink>
            <NavLink to="/how-it-works" className={active}>How it works</NavLink>
          </nav>
        </div>

        {/* Center: name (laptop only) */}
        <Link to="/" className="hidden justify-self-center text-2xl font-medium tracking-[0.4em] text-ink lg:block">
          ANAMIL
        </Link>

        {/* Right: account, cart, menu button */}
        <div className="flex items-center justify-end gap-5 text-sm font-medium text-ink">
          <NavLink to="/login" className={({ isActive }) => `hidden lg:block ${isActive ? 'text-clay' : ''}`}>Account</NavLink>
          <NavLink to="/cart" className={({ isActive }) => `flex h-8 items-center ${isActive ? 'text-clay' : ''}`}>Cart</NavLink>
          <button className="flex h-8 w-8 items-center justify-center lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A211C" strokeWidth="2" strokeLinecap="round">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2A211C" strokeWidth="2" strokeLinecap="round">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-4 border-t border-cream px-6 py-4 text-ink lg:hidden">
          <NavLink to="/" end className={active} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/find-my-hobby" className={active} onClick={() => setOpen(false)}>✦ Find my hobby</NavLink>
          <NavLink to="/browse" className={active} onClick={() => setOpen(false)}>Hobbies</NavLink>
          <NavLink to="/about" className={active} onClick={() => setOpen(false)}>About us</NavLink>
          <NavLink to="/how-it-works" className={active} onClick={() => setOpen(false)}>How it works</NavLink>
          <NavLink to="/login" className={active} onClick={() => setOpen(false)}>Account</NavLink>
        </nav>
      )}

      <div className="hidden justify-center px-6 pb-2 lg:flex lg:px-10">
        <Link to="/find-my-hobby" className="flex w-full max-w-2xl items-center justify-between rounded-full border border-blush bg-cream px-6 py-4 text-muted">
          <span><span className="text-clay">✦</span> Describe a hobby you'd enjoy…</span>
          <span>🔍</span>
        </Link>
      </div>

      <nav className="flex gap-5 overflow-x-auto border-b border-cream px-5 py-3 text-sm text-ink lg:justify-center lg:gap-8 lg:py-4 lg:text-base">
        {crafts.slice(0, 7).map((c) => (
          <Link key={c.id} to={`/browse?craft=${c.id}`} className="whitespace-nowrap">{c.name}</Link>
        ))}
        <Link to="/browse" className="whitespace-nowrap font-medium text-clay">All hobbies →</Link>
      </nav>
    </header>
  )
}