import React, { useState } from "react";
import dogPic from "./media/colorful-dog-painting-by-person_608068-19143.avif";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

function NewAccount() {
  // Store form data
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "fullName") setFullName(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "confirmPassword") setConfirmPassword(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Prepare the data to be sent in the body as JSON
    const formData = {
      fullName,
      email,
      password,
    };

    try {
      const response = await fetch("/api/regData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData), 
      });

      if (response.ok) {
        const data = await response.json(); 
      
        toast.success(data.message);  
        navigate("/")
         
      } else {
        const error = await response.json();
        console.error("Error:", error);
        toast.error("Failed to create account.");
      }
}     catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while creating the account.");
    }
  };

  return (
    <div className="mt-10 px-12 h-[90vh] flex flex-col md:flex-row  gap-4 md:gap-0 rounded-md">
      {/* Left Side - Image */}
      <div className="md:w-1/2 h-1/2 md:h-full rounded-xl">
        <img
          src={dogPic}
          alt="Signup Visual"
          className="w-full h-full object-cover rounded-l-lg"
          loading="lazy"
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className="md:w-1/2 flex items-center justify-center rounded-r-md bg-gray-100 p-4 md:py-0">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md drop-shadow-md bg-white p-6 rounded-lg shadow-lg"
        >
          <h2 className="text-xl font-semibold text-black mb-4 text-center">
            Sign Up
          </h2>

          {/* Full Name */}
          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-black"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-md  border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              className="w-full  border-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
              className="w-full mt-1 px-3  border-black py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-3">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-black"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border  border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md border font-medium hover:bg-blue-600 transition-all"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewAccount;
