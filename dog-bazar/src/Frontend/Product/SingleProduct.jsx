import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SingleProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/singlePet/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const data = await response.json();
        console.warn(data.data)
        setProduct(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 flex justify-center items-center">
      <div className="max-w-5xl w-full bg-white shadow-md rounded-md p-6 flex flex-col lg:flex-row">
        {/* Product Image */}
        <div className="flex-shrink-0 lg:w-1/3 w-full flex justify-center items-center">
          <img
            src={product.images || "https://via.placeholder.com/300"}
            alt={product.dogName|| "Product Image"}
            className="w-full h-full object-contain max-h-96 rounded-md"
          />
        </div>

        {/* Product Details */}
        <div className="lg:w-2/3 w-full lg:pl-6 mt-6 lg:mt-0">
          <h1 className="text-2xl font-bold text-gray-800">
            {product.dogName || "Product Name"}
          </h1>
          <p className="text-gray-500 mt-2 text-sm">
            {product.description || "No description available."}
          </p>

          {/* Product Price */}
          <p className="text-xl font-bold text-green-600 mt-4">
            ₹{product.price || "N/A"}
          </p>

          {/* Additional Details */}
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              Category: {product.dogBreed || "Uncategorized"}
            </p>
            <p className="text-sm text-red-700">
            LifeExpectancy: {product.lifeExpectancy || "IN S"}
            </p>
            <p className="text-sm text-gray-700">
              Pet: {product.petType || "IN S"}
            </p>
            <p className="text-sm text-gray-700">
              Size: {product.dogSize || "IN S"}
            </p>
            <p className="text-sm text-gray-700">
              Breed: {product.dogBreed || "IN S"}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              Add to Cart
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
