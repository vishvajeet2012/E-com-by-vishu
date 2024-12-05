import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PopPetProduct({ closeModal }) {
    const [category, setCategory] = useState(""); // pet food, pet accessories, pet grooming
    const [petCategory, setPetCategory] = useState(""); // dog, cat, bird
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productSize, setProductSize] = useState(""); // small, medium, large, ml, ft, meter
    const [productPrice, setProductPrice] = useState("");
    const [productType, setProductType] = useState(""); // Type of product
    const [netQuantity, setNetQuantity] = useState("");
    const [countryOfOrigin, setCountryOfOrigin] = useState("");
    const [brand, setBrand] = useState("");
    const [marketingBy, setMarketingBy] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {
                closeModal();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [closeModal]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images || images.length === 0) {
            toast.error("Please select at least one image before submitting.");
            return;
        }

        setLoading(true);

        const uploadedImages = [];

        // Upload images to Cloudinary
        for (const img of images) {
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", "PetProduct"); // Your Cloudinary upload preset

            try {
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dishdojeh/image/upload", // Your Cloudinary URL
                    { method: "POST", body: formData }
                );
                const data = await response.json();

                if (response.ok) {
                    uploadedImages.push(data.url); // Store the uploaded image URL
                } else {
                    console.error("Image upload failed:", data);
                    toast.error(`Failed to upload ${img.name}.`);
                }
            } catch (error) {
                console.error("Error uploading image:", error);
                toast.error(`An error occurred while uploading ${img.name}.`);
            }
        }

        if (uploadedImages.length > 0) {
            const productDetails = {
                category,
                petCategory,
                productName,
                productDescription,
                productSize,
                productPrice,
                productType,
                netQuantity,
                countryOfOrigin,
                brand,
                marketingBy,
                images: uploadedImages, // Send the Cloudinary URLs
            };

            try {
                const response = await fetch("/api/petProduct", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(productDetails),
                });

                const result = await response.json();

                if (response.ok) {
                    toast.success("Pet product added successfully!");
                    closeModal();
                } else {
                    toast.error(result.message || "Failed to add product.");
                }
            } catch (error) {
                console.error("Error saving product:", error);
                toast.error("An error occurred while saving the product.");
            }
        } else {
            toast.error("No images were uploaded. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                    Add Pet Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {/* Category */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="category" className="text-white text-sm mb-2">
                            Category
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="petFood">Pet Food</option>
                            <option value="petAccessories">Pet Accessories</option>
                            <option value="petGrooming">Pet Grooming</option>
                        </select>
                    </div>

                    {/* Pet Category */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="petCategory" className="text-white text-sm mb-2">
                            Pet Type
                        </label>
                        <select
                            id="petCategory"
                            value={petCategory}
                            onChange={(e) => setPetCategory(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Pet Category</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                        </select>
                    </div>

                    {/* Product Name */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="productName" className="text-white text-sm mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            id="productName"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="productDescription" className="text-white text-sm mb-2">
                            Product Description
                        </label>
                        <textarea
                            id="productDescription"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Product Size */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="productSize" className="text-white text-sm mb-2">
                            Product Size
                        </label>
                        <select
                            id="productSize"
                            value={productSize}
                            onChange={(e) => setProductSize(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select Size</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="ml">ML</option>
                            <option value="ft">Feet</option>
                            <option value="meter">Meter</option>
                        </select>
                    </div>

                    {/* Product Price */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="productPrice" className="text-white text-sm mb-2">
                            Product Price ($)
                        </label>
                        <input
                            type="number"
                            id="productPrice"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Product Type */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="productType" className="text-white text-sm mb-2">
                            Product Type
                        </label>
                        <input
                            type="text"
                            id="productType"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Net Quantity */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="netQuantity" className="text-white text-sm mb-2">
                            Net Quantity
                        </label>
                        <input
                            type="text"
                            id="netQuantity"
                            value={netQuantity}
                            onChange={(e) => setNetQuantity(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Country of Origin */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="countryOfOrigin" className="text-white text-sm mb-2">
                            Country of Origin
                        </label>
                        <input
                            type="text"
                            id="countryOfOrigin"
                            value={countryOfOrigin}
                            onChange={(e) => setCountryOfOrigin(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Brand */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="brand" className="text-white text-sm mb-2">
                            Brand
                        </label>
                        <input
                            type="text"
                            id="brand"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Marketing By */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="marketingBy" className="text-white text-sm mb-2">
                            Marketing By
                        </label>
                        <input
                            type="text"
                            id="marketingBy"
                            value={marketingBy}
                            onChange={(e) => setMarketingBy(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Images */}
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="images" className="text-white text-sm mb-2">
                            Select Images
                        </label>
                        <input
                            type="file"
                            id="images"
                            onChange={(e) => setImages([...e.target.files])}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            accept="image/*"
                            multiple
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center col-span-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-6 py-3 rounded-md disabled:bg-blue-300"
                        >
                            {loading ? "Uploading..." : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PopPetProduct;
