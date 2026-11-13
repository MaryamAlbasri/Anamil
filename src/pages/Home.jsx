import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSlideshow from '../components/HeroSlideshow'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlideshow className="font-serif text-5xl text-clay p-10">Home page</HeroSlideshow>
      <Footer />
    </>
  )
}
