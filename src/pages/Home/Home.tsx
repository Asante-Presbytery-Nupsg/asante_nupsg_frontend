import GetStarted from "./partials/GetStarted";
import HeroSection from "./partials/HeroSection";
import HowItWorksSection from "./partials/HowItWorks";
import RegisterInfoSection from "./partials/RegisterInfoSection";

const Home = () => {
  return (
    <div className="font-body">
      <HeroSection />
      <RegisterInfoSection />
      <HowItWorksSection />
      <GetStarted />
    </div>
  );
};

export default Home;
