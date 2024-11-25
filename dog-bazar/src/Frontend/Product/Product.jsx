import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Product() {
  const [dogProducts, setDogProducts] = useState([]);

  useEffect(() => {
    const fetchDogProducts = async () => {
      try {
        const res = await fetch("/api/dogfetchProduct");
        const result = await res.json();
        setDogProducts(result.data);
      } catch (error) {
        toast.error("Server Crash! Please try again later.");
      }
    };

    fetchDogProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen p-6">
      {/* Flex Layout */}
      <div className="flex flex-wrap gap-3 p-8 px-10 justify-start">
        {dogProducts.map((product, index) => (
          <div key={index}
            className="max-w-xs  p-4 bg-white rounded-md shadow hover:shadow-lg transition duration-300">
           <div style={{objectFit:"contain",aspectRatio:"3/2"}} className="w-full h-72 ">
            <img
              src={product.images[0] || "https://via.placeholder.com/150"}
              alt={product.dogName || "Dog Image"}
              className="w-full h-full  rounded-md mb-3"
            />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 truncate">
              {product.dogName}
            </h2>
            <p className="text-sm text-gray-500 truncate">
              Breed: {product.dogBreed || "Unknown"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              Life Expectancy: {product.lifeExpectancy || "N/A"} years
            </p>
            <p className="text-sm text-gray-500 truncate">
              Size: {product.dogSize || "Unknown"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              Pet Type: {product.petType || "Unknown"}
            </p>
            <p className="text-sm text-gray-500 truncate">
              Pet Age: {product.age !== undefined ? `${product.age} years` : "Unknown"}
            </p>
            <p className="text-sm text-gray-600 mb-3 truncate">
              {product.description || "No description available."}
            </p>
            <div className="flex items-center justify-between">
              <p className="text-base font-bold text-green-600">
                {product.price
                  ? new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(product.price)
                  : "Price on request"}
              </p>
              <button className="text-xs py-1 px-3 bg-green-500 text-white rounded hover:bg-green-600 transition">
                Adopt
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
