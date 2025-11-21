import img1 from "../../../assets/Rectangle 61.svg";
import img2 from "../../../assets/Rectangle 62.svg";

const RegisterInfoSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 py-20">
        {/* inner container */}
        <div className="w-[70%] mx-auto flex items-center justify-between gap-10">
          {/* images container */}
          <div className="flex items-center justify-start relative">
            {/* left image */}
            <div
              className="
          
          
          
          overflow-hidden
          
        "
            >
              {/* placeholder div */}
              <div className="w-full h-full">
                <img src={img2} alt="" />
              </div>
            </div>

            {/* right image */}
            <div
              className="      
          -ml-20 
          overflow-hidden
          
        "
            >
              {/* placeholder div */}
              <div className="w-full h-full">
                <img src={img1} alt="" />
              </div>
            </div>
          </div>

          {/* text content */}
          <div className="w-[50%]">
            <p className="text-slate-600 text-3xl leadin">
              This platform has been designed to help you connect with the union
              on your campus and become part of a growing family of believers
              who are passionate about spiritual growth, service, and
              leadership.
            </p>
          </div>
        </div>

        {/* Who Can Register Section */}
        <div className="w-full bg-blue-900 text-white mt-20 py-16">
          <div className="w-[50%] mx-auto text-center">
            <p className="text-6xl font-semibold text-[#C7DCFF] pb-6">
              Who Can Register?
            </p>

            <p className="text-2xl">
              All freshers entering tertiary institutions in Ghana –
              Universities, Colleges of Education, Nursing and Technical
              Institutions – who wish to be part of NUPS-G.
              Whether you're in KNUST, Legon, UCC, UDS, UEW, UENR, or any other
              institution, this is the starting point of your NUPS-G journey!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterInfoSection;
