import img1 from "../../../assets/Rectangle 61.svg";
import img2 from "../../../assets/Rectangle 62.svg";

const RegisterInfoSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 py-20 md:py-32">
        {/* inner container */}
        <div className="w-full md:w-[80%] lg:w-[70%] mx-auto flex flex-col md:flex-row items-center justify-between gap-10 px-4">
          {/* images container */}
          <div className="flex items-center justify-center relative w-full md:w-[45%]">
            {/* left image */}
            <div className="w-[60%] sm:w-[55%] md:w-[60%] overflow-hidden">
              <img
                src={img2}
                alt="NUPS-G member"
                className="w-full h-auto rounded-xl object-cover shadow-md"
              />
            </div>

            {/* right image (overlapping on desktop, stacked on mobile) */}
            <div className="w-[60%] sm:w-[55%] md:w-[60%] md:-ml-20 ml-4 overflow-hidden">
              <img
                src={img1}
                alt="NUPS-G student"
                className="w-full h-auto rounded-xl object-cover shadow-md"
              />
            </div>
          </div>

          {/* text content */}
          <div className="w-full md:w-[50%]">
            <p className="text-slate-600 text-xl sm:text-2xl md:text-3xl leading-tight tracking-wide">
              This platform has been designed to help you connect with the union
              on your campus and become part of a growing family of believers
              who are passionate about spiritual growth, service, and
              leadership.
            </p>
          </div>
        </div>

        {/* Who Can Register Section */}
        <div className="w-full bg-blue-900 text-white mt-16 md:mt-20 py-12 md:py-20">
          <div className="w-full md:w-[70%] lg:w-[50%] mx-auto text-center px-4">
            <p className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#C7DCFF] pb-6">
              Who Can Register?
            </p>

            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed">
              All freshers entering tertiary institutions in Ghana –
              Universities, Colleges of Education, Nursing and Technical
              Institutions – who wish to be part of NUPS-G. Whether you're in
              KNUST, Legon, UCC, UDS, UEW, UENR, or any other institution, this
              is the starting point of your NUPS-G journey!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterInfoSection;
