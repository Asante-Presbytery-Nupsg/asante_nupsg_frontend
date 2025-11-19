
const HeroSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50  h-[105vh]">
        {/* inner container */}
        <div className="w-[70%] mx-auto  h-full">
          {/* header text */}
          <div className="text-8xl text-blue-900 font-semibold text-center pt-12 pb-4">
            <p>
              <span>Welcome to the NUPS-G</span>
            </p>
            <p>
              <span>Freshers' Registeration Portal</span>
            </p>
          </div>

          {/* sub text */}
          <div className="text-center text-xl pt-4 text-slate-500">
            <p>
              Are you a new student entering a tertiary institution this
              academic year?
            </p>
            <p>
              Welcome to the National Union of Presbyterian
              Students-Ghana(NUPS-G)!
            </p>
          </div>

          {/* images */}
          <div className="w-full flex justify-center flex-col py-2    items-center">
            {/* button */}
            <div className=" pt-12">
              <button className="bg-blue-700 p-4 text-white rounded-2xl">
                Register Now
              </button>
            </div>
            {/* images */}
            <div className="w-full flex justify-between items-end gap-2 ">
              {/* image-1 */}
              <div className="w-[33%] h-[55vh] rounded-[85px] bg-slate-300"></div>
              {/* image-2 */}
              <div className="w-[33%] h-[50vh] rounded-[85px] bg-slate-300"></div>
              {/* image-3 */}
              <div className="w-[33%] h-[55vh] rounded-[85px] bg-slate-300"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection
