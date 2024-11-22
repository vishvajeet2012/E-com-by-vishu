import React, { useState, useEffect } from "react";
import dogPic from "./media/petRED.jpg";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [formData, setFormData] = useState(""); // for password
  const [email, setEmail] = useState(""); 
  const [fadeClass, setFadeClass] = useState("fade-in");
  const navigate = useNavigate();

  useEffect(() => {
    setFadeClass("fade-in-active");
  }, []);

  const handleInputValue = (e) => {
    setEmail(e.target.value);
  };

  // Handle password input change
  const handleInputChange = (e) => {
    setFormData(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    let userId = email;
    let userPass = formData;
    let loginData = { userId, userPass };

    try {
      const response = await fetch("api/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();   
      if (data.data == "admin"){         // adminDashborad section
        toast.success(data.message); 
        navigate("/admin")
        return;
      }
        console.log(data)         // consumer section here
        toast.success(data.message); 
        navigate("/Product");
      } else {
        const error = await response.json();
        toast.error(error.message || "Login failed");
      }
    } catch (error) {
      console.error(error); // Log error for debugging
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <div className="mt-20 px-12 flex flex-col md:flex-row h-[70vh] md:gap-0">
      {/* Left Side - Image */}
      <div className="md:w-1/2 h-1/2 md:h-full">
        <img
          src={dogPic}
          alt="Login Visual"
          className="w-full h-full object-cover rounded-l-lg image-hover"
          loading="lazy"
        />
      </div>

      {/* Right Side - Login Form */}
      <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-4 md:py-0">
        <form
          className={`w-full sm:w-[400px] md:w-[500px] bg-white p-6 rounded-lg shadow-lg ${fadeClass}`}
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
              onChange={(e) => handleInputValue(e)}
              placeholder="Enter your email"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 input-transition"
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
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 input-transition"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition-all button-transition"
          >
            Login
          </button>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 font-medium hover:underline"
              >
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
