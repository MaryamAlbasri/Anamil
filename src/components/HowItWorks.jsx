const steps = [
  {
    num: '01',
    title: 'Describe what you enjoy',
    text: 'Write it in your own words. Our AI suggests the hobbies that fit you best.',
    bg: 'bg-[#F6DCCB]',
    preview: (
      <>
        <div className="rounded-full bg-white px-4 py-3 text-sm text-muted shadow">
          <span className="text-clay">✦</span> Something calm for my weekends
        </div>
        <div className="mt-3 flex gap-2 text-xs font-medium">
          <span className="rounded-full bg-clay px-3 py-1.5 text-white">Pottery</span>
          <span className="rounded-full bg-white px-3 py-1.5">Calligraphy</span>
          <span className="rounded-full bg-white px-3 py-1.5">Weaving</span>
        </div>
      </>
    ),
  },
  {
    num: '02',
    title: 'Meet a teacher near you',
    text: 'Compare verified teachers by distance, price and reviews, then book in a few taps.',
    bg: 'bg-[#E4E1F0]',
    preview: (
      <div className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow">
        <img src="/images/pottery.jpg" alt="" className="h-12 w-12 rounded-full object-cover" />
        <div className="flex-1 text-sm">
          <p className="font-medium">Noura Alqahtani</p>
          <p className="text-xs text-muted">Pottery · 2 km away</p>
          <p className="text-xs text-clay">★ 4.8 (32 reviews)</p>
        </div>
        <span className="rounded-xl bg-ink px-3 py-2 text-xs text-white">Book</span>
      </div>
    ),
  },
  {
    num: '03',
    title: 'Get your starter list',
    text: 'Know exactly what to buy before your first lesson. No wasted purchases.',
    bg: 'bg-[#DCE6D4]',
    preview: (
      <div className="rounded-2xl bg-white p-4 text-sm shadow">
        <p className="mb-2 text-xs font-medium text-muted">Your starter list · Pottery</p>
        <p className="flex justify-between"><span>✓ Clay, 2 kg</span><span className="text-muted">35 SAR</span></p>
        <p className="flex justify-between"><span>✓ Sponge and tool set</span><span className="text-muted">25 SAR</span></p>
        <p className="flex justify-between text-muted"><span>○ Apron (optional)</span><span>40 SAR</span></p>
      </div>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section className="px-6 py-20 md:px-16">
      <p className="text-xs font-medium tracking-[0.24em] text-clay">HOW ANAMIL WORKS</p>
      <h2 className="mt-4 text-3xl font-light leading-tight text-ink md:text-5xl">
        From <span className="font-serif italic">curious</span> to your <br className="hidden md:block" />
        first lesson in three steps
      </h2>

      <div className="mt-12 grid gap-10 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num}>
            <p className="font-serif text-6xl italic text-clay">{step.num}</p>
            <h3 className="mt-3 text-xl font-medium text-ink">{step.title}</h3>
            <p className="mt-2 text-muted">{step.text}</p>
            <div className={`mt-5 flex h-48 flex-col justify-center rounded-3xl p-5 ${step.bg}`}>
              {step.preview}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}