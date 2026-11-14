import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const slides = [
  { img: '/images/p1.png', word: 'weaving', caption: 'Lina · Weaving · Amman' },
  { img: '/images/p2.png', word: 'sewing', caption: 'Huda · Sewing · Riyadh' },
  { img: '/images/p3.png', word: 'photography', caption: 'Sara · Photography · Dubai' },
  { img: '/images/p4.png', word: 'pottery', caption: 'Noura · Pottery · Riyadh' },
  { img: '/images/p5.png', word: 'calligraphy', caption: 'Omar · Calligraphy · Jeddah' },
  { img: '/images/p6.png', word: 'woodwork', caption: 'Khalid · Woodwork · Dammam' },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => setCurrent((current + 1) % slides.length), 4500)
    return () => clearTimeout(timer)
  }, [current])

  function handleSearch(e) {
    e.preventDefault()
    navigate(`/find-my-hobby?q=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative h-[440px] overflow-hidden bg-ink md:h-[560px]">
      {slides.map((s, i) => (
        <img key={s.img} src={s.img} alt={s.word}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`} />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/75 md:via-black/40 md:to-transparent" />

      <div className="absolute bottom-16 left-6 right-6 text-white md:bottom-auto md:left-16 md:top-1/2 md:max-w-xl md:-translate-y-1/2">
        <p className="mb-3 text-[10px] font-medium tracking-[0.2em] text-blush md:mb-5 md:text-xs md:tracking-[0.24em]">
          CRAFTS · HOBBIES · REAL TEACHERS
        </p>
        <h1 className="text-3xl font-light leading-tight md:text-6xl">
          Find your <br />
          <span className="text-gold">{slides[current].word}</span> teacher.
        </h1>

        <form onSubmit={handleSearch}
          className="mt-5 flex max-w-md items-center justify-between rounded-full bg-white py-1.5 pl-4 pr-1.5 md:mt-8 md:py-2 md:pl-5 md:pr-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="✦ Describe a hobby…"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-muted"
          />
          <button className="shrink-0 rounded-full bg-clay px-4 py-2 text-xs font-medium text-white md:py-3 md:tracking-widest">
            <span className="md:hidden">Find</span>
            <span className="hidden md:inline">FIND MY HOBBY</span>
          </button>
        </form>
        <Link to="/browse" className="mt-3 hidden text-sm font-medium underline md:inline-block">
          Browse all teachers →
        </Link>
      </div>

      <div className="absolute bottom-7 left-6 flex gap-2 md:left-16">
        {slides.map((s, i) => (
          <button key={s.word} onClick={() => setCurrent(i)} aria-label={`Show ${s.word}`}
            className={`h-1 w-6 rounded md:w-8 ${i === current ? 'bg-white' : 'bg-white/35'}`} />
        ))}
      </div>
      <p className="absolute bottom-6 right-6 hidden rounded-full bg-clay/45 px-4 py-2 text-xs text-white md:block">
        {slides[current].caption}
      </p>
    </section>
  )
}