import React from "react";
import dogMainImage from "../media/home/hero-banner.jpg";

function Home() {
  return (
    <div className="relative">
      {/* Background Section */}
      <div
        style={{ backgroundColor: "#FF9B00" }}
        className="imageBox flex justify-center items-center relative h-[500px]"
      >
        <img
          src={dogMainImage}
          alt="Hero Banner"
          className="object-cover w-full h-full"
        />
        {/* Overlay Content */}
        <div
          style={{ zIndex: 1 }}
          className="absolute left-20 top-1/2 transform -translate-y-1/2 text-left">
          <h1 className="text-white text-7xl font-bold">Dog Bazar</h1>
          <p className="text-white text-xl mt-2 text-center"> India’s Best Online Pet Shop</p>
          <button className="p-3 bg-slate-50 rounded-md  items-center"> Explore</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
