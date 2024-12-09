import React, { useState, useEffect, useContext } from "react"; 
import Logo from "../Frontend/media/home/logo.png";
import { Link } from "react-router-dom";
import { DataContext } from "./ContextApi";

const AppBarr = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userHai } = useContext(DataContext);  
  // const idUser = userHai?.data?._id;
  const idUser = localStorage.getItem("userId");
  const [profileDATA, setAppData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/userInfo/${idUser}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setAppData(data.data.profilePicture); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (idUser) {
      fetchUserData();
    }
  }, );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();  // Clear all data in local storage
    window.location.href = "/";  // Redirect to the root path
  };

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
          <Link to="/userInfo">
            <li className="hover:text-gray-300 cursor-pointer">Adopt</li>
          </Link>
          <li className="hover:text-gray-300 cursor-pointer">Services</li>
          <li className="hover:text-gray-300 cursor-pointer">Contact</li>
        </ul>
              <div className=" flex  gap-3	">
        {/* Profile Picture Section on the Right Side */}
        <div className="flex items-center space-x-4">
          {/* Profile Picture */}
          <Link to="/userInfo">
            <img
              src={profileDATA}  // Replace with the actual user profile picture URL
              alt="Profile"
              className="rounded-full w-10 h-10 cursor-pointer"
            />
          </Link>
        </div>

        {/* Clear Local Storage Button */}
        <button 
          onClick={clearLocalStorage}
          className="bg-red-500 text-white py-1 px-1 rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          logout
        </button>
        </div>
      </div>
    </nav>
  );
};

export default AppBarr;
