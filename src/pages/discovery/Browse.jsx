import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import craftspeople from '../../data/craftspeople'
import crafts from '../../data/crafts'

const cities = [...new Set(craftspeople.map((p) => p.city))]

export default function Browse() {
  const [searchParams, setSearchParams] = useSearchParams()
  const craft = searchParams.get('craft') || 'all'
  const [city, setCity] = useState('all')
  const [maxPrice, setMaxPrice] = useState(500)

  function setCraft(value) {
    if (value === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ craft: value })
    }
  }

  const results = craftspeople.filter(
    (p) =>
      (craft === 'all' || p.craft === craft) &&
      (city === 'all' || p.city === city) &&
      p.priceFrom <= maxPrice
  )

  function clearFilters() {
    setSearchParams({})
    setCity('all')
    setMaxPrice(500)
  }

  return (
    <>
      <Navbar />
      <main className="grid gap-10 px-6 py-12 md:grid-cols-[240px_1fr] md:px-16">
        <aside className="space-y-6">
          <h2 className="text-xl font-medium text-ink">Filters</h2>

          <label className="block text-sm text-ink">
            Craft
            <select value={craft} onChange={(e) => setCraft(e.target.value)}
              className="mt-2 w-full rounded-lg border border-blush bg-white p-3">
              <option value="all">All crafts</option>
              {crafts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>

          <label className="block text-sm text-ink">
            City
            <select value={city} onChange={(e) => setCity(e.target.value)}
              className="mt-2 w-full rounded-lg border border-blush bg-white p-3">
              <option value="all">All cities</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="block text-sm text-ink">
            Max price: <span className="font-medium">{maxPrice} SAR</span>
            <input type="range" min="50" max="500" step="10" value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-3 w-full accent-clay" />
          </label>

          <button onClick={clearFilters} className="text-sm text-clay underline">
            Clear filters
          </button>
        </aside>

        <section>
          <p className="mb-6 text-muted">
            {results.length} {results.length === 1 ? 'teacher' : 'teachers'} found
          </p>

          {results.length === 0 ? (
            <div className="flex flex-col items-center rounded-3xl bg-cream py-20 text-center">
              <p className="text-4xl">🔍</p>
              <p className="mt-4 text-xl text-ink">No teachers match your filters</p>
              <button onClick={clearFilters}
                className="mt-6 rounded-full bg-clay px-6 py-3 text-sm font-medium text-white">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <Link key={p.id} to={`/craftspeople/${p.id}`}
                  className="overflow-hidden rounded-2xl border border-cream bg-white transition hover:shadow-lg">
                  <img src={p.img} alt={p.name} className="h-44 w-full object-cover" />
                  <div className="p-4">
                    <p className="text-lg font-medium text-ink">{p.name}</p>
                    <p className="text-sm text-muted">{p.craftName} · {p.city}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-clay">★ {p.rating}</span>
                      <span className="text-ink">From {p.priceFrom} SAR</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}