const HowItWorksSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 pb-12 flex items-center">
        {/* inner container */}
        <div className="w-[70%] mx-auto h-full flex items-center">
          {/* left side text */}
          <div className="w-[50%]">
            <h2 className="text-6xl text-blue-900 font-semibold">
              How It Works
            </h2>
          </div>

          {/* right side steps */}
          <div className="w-[50%] flex flex-col gap-6">
            {/* step 1 */}
            <div>
              <p className="text-xl font-semibold text-blue-900">
                1. Fill the Registration Form
              </p>
              <p className="text-slate-500">
                Provide your basic details and school.
              </p>
            </div>

            {/* step 2 */}
            <div>
              <p className="text-xl font-semibold text-blue-900">
                2. Get Connected
              </p>
              <p className="text-slate-500">
                We’ll link you up with your local NUPS-G chapter.
              </p>
            </div>

            {/* step 3 */}
            <div>
              <p className="text-xl font-semibold text-blue-900">
                3. Stay Informed
              </p>
              <p className="text-slate-500">
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
