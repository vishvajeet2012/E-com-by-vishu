import React, { useState, useEffect } from "react"; 
import Logo from "../Frontend/media/home/logo.png";
import { Link } from "react-router-dom";

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
          <img style={{ width: "100px", height: "70px" }} src={Logo} alt="Logo" className="h-8" />
        </div>

        {/* Menu Items */}
        <ul
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex space-y-4 md:space-y-0 md:space-x-6 text-black font-semibold text-xl absolute md:relative top-full left-0 w-full md:w-auto ${
            isScrolled ? "bg-[#f8942b]" : "bg-transparent"
          } md:bg-transparent md:flex-row p-4 md:p-0 shadow-lg md:shadow-none mx-auto`}
        >
          <li className="hover:text-gray-300 cursor-pointer">Home</li>
          <Link to="/3123123">
            <li className="hover:text-gray-300 cursor-pointer">Adopt</li>
          </Link>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>

        {/* Profile Picture Section on the Right Side */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <Link to="/3123123">
            <img
              src="https://via.placeholder.com/40"  // Replace with the actual user profile picture URL
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AppBarr;
