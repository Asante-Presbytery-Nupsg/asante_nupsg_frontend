import { Link } from "react-router-dom";
import img1 from "../../../assets/Rectangle 1.svg";
import img2 from "../../../assets/Rectangle 2.svg";
import img3 from "../../../assets/Rectangle 5.svg";

const HeroSection = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen overflow-hidden">
      {/* inner container */}
      <div className="w-full md:w-[80%] lg:w-[60%] xl:w-[55%] mx-auto px-4 pb-12">
        {/* header text */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[75px] leading-tight text-blue-900 font-semibold text-center pt-12 pb-6">
          <p>Welcome to the NUPS-G</p>
          <p>Freshers' Registration Portal</p>
        </div>

        {/* sub text */}
        <div className="text-center text-base sm:text-lg md:text-xl pt-2 text-slate-500 px-2 max-w-3xl mx-auto">
          <p>
            Are you a new student entering a tertiary institution this academic
            year?
          </p>
          <p>
            Welcome to the National Union of Presbyterian Students-Ghana
            (NUPS-G)!
          </p>
        </div>

        {/* button + images wrapper */}
        <div className="w-full flex flex-col items-center py-10">
          {/* Register button */}
          <div className="pt-4">
            <Link to="/formone">
              <button className="bg-blue-700 py-3 sm:py-4 md:py-5 px-8 sm:px-10 md:px-14 text-lg sm:text-xl md:text-2xl text-white rounded-3xl transition-all duration-300 hover:bg-blue-800">
                Register Now
              </button>
            </Link>
          </div>

          {/* images */}
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end gap-4 mt-10">
            <div className="w-full sm:w-1/3">
              <img
                src={img1}
                alt="a lady"
                className="w-full h-auto rounded-xl object-cover "
              />
            </div>
            <div className="w-full sm:w-1/3">
              <img
                src={img2}
                alt="student"
                className="w-full h-auto rounded-xl object-cover "
              />
            </div>
            <div className="w-full sm:w-1/3">
              <img
                src={img3}
                alt="group"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
