import React, { useState } from "react";
import dogPic from "./media/colorful-dog-painting-by-person_608068-19143.avif";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState();
  const [email, setEmail] = useState()
 

  function handleInputValue(e){
    setEmail(e.target.value)
  }
  const handleInputChange = (e) => {
  
    setFormData( e.target.value)
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(  email , formData); 
  };

  return (
    <div className="mt-20 flex flex-col md:flex-row h-[70vh] gap-4 md:gap-0">
      {/* Left Side - Image */}
      <div className="md:w-1/2 h-1/2 md:h-full">
        <img
          src={dogPic}
          alt="Login Visual"
          className="w-full h-full object-cover rounded-l-lg"
          loading="lazy"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4 md:py-0">
        <form
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
            Login
          </h2>

          {/* Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e)=>handleInputValue(e)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-all"
          >
            Login
          </button>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-medium hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
