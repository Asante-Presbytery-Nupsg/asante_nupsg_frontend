import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from "../assets/NUPSGLOGO.svg";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex flex-col bg-[#C6CDD9] text-gray-700 px-6 md:px-20 pt-20 pb-10 overflow-hidden">
      {/* Top section: Logo, Links, Socials */}
      <div className="w-full md:w-[80%] lg:w-[75%] mx-auto relative z-10 flex flex-col md:flex-row md:justify-between gap-10 mb-10">
        {/* Logo + Name */}
        <div className="flex md:w-[35%] items-center gap-4">
          <div className="">
            <img
              src={logo}
              alt="NUPS-G Logo"
              className="object-cover w-fit md:w-20"
            />
          </div>
          <div className="max-w-[250px]">
            <h3 className="text-lg sm:text-xl leading-snug">
              National Union of Presbyterian Students – Ghana
            </h3>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Reach us</h4>
          <p className="text-sm sm:text-base">Kumasi, Ghana</p>
          <p className="text-sm sm:text-base">Email: info@nupsg.org</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg sm:text-xl font-semibold mb-2">Quick links</h4>
          <ul className="text-sm sm:text-base mb-4">
            <li>
              <a href="/about" className="hover:underline">
                About us
              </a>
            </li>
          </ul>
        </div>

        {/* Social icons */}
        <div className="flex gap-4 text-white text-xl">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="bg-[#242626] w-[35px] h-[35px] flex items-center justify-center rounded-full"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://linkedin.com"
            aria-label="LinkedIn"
            className="bg-[#242626] w-[35px] h-[35px] flex items-center justify-center rounded-full"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://youtube.com"
            aria-label="YouTube"
            className="bg-[#242626] w-[35px] h-[35px] flex items-center justify-center rounded-full"
          >
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Middle Gradient Text */}
      <div className="flex justify-center items-center my-10 pointer-events-none relative z-0">
        <h1 className="text-[5rem] sm:text-[8rem] md:text-[12rem] lg:text-[20rem] font-extrabold text-transparent bg-gradient-to-b from-[#002A6E] to-[#C6CDD9] bg-clip-text opacity-30 leading-none select-none">
          NUPS-G
        </h1>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full text-center text-sm sm:text-base text-gray-600 relative z-10">
        © {currentYear} NUPS-G All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
