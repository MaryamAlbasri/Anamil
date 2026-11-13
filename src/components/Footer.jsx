import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-12 text-sm md:px-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <Link to="/" className="text-lg font-medium tracking-[0.4em] text-white">
          ANAMIL
        </Link>

        <nav className="flex flex-wrap gap-6 text-[#D9CEC4]">
          <Link to="/about">About us</Link>
          <Link to="/about">Contact</Link>
          <Link to="/about">Terms</Link>
          <Link to="/about">Privacy</Link>
        </nav>

        <p className="text-[#A89A8F] md:ml-auto">© 2026 Anamil</p>
      </div>
    </footer>
  )
}