import React from "react";
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import logo from '../../assets/NUPSGLOGOFooter.svg'

const Footer: React.FC = () => {
  return (
    <footer className="relative flex justify-center h-[55vh] bg-[#C6CDD9] text-gray-700 pt-20 pb-6 px-6 md:px-20 overflow-hidden">
      {/* inner */}
      <div className="w-[50%]">
        {/* Main content */}
        <div className="relative z-10  mx-auto flex justify-between">
          {/* Logo and Name */}
          <div className="flex w-[35%] items-start gap-4">
            <div className="w-1/2">
              <img src={logo} alt="" />
            </div>
            <div>
              <h3 className="text-2xl  leading-snug">
                National Union of Presbyterian Students – Ghana
              </h3>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Reach us</h4>
            <p className="text-sm">Kumasi, Ghana</p>
            <p className="text-sm">Email: info@nupsg.org</p>
          </div>

          {/* Quick Links and Socials */}
          <div>
            <h4 className="text-xl font-semibold mb-2">Quick links</h4>
            <ul className="text-sm  mb-4">
              <li>
                <a href="/about" className="hover:underline">
                  About us
                </a>
              </li>
            </ul>
          </div>
          {/* socials */}
          <div className="flex gap-4 text-[#242626] text-xl">
            <a href="https://facebook.com" aria-label="Facebook" className="">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://youtube.com" aria-label="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* gradient text */}
        <div className="absolute inset-0 flex justify-center items-end pointer-events-none">
          <h1 className="text-[8rem] md:text-[270px] font-extrabold text-transparent bg-gradient-to-b from-[#002A6E] to-[#C6CDD9] bg-clip-text opacity-30 leading-none select-none">
            NUPS-G
          </h1>
        </div>

        {/* Copyright */}
        <div className="absolute  text-center block bottom-1 mt-10 w-[50%] text-sm text-gray-500">
          <div className="">© 2025 NUPS-G All Rights Reserved.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
