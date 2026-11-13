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
    <section className="bg-cream px-6 py-20 md:px-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-light text-ink md:text-5xl">
          Pick a hobby, <span className="font-serif italic">any</span> hobby.
        </h2>
        <Link to="/browse" className="hidden text-sm font-medium underline md:block">
          See all hobbies →
        </Link>
      </div>

      <div className="mt-10 grid auto-rows-[260px] gap-6 md:grid-cols-6">
        {featured.map((h) => (
          <Link
            key={h.id}
            to={`/browse?craft=${h.id}`}
            className={`group relative overflow-hidden rounded-3xl ${h.size}`}
          >
            <img
              src={h.img}
              alt={h.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            {h.big && (
              <span className="absolute left-6 top-6 rounded-full bg-white px-4 py-2 text-xs font-medium text-ink">
                ✦ Most popular this month
              </span>
            )}

            <div className="absolute bottom-6 left-6 text-white">
              <p className={h.big ? 'text-4xl font-light' : 'text-2xl font-medium'}>{h.name}</p>
              <p className="text-sm opacity-85">{h.info}</p>
            </div>
            <span className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink">
              ↗
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}        