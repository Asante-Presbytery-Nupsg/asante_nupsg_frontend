const GetStarted= () => {
  return (
    <>
      <div className="bg-slate-300 w-full h-[65vh]">
        {/* inner container */}
        <div className="w-[70%] mx-auto flex items-center justify-center pt-24">
          {/* wrapper */}
          <div className="flex items-center justify-center flex-col">
            {/* text */}
            <div className="">
              {/* header */}
              <div className="text-center ">
                <p className="font-semibold text-6xl text-[#003995]">
                  Get Started Today!
                </p>
              </div>
              <div className="text-center pt-4 text-xl text-[#3E5376]">
                <p>Join thousands of NUPS-G members across Ghana.</p>
                <p>Click below to begin your journey!</p>
              </div>
            </div>
            {/* button */}
            <div className="pt-8">
              <button className="bg-[#C71B00] py-4 px-8 text-white rounded-xl">Register Now</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GetStarted;
