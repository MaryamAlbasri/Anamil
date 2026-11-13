import { Link } from 'react-router-dom'

const featured = [
  { id: 'pottery', name: 'Pottery', info: '24 teachers · from 120 SAR', img: '/images/pottery.png', size: 'md:col-span-3 md:row-span-2', big: true },
  { id: 'weaving', name: 'Weaving & textiles', info: '18 teachers · from 150 SAR', img: '/images/weaving.png', size: 'md:col-span-3' },
  { id: 'sewing', name: 'Sewing', info: '21 teachers · from 100 SAR', img: '/images/sewing.png', size: 'md:col-span-3' },
  { id: 'calligraphy', name: 'Calligraphy', info: '12 teachers', img: '/images/calligraphy.png', size: 'md:col-span-2' },
  { id: 'woodwork', name: 'Woodwork', info: '9 teachers', img: '/images/woodwork.png', size: 'md:col-span-2' },
  { id: 'photography', name: 'Photography', info: '27 teachers', img: '/images/photography.png', size: 'md:col-span-2' },
]

export default function HobbyBento() {
  return (
    <section className="bg-cream px-6 py-14 md:px-16 md:py-20">
    <div className="hidden justify-center px-6 pb-2 md:flex md:px-10">
            <h2 className="text-3xl font-light text-ink md:text-5xl">
          Pick a hobby, <span className="font-serif italic">any</span> hobby.
        </h2>
        <Link to="/browse" className="hidden text-sm font-medium underline md:block">
          See all hobbies →
        </Link>
      </div>

      <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:mx-0 md:mt-10 md:grid md:auto-rows-[260px] md:grid-cols-6 md:gap-6 md:overflow-visible md:px-0 md:pb-0">
        {featured.map((h) => (
          <Link
            key={h.id}
            to={`/browse?craft=${h.id}`}
            className={`group relative h-72 w-64 shrink-0 snap-start overflow-hidden rounded-3xl md:h-auto md:w-auto ${h.size}`}
          >
            <img
              src={h.img}
              alt={h.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {h.big && (
              <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-ink md:left-6 md:top-6 md:px-4 md:py-2">
                ✦ Most popular
              </span>
            )}

            <div className="absolute bottom-5 left-5 text-white md:bottom-6 md:left-6">
              <p className={h.big ? 'text-2xl font-light md:text-4xl' : 'text-xl font-medium md:text-2xl'}>{h.name}</p>
              <p className="text-sm opacity-85">{h.info}</p>
            </div>

            <span className="absolute bottom-6 right-6 hidden h-11 w-11 items-center justify-center rounded-full bg-white md:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2A211C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </Link>
        ))}
      </div>

      <Link to="/browse" className="mt-4 inline-block text-sm font-medium underline md:hidden">
        See all hobbies →
      </Link>
    </section>
  )
}