import GetStarted from "./components/GetStarted"
import HeroSection from "./components/HeroSection"
import HowItWorksSection from "./components/HowItWorks"
import RegisterInfoSection from "./components/RegisterInfoSection"


const Home = () => {
  return (
    <div className="font-body">
          <HeroSection />
      <RegisterInfoSection />
      <HowItWorksSection />
      <GetStarted />
      
    </div>
  )
}

export default Home
