import { useState, useEffect } from 'react';

function PopDogie({ closeModal }) {
    const [dogData, setDogData] = useState({
        name: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        gender: '',
        size: '',
        image: null,
        lifeExpectancy: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        breed: '',
        age: '',
        price: '',
        description: '',
        gender: '',
        size: '',
        lifeExpectancy: '',
    });

    const [loading, setLoading] = useState(false);

    // Close modal on escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [closeModal]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDogData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDogData((prevState) => ({
                ...prevState,
                image: URL.createObjectURL(file),
            }));
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation before submitting
        if (!isFormValid()) {
            setErrors({
                name: dogData.name ? '' : 'Name is required',
                breed: dogData.breed ? '' : 'Breed is required',
                age: dogData.age ? '' : 'Age is required',
                price: dogData.price ? '' : 'Price is required',
                description: dogData.description ? '' : 'Description is required',
                gender: dogData.gender ? '' : 'Gender is required',
                size: dogData.size ? '' : 'Size is required',
                lifeExpectancy: dogData.lifeExpectancy ? '' : 'Life Expectancy is required',
            });
            return;
        }

        setLoading(true);
        // Simulate submission (e.g., API call)
        setTimeout(() => {
            console.log("Submitting dog data:", dogData);
            setLoading(false);
            closeModal();
        }, 2000);
    };

    // Check if the form is valid
    const isFormValid = () => {
        return (
            dogData.name &&
            dogData.breed &&
            dogData.age &&
            dogData.price &&
            dogData.description &&
            dogData.gender &&
            dogData.size &&
            dogData.lifeExpectancy
        );
    };

    // Reset form fields
    const handleClear = () => {
        setDogData({
            name: '',
            breed: '',
            age: '',
            price: '',
            description: '',
            gender: '',
            size: '',
            image: null,
            lifeExpectancy: '',
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-2xl">
        <h1 className="text-white text-2xl font-semibold mb-6 text-center">Upload Dog Data</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Form Layout: Flex or Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-3">
                {/* Dog Name */}
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-white text-sm mb-2">Dog Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={dogData.name}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter dog name"
                        required
                    />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                </div>

                {/* Breed */}
                <div className="flex flex-col">
                    <label htmlFor="breed" className="text-white text-sm mb-2">Breed</label>
                    <input
                        type="text"
                        id="breed"
                        name="breed"
                        value={dogData.breed}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter breed"
                        required
                    />
                    {errors.breed && <span className="text-red-500 text-sm">{errors.breed}</span>}
                </div>

                {/* Age */}
                <div className="flex flex-col">
                    <label htmlFor="age" className="text-white text-sm mb-2">Age</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={dogData.age}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter age"
                        required
                    />
                    {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
                </div>

                {/* Price */}
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-white text-sm mb-2">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={dogData.price}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter price"
                        required
                    />
                    {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
                </div>

                {/* Description */}
                <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label htmlFor="description" className="text-white text-sm mb-2">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={dogData.description}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter dog description"
                        rows="4"
                        required
                    />
                    {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
                </div>

                {/* Gender */}
                <div className="flex flex-col">
                    <label htmlFor="gender" className="text-white text-sm mb-2">Gender</label>
                    <select
                        id="gender"
                        name="gender"
                        value={dogData.gender}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
                </div>

                {/* Size */}
                <div className="flex flex-col">
                    <label htmlFor="size" className="text-white text-sm mb-2">Size</label>
                    <select
                        id="size"
                        name="size"
                        value={dogData.size}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Guard Dog">Guard Dog</option>
                    </select>
                    {errors.size && <span className="text-red-500 text-sm">{errors.size}</span>}
                </div>

                {/* Life Expectancy */}
                <div className="flex flex-col">
                    <label htmlFor="lifeExpectancy" className="text-white text-sm mb-2">Life Expectancy (in years)</label>
                    <input
                        type="number"
                        id="lifeExpectancy"
                        name="lifeExpectancy"
                        value={dogData.lifeExpectancy}
                        onChange={handleChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter life expectancy"
                        required
                    />
                    {errors.lifeExpectancy && <span className="text-red-500 text-sm">{errors.lifeExpectancy}</span>}
                </div>

                {/* Image */}
                <div className="flex flex-col col-span-2 sm:col-span-1">
                    <label htmlFor="image" className="text-white text-sm mb-2">Dog Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {dogData.image && (
                        <img src={dogData.image} alt="Dog preview" className="mt-4 w-32 h-32 object-cover rounded" />
                    )}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-md w-full sm:w-32 disabled:opacity-50"
                    disabled={loading || !isFormValid()}
                >
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
                <button
                    type="button"
                    onClick={handleClear}
                    className="bg-gray-500 text-white p-2 rounded-md w-full sm:w-32"
                >
                    Clear
                </button>
                <button
                    type="button"
                    onClick={closeModal}
                    className="bg-red-500 text-white p-2 rounded-md w-full sm:w-32"
                >
                    Cancel
                </button>
            </div>
        </form>
    </div>
</div>

    );
}

export default PopDogie;


// <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
// <div className="bg-gray-800 p-6 sm:p-8 rounded-lg w-full max-w-lg sm:max-w-2xl">
//     <h1 className="text-white text-2xl font-semibold mb-6 text-center">Upload Dog Data</h1>
    
//     <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Dog Name */}
//         <div className="flex flex-col">
//             <label htmlFor="name" className="text-white text-sm mb-2">Dog Name</label>
//             <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 value={dogData.name}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter dog name"
//                 required
//             />
//             {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
//         </div>

//         {/* Breed */}
//         <div className="flex flex-col">
//             <label htmlFor="breed" className="text-white text-sm mb-2">Breed</label>
//             <input
//                 type="text"
//                 id="breed"
//                 name="breed"
//                 value={dogData.breed}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter breed"
//                 required
//             />
//             {errors.breed && <span className="text-red-500 text-sm">{errors.breed}</span>}
//         </div>

//         {/* Age */}
//         <div className="flex flex-col">
//             <label htmlFor="age" className="text-white text-sm mb-2">Age</label>
//             <input
//                 type="number"
//                 id="age"
//                 name="age"
//                 value={dogData.age}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter age"
//                 required
//             />
//             {errors.age && <span className="text-red-500 text-sm">{errors.age}</span>}
//         </div>

//         {/* Price */}
//         <div className="flex flex-col">
//             <label htmlFor="price" className="text-white text-sm mb-2">Price</label>
//             <input
//                 type="number"
//                 id="price"
//                 name="price"
//                 value={dogData.price}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter price"
//                 required
//             />
//             {errors.price && <span className="text-red-500 text-sm">{errors.price}</span>}
//         </div>

//         {/* Description */}
//         <div className="flex flex-col">
//             <label htmlFor="description" className="text-white text-sm mb-2">Description</label>
//             <textarea
//                 id="description"
//                 name="description"
//                 value={dogData.description}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter dog description"
//                 rows="4"
//                 required
//             />
//             {errors.description && <span className="text-red-500 text-sm">{errors.description}</span>}
//         </div>

//         {/* Gender */}
//         <div className="flex flex-col">
//             <label htmlFor="gender" className="text-white text-sm mb-2">Gender</label>
//             <select
//                 id="gender"
//                 name="gender"
//                 value={dogData.gender}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//             >
//                 <option value="">Select gender</option>
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//             </select>
//             {errors.gender && <span className="text-red-500 text-sm">{errors.gender}</span>}
//         </div>

//         {/* Size */}
//         <div className="flex flex-col">
//             <label htmlFor="size" className="text-white text-sm mb-2">Size</label>
//             <select
//                 id="size"
//                 name="size"
//                 value={dogData.size}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 required
//             >
//                 <option value="">Select size</option>
//                 <option value="Small">Small</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Large">Large</option>
//                 <option value="Guard Dog">Guard Dog</option>
//             </select>
//             {errors.size && <span className="text-red-500 text-sm">{errors.size}</span>}
//         </div>

//         {/* Life Expectancy */}
//         <div className="flex flex-col">
//             <label htmlFor="lifeExpectancy" className="text-white text-sm mb-2">Life Expectancy (in years)</label>
//             <input
//                 type="number"
//                 id="lifeExpectancy"
//                 name="lifeExpectancy"
//                 value={dogData.lifeExpectancy}
//                 onChange={handleChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="Enter life expectancy"
//                 required
//             />
//             {errors.lifeExpectancy && <span className="text-red-500 text-sm">{errors.lifeExpectancy}</span>}
//         </div>

//         {/* Image */}
//         <div className="flex flex-col">
//             <label htmlFor="image" className="text-white text-sm mb-2">Dog Image</label>
//             <input
//                 type="file"
//                 id="image"
//                 name="image"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//             {dogData.image && (
//                 <img src={dogData.image} alt="Dog preview" className="mt-4 w-32 h-32 object-cover rounded" />
//             )}
//         </div>

//         <div className="flex flex-col sm:flex-row justify-between mt-4 gap-4">
//             <button
//                 type="submit"
//                 className="bg-green-500 text-white p-2 rounded-md w-full sm:w-32 disabled:opacity-50"
//                 disabled={loading || !isFormValid()}
//             >
//                 {loading ? 'Submitting...' : 'Submit'}
//             </button>
//             <button
//                 type="button"
//                 onClick={handleClear}
//                 className="bg-gray-500 text-white p-2 rounded-md w-full sm:w-32"
//             >
//                 Clear
//             </button>
//             <button
//                 type="button"
//                 onClick={closeModal}
//                 className="bg-red-500 text-white p-2 rounded-md w-full sm:w-32"
//             >
//                 Cancel
//             </button>
//         </div>
//     </form>
// </div>
// </div>