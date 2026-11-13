import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'


const team = [
  { name: 'Maryam Albasri', role: 'Product & Design Lead' },
  { name: 'Walaa Almarzooq', role: 'Teacher Community Manager' },
  { name: 'Hawra Alyousif', role: 'Learner Experience Manager' },
]
export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <section className="grid items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-16">
          <div>
            <h1 className="text-4xl font-light text-ink md:text-5xl">
              About <span className="font-serif italic">Anamil</span>
            </h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              Anamil connects people who want to learn a craft or hobby with the teachers who love it.
              We help teachers reach new learners and sell their work, and we help beginners find the
              right hobby, the right teacher and the right tools to start.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/find-my-hobby" className="rounded-full bg-clay px-6 py-3 text-sm font-medium text-white">
                ✦ Find my hobby with AI
              </Link>
              <Link to="/signup" className="rounded-full border border-ink px-6 py-3 text-sm font-medium text-ink">
                Join as a teacher
              </Link>
            </div>
          </div>
          <img src="/images/logo.png" alt="Anamil logo" className="mx-auto w-full max-w-sm" />
        </section>

        <section className="grid gap-6 bg-cream px-6 py-16 md:grid-cols-2 md:px-16">
          <div className="rounded-2xl bg-white p-8">
            <h2 className="text-xl font-medium text-ink">Our mission</h2>
            <p className="mt-3 text-muted">
              Make crafts and creative hobbies easy to discover, learn and support, starting with local teachers.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-8">
            <h2 className="text-xl font-medium text-ink">Our vision</h2>
            <p className="mt-3 text-muted">
              A place where every teacher has an online home and every beginner knows exactly how to start.
            </p>
          </div>
        </section>

        <section className="px-6 py-16 md:px-16">
          <h2 className="text-3xl font-light text-ink">Our team</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.name} className="rounded-2xl border border-cream p-6 text-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blush text-2xl text-clay">
                  {m.name[0]}
                </div>
                <p className="mt-4 font-medium text-ink">{m.name}</p>
                <p className="text-sm text-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="px-6 pb-16 md:px-16">
          <div className="flex flex-col gap-4 rounded-2xl bg-cream p-8 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-medium text-ink">Questions or ideas?</h2>
              <p className="mt-1 text-muted">Email us at hello@anamil.sa and we'll reply within 2 working days.</p>
            </div>
            <a href="mailto:hello@anamil.sa" className="rounded-full border border-ink px-6 py-3 text-center text-sm font-medium">
              Contact us
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}