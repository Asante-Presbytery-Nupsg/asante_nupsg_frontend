import Footer from "../components/Footer"
import HeroSection from "./components/HeroSection"
import WhoCanRegisterSection from "./components/WhoCanRegisterSection"

const Home = () => {
  return (
    <div className="font-body">
          <HeroSection />
      <WhoCanRegisterSection />
      <Footer/>
    </div>
  )
}

export default Home
