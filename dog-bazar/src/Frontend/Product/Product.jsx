import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

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
    <div className="bg-white min-h-screen py-6">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Explore Our Dogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {dogProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-lg p-4 hover:shadow-xl transition duration-300"
            >
              <div className="w-full h-48 overflow-hidden rounded-lg mb-4">
                <img
                  src={product.images[0] || "https://via.placeholder.com/300"}
                  alt={product.dogName || "Dog Image"}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">
                {product.dogName}
              </h2>
              <div className="text-sm text-gray-600 mb-2">
                <p>
                  <strong>Breed:</strong> {product.dogBreed || "Unknown"}
                </p>
                <p>
                  <strong>Life Expectancy:</strong>{" "}
                  {product.lifeExpectancy || "N/A"} years
                </p>
                <p>
                  <strong>Size:</strong> {product.dogSize || "Unknown"}
                </p>
                <p>
                  <strong>Pet Type:</strong> {product.petType || "Unknown"}
                </p>
                <p>
                  <strong>Age:</strong>{" "}
                  {product.age !== undefined
                    ? `${product.age} years`
                    : "Unknown"}
                </p>
              </div>
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                {product.description || "No description available."}
              </p>
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-green-600">
                  {product.price
                    ? new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                      }).format(product.price)
                    : "Price on request"}
                </p>
                <Link to={`/Pethub/${product._id}`}>
                  <button className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition">
                    Adopt
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Product;
