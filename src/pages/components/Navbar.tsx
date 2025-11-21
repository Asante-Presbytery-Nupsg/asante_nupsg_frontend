import { useState, useRef, useEffect } from "react";
import logo from "../../assets/NUPSGLOGO.svg";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  // ref for the dropdown container
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="w-full bg-slate-50 h-[12vh] flex items-center">
        <div className="w-[90%] md:w-[70%] mx-auto flex justify-between items-center">
          {/* Logo with controlled responsive sizing */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-10 sm:w-12 md:w-14 lg:w-16 object-contain"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-8 py-3 border border-blue-900 text-blue-900 rounded-2xl">
              About Us
            </button>

            <button className="px-8 py-3 bg-blue-900 text-white rounded-2xl">
              Our socials
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setOpen((prev) => !prev)}>
              <div className="space-y-1">
                <div className="w-6 h-1 bg-blue-900"></div>
                <div className="w-6 h-1 bg-blue-900"></div>
                <div className="w-6 h-1 bg-blue-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div
          ref={menuRef}
          className="md:hidden w-full bg-slate-50 px-6 pb-4 space-y-3 shadow-sm"
        >
          <Link to="https://nupsgknust.org/about">
            <button className="w-full px-6 py-3 border border-blue-900 text-blue-900 rounded-2xl">
              About Us
            </button>
          </Link>

          <button className="w-full px-6 py-3 bg-blue-900 text-white rounded-2xl">
            Our socials
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
