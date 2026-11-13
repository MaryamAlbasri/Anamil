import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import craftspeople from '../../data/craftspeople'
import lessons from '../../data/lessons'

export default function CraftspersonProfile() {
  const { id } = useParams()
  const person = craftspeople.find((p) => p.id === Number(id))
  const [tab, setTab] = useState('lessons')
  const [showLogin, setShowLogin] = useState(false)

  if (!person) {
    return (
      <>
        <Navbar />
        <p className="p-16 text-center text-xl">Craftsperson not found.</p>
        <Footer />
      </>
    )
  }

  const myLessons = lessons.filter((l) => l.teacherId === person.id)

  return (
    <>
      <Navbar />
      <main className="px-6 py-12 md:px-16">
        <section className="flex flex-col gap-8 md:flex-row md:items-center">
          <img src={person.img} alt={person.name} className="h-40 w-40 rounded-full object-cover" />
          <div>
            <h1 className="text-4xl font-light text-ink">{person.name}</h1>
            <p className="mt-1 text-muted">{person.craftName} · {person.city}</p>
            <div className="mt-3 flex items-center gap-3 text-sm">
              <span className="text-clay">★ {person.rating} ({person.reviews} reviews)</span>
              {person.verified && (
                <span className="rounded-full bg-[#DCE6D4] px-3 py-1 text-[#3F5A3A]">✓ Verified</span>
              )}
            </div>
          </div>
        </section>

        <nav className="mt-12 flex gap-8 border-b border-cream">
          {['lessons', 'shop', 'reviews'].map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`pb-3 capitalize ${tab === t ? 'border-b-2 border-clay font-medium text-ink' : 'text-muted'}`}>
              {t}
            </button>
          ))}
        </nav>

        {tab === 'lessons' && (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {myLessons.map((l) => (
              <div key={l.id} className="rounded-2xl border border-cream p-5">
                <h3 className="text-lg font-medium text-ink">{l.title}</h3>
                <div className="mt-2 flex gap-2 text-xs">
                  <span className="rounded-full bg-cream px-3 py-1">{l.level}</span>
                  <span className="rounded-full bg-cream px-3 py-1">{l.duration}</span>
                </div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="font-medium">{l.price} SAR</span>
                  <button onClick={() => setShowLogin(true)}
                    className="rounded-full bg-clay px-5 py-2 text-sm text-white">Book</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === 'shop' && <p className="mt-8 text-muted">Products coming soon.</p>}
        {tab === 'reviews' && <p className="mt-8 text-muted">"Patient and inspiring teacher!" ★★★★★</p>}
      </main>

      {showLogin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-6"
          onClick={() => setShowLogin(false)}>
          <div className="w-full max-w-md rounded-2xl bg-white p-8" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between">
              <h2 className="text-xl font-medium text-ink">Log in to book this lesson</h2>
              <button onClick={() => setShowLogin(false)}>✕</button>
            </div>
            <p className="mt-3 text-muted">Create a free account to book lessons and buy from craftspeople.</p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link to="/login" className="rounded-full bg-clay py-3 text-center text-white">Log in</Link>
              <Link to="/signup" className="rounded-full border border-ink py-3 text-center">Sign up</Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}