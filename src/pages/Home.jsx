import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSlideshow from '../components/HeroSlideshow'
import HowItWorks from '../components/HowItWorks'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlideshow />
      <HowItWorks />
      <Footer />
    </>
  )
}