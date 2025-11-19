const Navbar = () => {
  return (
    <>
      {/* outer container */}
      <div className="w-full bg-slate-50 h-[12vh] flex items-center">
        {/* inner container */}
        <div className="w-[70%] mx-auto flex justify-between items-center">
          {/* logo (placeholder gray box) */}
          <div className="w-14 h-14 bg-slate-300 rounded-md"></div>

          {/* buttons */}
          <div className="flex items-center gap-4">
            {/* About Us button */}
            <button className="px-6 py-2 border border-blue-900 text-blue-900 rounded-xl">
              About Us
            </button>

            {/* Our Socials button (filled) */}
            <button className="px-6 py-2 bg-blue-900 text-white rounded-xl">
              Our socials
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
