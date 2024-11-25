import { useState, useEffect } from "react";
import toast from "react-hot-toast";

function PopDogie({ closeModal }) {
    const [petType, setPetType] = useState("");
    const [dogName, setDogName] = useState("");
    const [dogBreed, setDogBreed] = useState("");
    const [lifeExpectancy, setLifeExpectancy] = useState("");
    const [age, setAge] = useState("");
    const [dogSize, setDogSize] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
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
        for (const img of images) {
            const formData = new FormData();
            formData.append("file", img);
            formData.append("upload_preset", "dogbazar");

            try {
                const response = await fetch(
                    "https://api.cloudinary.com/v1_1/dishdojeh/image/upload",
                    { method: "POST", body: formData }
                );
                const data = await response.json();

                if (response.ok) {
                    uploadedImages.push(data.url);
                } else {
                    console.error("Image upload failed:", data);
                    toast.error(`Failed to upload ${img.name}.`);
                }
            } catch (error) {
                toast.error(`An error occurred while uploading ${img.name}.`);
            }
        }

        if (uploadedImages.length > 0) {
            const productDetails = {
                petType,
                dogName,
                dogBreed,
                lifeExpectancy,
                age,
                dogSize,
                price,
                description,
                images: uploadedImages,
            };

            try {
                const response = await fetch("/api/dogProduct", {
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
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-2xl">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                    Add Pet Product
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4 grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                    {/* Pet Type */}
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="petType" className="text-white text-sm mb-2">
                            Pet Type
                        </label>
                        <select
                            id="petType"
                            value={petType}
                            onChange={(e) => setPetType(e.target.value)}
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
                    <div className="flex flex-col col-span-2 sm:col-span-1">
                        <label htmlFor="dogName" className="text-white text-sm mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="dogName"
                            value={dogName}
                            onChange={(e) => setDogName(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Dog Breed */}
                    <div className="flex flex-col">
                        <label htmlFor="dogBreed" className="text-white text-sm mb-2">
                            Breed
                        </label>
                        <input
                            type="text"
                            id="dogBreed"
                            value={dogBreed}
                            onChange={(e) => setDogBreed(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Life Expectancy */}
                    <div className="flex flex-col">
                        <label htmlFor="lifeExpectancy" className="text-white text-sm mb-2">
                            Life Expectancy (years)
                        </label>
                        <input
                            type="number"
                            id="lifeExpectancy"
                            value={lifeExpectancy}
                            onChange={(e) => setLifeExpectancy(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Age */}
                    <div className="flex flex-col">
                        <label htmlFor="age" className="text-white text-sm mb-2">
                            Age (years)
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Dog Size */}
                    <div className="flex flex-col">
                        <label htmlFor="dogSize" className="text-white text-sm mb-2">
                            Size
                        </label>
                        <select
                            id="dogSize"
                            value={dogSize}
                            onChange={(e) => setDogSize(e.target.value)}
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
                    <div className="flex flex-col">
                        <label htmlFor="price" className="text-white text-sm mb-2">
                            Price ($)
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col col-span-2">
                        <label htmlFor="description" className="text-white text-sm mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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

                    {/* Submit */}
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

export default PopDogie;
