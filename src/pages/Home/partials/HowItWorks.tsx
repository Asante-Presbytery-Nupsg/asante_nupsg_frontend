const HowItWorksSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 pb-12 flex items-center">
        {/* inner container */}
        <div className="w-[90%] md:w-[70%] lg:w-[60%] mx-auto h-full flex flex-col lg:flex-row items-start md:items-center gap-10 lg:gap-0">
          {/* left side text */}
          <div className="w-full lg:w-[50%]">
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-blue-900 font-semibold">
              How It Works
            </h2>
          </div>

          {/* right side steps */}
          <div className="w-full lg:w-[50%] flex flex-col gap-6">
            {/* step 1 */}
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#52627D]">
                1. Fill the Registration Form
              </p>
              <p className="text-[#52627D] text-lg md:text-2xl font-light">
                Provide your basic details and school.
              </p>
            </div>

            {/* step 2 */}
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#52627D]">
                2. Get Connected
              </p>
              <p className="text-[#52627D] text-lg md:text-2xl font-light">
                We’ll link you up with your local NUPS-G chapter.
              </p>
            </div>

            {/* step 3 */}
            <div>
              <p className="text-2xl md:text-3xl font-semibold text-[#52627D]">
                3. Stay Informed
              </p>
              <p className="text-[#52627D] text-lg md:text-2xl font-light">
                Receive updates, orientation info, and event notices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorksSection;
