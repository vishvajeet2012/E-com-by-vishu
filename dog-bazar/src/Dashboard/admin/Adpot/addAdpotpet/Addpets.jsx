import React, { useState } from 'react';

function Addpets({ ownerName }) {
    const [petDetails, setPetDetails] = useState({
        name: '',
        age: '',
        breed: '',
        category: 'Dog',
        description: '',
        location: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetDetails({ ...petDetails, [name]: value });
    };

    const handleImageChange = (e) => {
        setPetDetails({ ...petDetails, image: e.target.files[0] });
    };

    const handleLocationClick = () => {
        const selectedLocation = "Example Location"; // Replace with actual location selection logic
        setPetDetails({ ...petDetails, location: selectedLocation });
        alert(`Selected location: ${selectedLocation}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Pet details submitted:', { ...petDetails, ownerName });
        alert('Pet added successfully!');
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-md w-full max-w-screen-lg lg:w-3/4 p-8 md:p-12">
                <h2 className="text-2xl font-bold mb-6 text-center">Add Your Pet for Adoption</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pet Name */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Pet Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={petDetails.name}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Pet Age */}
                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                            Age
                        </label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={petDetails.age}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Pet Breed */}
                    <div>
                        <label htmlFor="breed" className="block text-sm font-medium text-gray-700">
                            Breed
                        </label>
                        <input
                            type="text"
                            id="breed"
                            name="breed"
                            value={petDetails.breed}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    {/* Pet Category */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            value={petDetails.category}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="Dog">Dog</option>
                            <option value="Cat">Cat</option>
                            <option value="Bird">Bird</option>
                        </select>
                    </div>

                    {/* Pet Description */}
                    <div className="md:col-span-2">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={petDetails.description}
                            onChange={handleChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                            rows="4"
                            required
                        ></textarea>
                    </div>

                    {/* Location */}
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={petDetails.location}
                                readOnly
                                className="flex-grow border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <button
                                type="button"
                                onClick={handleLocationClick}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Select Location
                            </button>
                        </div>
                    </div>

                    {/* Pet Image */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Pet Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full border-gray-300 rounded-md p-2 mt-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Owner Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                        <p className="text-gray-700 p-2 bg-gray-100 rounded-md">{ownerName}</p>
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        >
                            Add Pet
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Addpets;
