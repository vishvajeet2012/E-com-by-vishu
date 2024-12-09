import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SinglePetProductSection() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/singlePetHub/${id}`);
        if (!response.ok) throw new Error("Failed to fetch product data");
        const data = await response.json();
        setProduct(data.data);
        console.log(data.message)
        setMainImage(data.data?.images?.[0] || "/placeholder.jpg");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-6">
      <div className="container mx-auto">
        <div className="bg-white mt-16 shadow-md rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative">
              <img
                src={mainImage}
                alt={product?.dogName || "Product Image"}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                {product?.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(image)}
                    className={`w-16 h-16 rounded-md border ${
                      mainImage === image
                        ? "border-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.jpg"}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {product?.dogName || "Product Name"}
              </h1>
              <p className="text-gray-500 mb-4">
                {product?.description || "No description available."}
              </p>

              <div className="space-y-2">
                <p>
                  <strong>Breed:</strong> {product?.dogBreed || "Unknown"}
                </p>
                <p>
                  <strong>Life Expectancy:</strong>{" "}
                  {product?.lifeExpectancy || "N/A"} years
                </p>
                <p>
                  <strong>Size:</strong> {product?.dogSize || "Unknown"}
                </p>
                <p>
                  <strong>Pet Type:</strong> {product?.petType || "Unknown"}
                </p>
                <p>
                  <strong>Age:</strong>{" "}
                  {product?.age !== undefined
                    ? `${product.age} years`
                    : "Unknown"}
                </p>
              </div>

              <p className="text-xl font-bold text-green-600 mt-4">
                ₹{product?.price || "N/A"}
              </p>

              <div className="flex gap-4 mt-6">
                <button
                  className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                  title="Add this pet to your cart"
                >
                  Add to Cart
                </button>
                <button
                  className="w-full py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
                  title="Buy this pet now"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePetProductSection;
