import React from "react";
// import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-100 text-gray-700 pt-20 pb-6 px-6 md:px-20 overflow-hidden">
      {/* Gradient NUPS-G background text */}
      <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
        <h1 className="text-[8rem] md:text-[12rem] font-extrabold text-transparent bg-gradient-to-t from-gray-300 to-transparent bg-clip-text opacity-30 leading-none select-none">
          NUPS-G
        </h1>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo and Name */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gray-400 rounded-md" />
          <div>
            <h3 className="text-lg font-semibold leading-snug">
              National Union of Presbyterian Students – Ghana
            </h3>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold mb-2">Reach us</h4>
          <p className="text-sm">Kumasi, Ghana</p>
          <p className="text-sm">Email: info@nupsg.org</p>
        </div>

        {/* Quick Links and Socials */}
        <div>
          <h4 className="text-md font-semibold mb-2">Quick links</h4>
          <ul className="text-sm  mb-4">
            <li>
              <a href="/about" className="hover:underline">
                About us
              </a>
            </li>
          </ul>
          <div className="flex gap-4 text-blue-600 text-xl">
            {/* <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube />
            </a> */}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 mt-10 text-center text-sm text-gray-500">
        © 2025 NUPS-G All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
