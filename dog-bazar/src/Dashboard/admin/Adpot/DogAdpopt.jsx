import React from 'react';
import { useNavigate } from 'react-router-dom';

function DogAdpopt() {
    const navigate = useNavigate();

    const handleAddPet = () => {
        navigate('/add-pet'); // Redirects to AddPet component
    };

    return (
        <div className="p-4">
            {/* List of pets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Placeholder for pet cards */}
                <div className="border p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Pet Name</h2>
                    <p className="text-sm text-gray-600">Details about the pet...</p>
                </div>
                <div className="border p-4 rounded shadow">
                    <h2 className="text-lg font-semibold">Pet Name</h2>
                    <p className="text-sm text-gray-600">Details about the pet...</p>
                </div>
                {/* Add more cards as needed */}
            </div>

            {/* Floating button */}
            <button
                onClick={handleAddPet}
                className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Add Pet"
            >
                +
            </button>
        </div>
    );
}

export default DogAdpopt;
