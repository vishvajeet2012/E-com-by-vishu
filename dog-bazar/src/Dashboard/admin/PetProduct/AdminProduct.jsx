import React from 'react';
import { Link } from 'react-router-dom';

function AdminProduct( ) {
  return (
    <div className="flex mt-10 justify-between gap-5">
      <div className="py-6 px-6 rounded-xl w-full bg-orange-500">
        {/* <h2 className="text-2xl font-semibold"></h2> */}
        <h3 className="text-xl font-medium"> Pet Product</h3>

     <Link to="/pertProductSection"> <button className="mt-4 px-4 py-2 rounded-lg bg-white text-black-500 font-semibold hover:bg-gray-200" >
        Add Product
        </button></Link>
      </div>
    </div>
  );
}

export default AdminProduct;
