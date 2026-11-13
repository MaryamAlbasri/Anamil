import { Link } from 'react-router-dom'
import craftspeople from '../data/craftspeople'

export default function TeachersRow() {
  const teachers = craftspeople.slice(0, 4)

  return (
    <section className="px-6 py-20 md:px-16">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-light text-ink md:text-5xl">
          Meet the <span className="font-serif italic">teachers</span>
        </h2>
        <Link to="/browse" className="hidden text-sm font-medium underline md:block">
          See all teachers →
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teachers.map((t) => (
          <Link key={t.id} to={`/craftspeople/${t.id}`} className="group">
            <div className="rounded-t-full rounded-b-2xl p-3" style={{ backgroundColor: t.bg }}>
              <img src={t.img} alt={t.name}
                className="h-72 w-full rounded-t-full rounded-b-xl object-cover transition group-hover:opacity-90" />
            </div>
            <p className="mt-4 text-lg font-medium text-ink">{t.name}</p>
            <p className="text-muted">{t.craftName} · {t.city}</p>
            <div className="mt-1 flex justify-between">
              <span className="font-medium text-clay">★ {t.rating}</span>
              <span className="text-ink">From {t.priceFrom} SAR</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}