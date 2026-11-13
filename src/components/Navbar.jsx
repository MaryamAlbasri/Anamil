import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import crafts from '../data/crafts'

const active = ({ isActive }) => (isActive ? 'text-clay' : '')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className="flex items-center justify-between px-5 py-3 lg:px-10 lg:py-4">
        {/* Left: logo */}
        <Link to="/" className="shrink-0">
          <img src="/images/logo.png" alt="Anamil" className="h-10 w-auto lg:h-14" />
        </Link>

        {/* Center: links (laptop only) */}
        <nav className="hidden gap-8 whitespace-nowrap text-sm font-medium text-ink lg:flex">
          <NavLink to="/" end className={active}>Home</NavLink>
          <NavLink to="/browse" className={active}>Hobbies</NavLink>
          <NavLink to="/how-it-works" className={active}>How it works</NavLink>
          <NavLink to="/about" className={active}>About us</NavLink>
        </nav>

        {/* Right: account, cart, menu button */}
        <div className="flex items-center gap-5 text-sm font-medium text-ink">
          <NavLink to="/login" className={({ isActive }) => `hidden whitespace-nowrap lg:block ${isActive ? 'text-clay' : ''}`}>
            Account
          </NavLink>
          <NavLink to="/cart" aria-label="Cart"
            className={({ isActive }) => `relative flex h-8 w-8 items-center justify-center ${isActive ? 'text-clay' : 'text-ink'}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 7h12l-1.2 12.1a1 1 0 0 1-1 .9H8.2a1 1 0 0 1-1-.9L6 7Z" />
              <path d="M9 7V6a3 3 0 0 1 6 0v1" />
            </svg>
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-clay text-[10px] text-white">
              2
            </span>
          </NavLink>
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
        <nav className="flex flex-col gap-4 border-t border-cream px-6 py-5 text-ink lg:hidden">
          <NavLink to="/" end className={active} onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/browse" className={active} onClick={() => setOpen(false)}>Hobbies</NavLink>
          <NavLink to="/how-it-works" className={active} onClick={() => setOpen(false)}>How it works</NavLink>
          <NavLink to="/about" className={active} onClick={() => setOpen(false)}>About us</NavLink>

          <div className="my-1 border-t border-cream" />

          <NavLink to="/login" className={active} onClick={() => setOpen(false)}>Account</NavLink>
          <Link to="/find-my-hobby" onClick={() => setOpen(false)}
            className="mt-1 rounded-full bg-clay py-3 text-center text-sm font-medium text-white">
            ✦ Find my hobby
          </Link>
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