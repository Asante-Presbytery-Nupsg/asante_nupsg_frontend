const GetStarted = () => {
  return (
    <div className="bg-slate-300 w-full py-20 md:py-28">
      {/* inner container */}
      <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto flex items-center justify-center">
        {/* wrapper */}
        <div className="flex flex-col items-center justify-center gap-6">
          {/* text */}
          <div className="text-center">
            {/* header */}
            <p className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#003995]">
              Get Started Today!
            </p>

            <div className="pt-4 text-base sm:text-lg md:text-xl text-[#3E5376] space-y-2">
              <p>Join thousands of NUPS-G members across Ghana.</p>
              <p>Click below to begin your journey!</p>
            </div>
          </div>

          {/* button */}
          <div>
            <button className="bg-[#C71B00] py-3 sm:py-4 md:py-5 px-6 sm:px-8 md:px-10 text-lg sm:text-xl md:text-2xl text-white rounded-xl transition-all duration-300 hover:bg-red-700">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
