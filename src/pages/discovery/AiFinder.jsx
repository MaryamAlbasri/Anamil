import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const rules = [
  { words: ['calm', 'relax', 'quiet', 'peace'], id: 'pottery', name: 'Pottery', reason: 'Calm, hands-on and relaxing. Ideal for weekend classes.' },
  { words: ['calm', 'focus', 'write', 'art'], id: 'calligraphy', name: 'Calligraphy', reason: 'Quiet and focused. You only need pens, ink and paper to start.' },
  { words: ['outdoor', 'travel', 'nature', 'camera', 'photo'], id: 'photography', name: 'Photography', reason: 'Gets you outside and noticing details. Start with any camera.' },
  { words: ['clothes', 'fashion', 'fix', 'make'], id: 'sewing', name: 'Sewing', reason: 'Make and fix your own clothes. Very practical.' },
  { words: ['build', 'wood', 'tools', 'make'], id: 'woodwork', name: 'Woodwork', reason: 'Build real objects you can use at home.' },
  { words: ['color', 'pattern', 'textile', 'home'], id: 'weaving', name: 'Weaving', reason: 'Colorful and meditative. Great for home decor.' },
]

function fakeAiMatch(text) {
  const lower = text.toLowerCase()
  return rules
    .map((r) => ({ ...r, score: r.words.filter((w) => lower.includes(w)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
}

export default function AiFinder() {
  const [searchParams] = useSearchParams()
  const [text, setText] = useState(searchParams.get('q') || '')
  const [status, setStatus] = useState('idle') // idle | loading | results | error
  const [results, setResults] = useState([])

  const tooShort = text.trim().length < 10

  function handleFind() {
    setStatus('loading')
    setTimeout(() => {
      if (text.toLowerCase().includes('error')) {
        setStatus('error')
      } else {
        setResults(fakeAiMatch(text))
        setStatus('results')
      }
    }, 1500)
  }

  useEffect(() => {
    if (text.trim().length >= 10) handleFind()
  }, [])

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="text-3xl font-light text-ink md:text-4xl">Tell us what you're looking for</h1>
        <p className="mt-3 text-muted">
          Describe in your own words what you would enjoy. Our assistant suggests up to 3 hobbies.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={status === 'loading'}
          maxLength={500}
          placeholder="e.g. something calm I can do with my hands on weekends"
          className="mt-6 h-32 w-full rounded-2xl border border-blush bg-cream p-4 text-ink md:h-36"
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm text-muted">
            {text.length}/500 {tooShort && text.length > 0 && '· Please write a bit more'}
          </span>
          {status === 'loading' ? (
            <span className="text-clay">⏳ Finding hobbies for you…</span>
          ) : (
            <button onClick={handleFind} disabled={tooShort}
              className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-white disabled:opacity-40">
              {status === 'results' ? 'Find again' : '✦ Find my hobby'}
            </button>
          )}
        </div>

        {status === 'error' && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
            <p className="font-medium text-red-800">We couldn't reach the assistant right now</p>
            <p className="mt-1 text-sm text-red-700">Please try again, or browse all hobbies yourself.</p>
            <Link to="/browse" className="mt-2 inline-block text-sm text-red-800 underline">Browse all hobbies</Link>
          </div>
        )}

        {status === 'results' && (
          <section className="mt-10 md:mt-12">
            <h2 className="text-2xl text-ink">3 hobbies that match you</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              {results.map((r) => (
                <div key={r.id} className="overflow-hidden rounded-2xl border border-cream">
                  <img src={`/images/${r.id}.png`} alt={r.name} className="h-36 w-full object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-ink">{r.name}</h3>
                    <p className="mt-1 text-sm text-muted">{r.reason}</p>
                    <Link to={`/browse?craft=${r.id}`}
                      className="mt-4 inline-block rounded-full border border-ink px-4 py-2 text-sm">
                      See teachers near me
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}