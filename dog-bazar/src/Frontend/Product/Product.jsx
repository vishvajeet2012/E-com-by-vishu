import React from 'react';

function Product() {
  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Product Name</h1>
      <img 
        src="https://via.placeholder.com/300" 
        alt="Product" 
        className="w-full h-auto rounded-lg mb-4"
      />
      <p className="text-gray-600 text-base mb-4">
        This is a great product that helps you with various tasks. It is built with high-quality materials and comes with a one-year warranty.
      </p>
      <p className="text-xl font-semibold text-green-600 mb-6">$199.99</p>
      <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200">
        Buy Now
      </button>
    </div>
  );
}

export default Product;
