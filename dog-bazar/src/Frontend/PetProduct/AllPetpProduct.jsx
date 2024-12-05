import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function AllPetProduct() {
  const [petProducts, setPetProducts] = useState([]);

  useEffect(() => {
    const fetchPetProducts = async () => {
      try {
        const res = await fetch("/api/petproductsall");
        const result = await res.json();
        setPetProducts(result.data);
        console.log(result.data); 
      } catch (error) {
        console.error("Error fetching pet products:", error);
        toast.error("Server Crash! Please try again later.");
      }
    };

    fetchPetProducts();
  }, []);

  return (
    <div className="bg-white min-h-screen py-6">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Explore Our Pet Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {petProducts.map((product, index) => (
            <div 
              key={index}
              className="bg-white shadow rounded-lg overflow-hidden p-4 hover:shadow-xl transition duration-300" 
            >
              <img 
                src={product.images[0] || "https://via.placeholder.com/300"} 
                alt={product.productName || "Product Image"} 
                className="w-full object-cover h-48 sm:h-64 md:h-48 lg:h-56" 
              />
              <div className="p-4"> 
                <h2 className="text-lg font-bold text-gray-900 mb-2 truncate">
                  {product.productName}
                </h2>
                <div className="text-sm text-gray-600 mb-2">
                  <p>
                    <strong>Category:</strong> {product.category || "Unknown"}
                  </p>
                  <p>
                    <strong>Brand:</strong> {product.brand || "Unknown"}
                  </p>
                  {/* ... other product details */}
                </div>
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {product.productDescription || "No description available."}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-semibold text-green-600">
                    {product.productPrice 
                      ? new Intl.NumberFormat("en-IN", { 
                          style: "currency", 
                          currency: "INR", 
                        }).format(product.productPrice) 
                      : "Price on request"
                    }
                  </p>
                  <Link to={`/Pethub/${product._id}`}>
                    <button 
                      className="bg-green-500 text-white py-1 px-4 rounded-lg hover:bg-green-600 transition"
                    >
                      View Product
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllPetProduct;