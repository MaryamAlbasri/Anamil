import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-10 text-cream md:px-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Link to="/" className="text-lg tracking-[0.3em]">
          ANAMIL
        </Link>

        <nav className="flex flex-wrap gap-6 text-sm text-cream/80">
          <Link to="/about" className="hover:text-gold">About us</Link>
          <Link to="/how-it-works" className="hover:text-gold">How it works</Link>
          <Link to="/browse" className="hover:text-gold">Hobbies</Link>
          <a href="mailto:hello@anamil.sa" className="hover:text-gold">Contact</a>
        </nav>

        <p className="text-sm text-cream/60 md:ml-auto">© 2026 Anamil</p>
      </div>
    </footer>
  )
}