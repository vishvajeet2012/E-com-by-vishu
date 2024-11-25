import React, { useState, useEffect } from "react";
import Logo from "../Frontend/media/home/logo.png";

const AppBarr = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-[#f8942b] shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div>
          <img style={{width:"100px" , height:"70px"}} src={Logo}  alt="Logo" className="h-8" />
        </div>

        {/* Menu Items */}
        <ul className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-6 text-black font-semibold text-xl absolute md:relative top-full left-0 w-full md:w-auto ${
            isScrolled ? "bg-[#f8942b]" : "bg-transparent"
          } md:bg-transparent md:flex-row p-4 md:p-0 shadow-lg md:shadow-none mx-auto`}
        >
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <li className="hover:text-gray-300 cursor-pointer">About</li>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>

        {/* Search Bar */}
        <div className={`flex items-center rounded-md px-3 py-1 w-full md:w-1/3 shadow-sm ${ isScrolled ? "bg-[#f8942b]" : "bg-transparent"}`} >
          <input
            type="text"   //#f1632c dark colro 
             placeholder="Search..." className="flex-grow  outline-none text-gray-700 bg-transparent placeholder-gray-200" />
          <button className="text-gray-200 hover:text-gray-700">🔍</button>
        </div>
      </div>
    </nav>
  );
};

export default AppBarr;
