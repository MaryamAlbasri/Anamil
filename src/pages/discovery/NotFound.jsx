import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center px-6 py-24 text-center">
        <p className="font-serif text-8xl italic text-clay">404</p>
        <h1 className="mt-4 text-3xl font-light text-ink">This page got lost in the yarn</h1>
        <p className="mt-3 max-w-md text-muted">
          The page you're looking for doesn't exist or was moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link to="/" className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-white">Back to home</Link>
          <Link to="/browse" className="rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink">Browse hobbies</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}