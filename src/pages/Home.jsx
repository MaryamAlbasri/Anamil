import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSlideshow from '../components/HeroSlideshow'
import HowItWorks from '../components/HowItWorks'
import HobbyBento from '../components/HobbyBento'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlideshow />
      <HowItWorks />
      <HobbyBento />
      <Footer />
    </>
  )
}