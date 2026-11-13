import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSlideshow from '../components/HeroSlideshow'
import HobbyBento from '../components/HobbyBento'
import TeachersRow from '../components/TeachersRow'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSlideshow />
      <HobbyBento />
      <TeachersRow />
      <Footer />
    </>
  )
}