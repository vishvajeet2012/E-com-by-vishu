import { useState, useEffect } from "react";
import toast, { ToastBar, ToastIcon } from "react-hot-toast";

function PopDogie({ closeModal }) {
    const [dogName, setDogName] = useState("");
    const [dogBreed, setDogBreed] = useState("");
    const [lifeExpectancy, setLifeExpectancy] = useState("");
    const [dogSize, setDogSize] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") {/// close pop functionanity
                closeModal();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [closeModal]);

   
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!images || images.length === 0) {
            ToastIcon("Please select at least one image before submitting.");
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
                dogName,
                dogBreed,
                lifeExpectancy,
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
                    toast.error("Dog product added successfully!");
                    closeModal();
                } else {
                    toast.error(result.message || "Failed to add product.");
                }
            } catch (error) {
                console.error("Error saving product:", error);
                alert("An error occurred while saving the product.");
            }
        } else {
            alert("No images were uploaded. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-2xl">
                <h1 className="text-white text-2xl font-semibold mb-6 text-center">
                    Add Dog Product
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="dogName" className="text-white text-sm mb-2">
                            Dog Name
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

                    <div className="flex flex-col">
                        <label htmlFor="dogBreed" className="text-white text-sm mb-2">
                            Dog Breed
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

                    <div className="flex flex-col">
                        <label htmlFor="dogSize" className="text-white text-sm mb-2">
                            Dog Size
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

                    <div className="flex flex-col">
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

                    <div className="flex flex-col">
                        <label htmlFor="images" className="text-white text-sm mb-2">
                            Select Images (You can upload multiple)
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

                    <div className="flex justify-center">
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
