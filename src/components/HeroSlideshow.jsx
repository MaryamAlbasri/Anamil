import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  { img: '/images/weaving.jpg', word: 'weaving', caption: 'Lina · Weaving · Amman' },
  { img: '/images/sewing.jpg', word: 'sewing', caption: 'Huda · Sewing · Riyadh' },
  { img: '/images/photography.jpg', word: 'photography', caption: 'Sara · Photography · Dubai' },
  { img: '/images/pottery.jpg', word: 'pottery', caption: 'Noura · Pottery · Riyadh' },
  { img: '/images/calligraphy.jpg', word: 'calligraphy', caption: 'Omar · Calligraphy · Jeddah' },
  { img: '/images/woodwork.jpg', word: 'woodwork', caption: 'Khalid · Woodwork · Dammam' },
]

export default function HeroSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrent((current + 1) % slides.length)
    }, 4500)
    return () => clearTimeout(timer)
  }, [current])

  return (
    <section className="relative h-[560px] overflow-hidden bg-ink">
      {slides.map((s, i) => (
        <img
          key={s.img}
          src={s.img}
          alt={s.word}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />

      <div className="absolute left-6 right-6 top-1/2 max-w-xl -translate-y-1/2 text-white md:left-16">
        <p className="mb-5 text-xs font-medium tracking-[0.24em] text-blush">
          CRAFTS · HOBBIES · REAL TEACHERS
        </p>
        <h1 className="text-4xl font-light leading-tight md:text-6xl">
          Find your <br />
          <span className="text-gold">{slides[current].word}</span> teacher.
        </h1>

        <Link
          to="/find-my-hobby"
          className="mt-8 flex max-w-md items-center justify-between rounded-full bg-white py-2 pl-5 pr-2 text-sm"
        >
          <span className="text-muted">✦ Describe a hobby you'd enjoy…</span>
          <span className="rounded-full bg-clay px-4 py-3 text-xs font-medium tracking-widest text-white">
            FIND MY HOBBY
          </span>
        </Link>
        <Link to="/browse" className="mt-4 inline-block text-sm font-medium underline">
          Browse all teachers →
        </Link>
      </div>

      <div className="absolute bottom-7 left-6 flex gap-2 md:left-16">
        {slides.map((s, i) => (
          <button
            key={s.word}
            onClick={() => setCurrent(i)}
            className={`h-1 w-8 rounded ${i === current ? 'bg-white' : 'bg-white/35'}`}
          />
        ))}
      </div>

      <p className="absolute bottom-6 right-6 hidden rounded-full bg-black/45 px-4 py-2 text-xs text-white md:block">
        {slides[current].caption}
      </p>
    </section>
  )
}