import { Link } from 'react-router-dom'
import craftspeople from '../data/craftspeople'

export default function TeachersRow() {
  const teachers = craftspeople.slice(0, 4)

  return (
    <section className="px-6 py-14 md:px-16 md:py-20">
      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-light text-ink md:text-5xl">
          Meet the <span className="font-serif italic">teachers</span>
        </h2>
        <Link to="/browse" className="hidden text-sm font-medium underline md:block">See all teachers →</Link>
      </div>

      <div className="-mx-6 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:mx-0 lg:mt-10 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0">
        {teachers.map((t) => (
          <Link key={t.id} to={`/craftspeople/${t.id}`} className="group w-56 shrink-0 snap-start lg:w-auto">
            <div className="rounded-t-full rounded-b-2xl p-2.5" style={{ backgroundColor: t.bg }}>
              <img src={t.img} alt={t.name}
                className="h-52 w-full rounded-t-full rounded-b-xl object-cover transition group-hover:opacity-90 lg:h-72" />
            </div>
            <p className="mt-3 font-medium text-ink lg:text-lg">{t.name}</p>
            <p className="text-sm text-muted">{t.craftName} · {t.city}</p>
            <div className="mt-1 flex justify-between text-sm">
              <span className="font-medium text-clay">★ {t.rating}</span>
              <span className="text-ink">From {t.priceFrom} SAR</span>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/browse" className="mt-4 inline-block text-sm font-medium underline md:hidden">See all teachers →</Link>
    </section>
  )
}