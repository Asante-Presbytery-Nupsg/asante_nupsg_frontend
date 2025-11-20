import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import FormOne from "../Forms/FormOne"
import GetStarted from "./components/GetStarted"
import HeroSection from "./components/HeroSection"
import HowItWorksSection from "./components/HowItWorks"
import RegisterInfoSection from "./components/RegisterInfoSection"


const Home = () => {
  return (
    <div className="font-body">
      <Navbar/>
          <HeroSection />
      <RegisterInfoSection />
      <HowItWorksSection />
      <GetStarted />
      {/* forms */}
      <div className="">
        <FormOne/>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
