import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdatePetDetails = ({ id, showUpdateProduct }) => {
  const [productData, setProductData] = useState(null); // Store product details
  const [formData, setFormData] = useState({}); // Form data state

  // Fetch product details based on ID
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/getpetdata/${id}`); // Endpoint for a single product
        const result = await res.json();

        if (res.ok) {
            console.log(result.data)
          setProductData(result.data); 
          setFormData(result.data); // Pre-fill form with fetched data
        } else {
          toast.error(result.message || "Failed to fetch product details");
        }
      } catch (error) {
        toast.error("Error fetching product details");
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  // Close modal on "Escape" key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        showUpdateProduct();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showUpdateProduct]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

 // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/dogupdateProduct/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Product updated successfully");
        showUpdateProduct(); // Close modal
      } else {
        toast.error(result.message || "Failed to update product");
      }
    } catch (error) {
      toast.error("Error updating product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-2xl">
        <h1 className="text-white text-2xl font-semibold mb-6 text-center">
          Update Pet Product
        </h1>

        {productData ? (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 grid grid-cols-1 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-6"
          >
            {/* Pet Type */}
            <div className="flex flex-col col-span-2 sm:col-span-1 lg:col-span-1">
              <label htmlFor="petType" className="text-white text-sm mb-2">
                Pet Type
              </label>
              <select
                id="petType"
                value={formData.petType || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Pet Type</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
                <option value="bird">Bird</option>
              </select>
            </div>

            {/* Dog Name */}
            <div className="flex flex-col col-span-2 sm:col-span-1 lg:col-span-1">
              <label htmlFor="dogName" className="text-white text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="dogName"
                value={formData.dogName || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Dog Breed */}
            <div className="flex flex-col lg:col-span-1">
              <label htmlFor="dogBreed" className="text-white text-sm mb-2">
                Breed
              </label>
              <input
                type="text"
                id="dogBreed"
                value={formData.dogBreed || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Life Expectancy */}
            <div className="flex flex-col lg:col-span-1">
              <label htmlFor="lifeExpectancy" className="text-white text-sm mb-2">
                Life Expectancy (years)
              </label>
              <input
                type="number"
                id="lifeExpectancy"
                value={formData.lifeExpectancy || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Age */}
            <div className="flex flex-col lg:col-span-1">
              <label htmlFor="age" className="text-white text-sm mb-2">
                Age (years)
              </label>
              <input
                type="number"
                id="age"
                value={formData.age || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Dog Size */}
            <div className="flex flex-col lg:col-span-1">
              <label htmlFor="dogSize" className="text-white text-sm mb-2">
                Size
              </label>
              <select
                id="dogSize"
                value={formData.dogSize || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            {/* Price */}
            <div className="flex flex-col lg:col-span-1">
              <label htmlFor="price" className="text-white text-sm mb-2">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                value={formData.price || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col col-span-2 lg:col-span-3">
              <label htmlFor="description" className="text-white text-sm mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center col-span-2 lg:col-span-3">
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-3 rounded-md disabled:bg-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <p className="text-white">Loading product details...</p>
        )}
      </div>
    </div>
  );
};

export default UpdatePetDetails;
