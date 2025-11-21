import { Link } from "react-router-dom";
import img1 from "../../../assets/Rectangle 1.svg";
import img2 from "../../../assets/Rectangle 2.svg";
import img3 from "../../../assets/Rectangle 5.svg";

const HeroSection = () => {
  return (
    <div className="w-full bg-slate-50 min-h-screen overflow-hidden">
      {/* inner container */}
      <div className="w-full md:w-[70%] lg:w-[55%] mx-auto h-full px-4">
        {/* header text */}
        <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[75px] leading-tight text-blue-900 font-semibold text-center pt-12 pb-4">
          <p>
            <span>Welcome to the NUPS-G</span>
          </p>
          <p>
            <span>Freshers' Registration Portal</span>
          </p>
        </div>

        {/* sub text */}
        <div className="text-center text-base sm:text-lg md:text-xl pt-4 text-slate-500 px-2">
          <p>
            Are you a new student entering a tertiary institution this academic
            year?
          </p>
          <p>
            Welcome to the National Union of Presbyterian Students-Ghana
            (NUPS-G)!
          </p>
        </div>

        {/* button + images */}
        <div className="w-full flex flex-col items-center py-6">
          {/* button */}
          <div className="pt-8">
            <Link to="/formone">
              <button className="bg-blue-700 py-3 sm:py-4 md:py-6 px-6 sm:px-8 md:px-12 text-lg sm:text-xl md:text-2xl text-white rounded-3xl">
                Register Now
              </button>
            </Link>
          </div>

          {/* images */}
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-end gap-4 mt-8">
            <div className="w-full sm:w-1/3">
              <img
                src={img1}
                alt="a lady"
                className="w-full h-auto rounded-xl object-cover"
              />
            </div>
            <div className="w-full sm:w-1/3">
              <img
                src={img2}
                alt="student"
                className="w-full h-auto rounded-xl object-cover"
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
