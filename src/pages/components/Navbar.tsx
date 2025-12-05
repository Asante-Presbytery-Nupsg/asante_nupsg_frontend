import { useState, useRef, useEffect } from "react";
import logo from "../../assets/NUPSGLOGO.svg";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  // refs for the dropdown container and hamburger button
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Close dropdown when clicking outside, excluding the button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="w-full bg-slate-50 py-4 border-b flex items-center">
        <div className="w-[90%] md:w-[70%] mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className="w-8 sm:w-10 object-contain"
              />
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 border border-blue-900 text-blue-900 rounded-2xl">
              About Us
            </button>
            <button className="px-6 py-2.5 bg-blue-900 text-white rounded-2xl">
              Our socials
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button ref={buttonRef} onClick={() => setOpen((prev) => !prev)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2 } }}
            exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
            ref={menuRef}
            className="md:hidden w-full bg-slate-50/20 backdrop-blur-md p-8 space-y-3 shadow-sm absolute top-16 left-0 z-50"
          >
            <Link
              to="https://nupsgknust.org/about"
              className="w-full px-6 py-3 border border-blue-900 text-blue-900 rounded-2xl inline-block text-center"
            >
              About Us
            </Link>

            <button className="w-full px-6 py-3 bg-blue-900 text-white rounded-2xl">
              Our socials
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
