import React from "react";
import dogPic from "./media/colorful-dog-painting-by-person_608068-19143.avif";

function NewAccount() {
  return (
    <div className="mt-20 flex flex-col md:flex-row h-[70vh] gap-4 md:gap-0 rounded-md">
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
      <div className="md:w-1/2 flex items-center justify-center rounded-r-md  bg-gray-100 p-4 md:py-0">
        <form className="w-full max-w-md drop-shadow-md bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-black mb-4 text-center">
            Sign Up
          </h2>

          {/* Full Name */}
          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium  text-black"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Enter your full name"
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
              className="w-full  border-black mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-sm  font-medium text-black"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
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
              className="w-full mt-1 px-3 py-2 border  border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="profileImage"
              className="block text-sm font-medium text-black"
            >
              Upload Profile Image
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-none file:text-sm file:font-medium file:bg-blue-500 file:text-white hover:file:bg-blue-600"
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
