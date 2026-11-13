import { NavLink, Link } from 'react-router-dom'

export default function Sidebar({ title, links }) {
  return (
    <aside className="border-b border-cream bg-white p-4 md:min-h-screen md:w-60 md:border-b-0 md:border-r">
      <Link to="/" className="mb-6 flex items-center gap-2">
        <img src="/images/logo.png" alt="Anamil logo" className="h-10 w-auto" />
        <span className="font-medium tracking-[0.3em] text-ink">ANAMIL</span>
      </Link>
      <p className="mb-2 text-xs font-medium tracking-widest text-muted">{title}</p>
      <nav className="flex gap-2 overflow-x-auto md:flex-col">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-cream font-medium text-clay' : 'text-ink'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}