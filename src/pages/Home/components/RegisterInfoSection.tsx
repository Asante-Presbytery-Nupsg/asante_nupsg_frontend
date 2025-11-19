const RegisterInfoSection = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 py-20">
        {/* inner container */}
        <div className="w-[70%] mx-auto flex items-center justify-between gap-10">
         {/* images container */}
      <div className="flex items-center justify-start gap-4 relative">
        
        {/* left image */}
        <div className="
          w-[160px] h-[200px] 
          bg-slate-300 rounded-3xl 
          rotate-[-12deg] 
          overflow-hidden
          shadow-md
        ">
          {/* placeholder div */}
          <div className="w-full h-full bg-slate-300"></div>
        </div>

        {/* right image */}
        <div className="
          w-[160px] h-[200px] 
          bg-slate-300 rounded-3xl 
          rotate-[10deg] 
          -ml-10 
          overflow-hidden
          shadow-md
        ">
          {/* placeholder div */}
          <div className="w-full h-full bg-slate-300"></div>
        </div>

      </div>
         

          {/* text content */}
          <div className="w-[60%]">
            <p className="text-slate-600 text-lg leading-7">
              This platform has been designed to help you connect with the union
              on your campus and become part of a growing family of believers
              who are passionate about spiritual growth, service, and
              leadership.
            </p>
          </div>
        </div>

        {/* Who Can Register Section */}
        <div className="w-full bg-blue-900 text-white mt-20 py-16">
          <div className="w-[70%] mx-auto text-center">
            <p className="text-4xl font-semibold pb-6">Who Can Register?</p>

            <p className="text-lg leading-7">
              All freshers entering tertiary institutions in Ghana –
              Universities, Colleges of Education, Nursing and Technical
              Institutions – who wish to be part of NUPS-G.
            </p>

            <p className="text-lg leading-7 pt-3">
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
