import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ListPetProduct() {
  const [petProducts, setPetProducts] = useState([]);

  useEffect(() => {
    const fetchPetProducts = async () => {
      try {
        const res = await fetch("/api/petproductsall");
        const result = await res.json();

        if (res.ok) {
          setPetProducts(result.data);
        } else {
          toast.error(result.message || "Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching pet products:", error);
        toast.error("Server Crash! Please try again later.");
      }
    };

    fetchPetProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      const result = await res.json();
      if (res.ok) {
        toast.success("Product deleted successfully");
        setPetProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      } else {
        toast.error(result.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <div className="min-h-screen bg-[#1c1c1c] p-6">
      <h1 className="text-2xl font-bold text-center text-white mb-4">
        Manage Pet Products
      </h1>
      <div className="overflow-auto bg-[#1c1c1c] shadow rounded-lg p-4">
        <table className="table-auto w-full">
          <thead>
            <tr className="text-left bg-[#1c1c1c] border-b">
              <th className="p-3 text-white">Image</th>
              <th className="p-3 text-white">Name</th>
              <th className="p-3 text-white">Category</th>
              <th className="p-3 text-white">Price</th>
              <th className="p-3 text-white">Update</th>
              <th className="p-3 text-white">Delete</th>
            </tr>
          </thead>
          <tbody>
            {petProducts.length > 0 ? (
              petProducts.map((product) => (
                <tr key={product._id} className="border-b">
                  <td className="p-3">
                    <img
                      src={
                        product.images[0] || "https://via.placeholder.com/100"
                      }
                      alt={product.productName || "Product Image"}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 text-white">{product.productName}</td>
                  <td className="p-3 text-white">
                    {product.category || "N/A"}
                  </td>
                  <td className="p-3 text-white">
                    {product.productPrice
                      ? new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(product.productPrice)
                      : "Price on request"}
                  </td>
                  <td className="p-3 ">
                    <Link to={`/update-product/${product._id}`}>
                      <button className="py-1 px-3 bg-purple-700 text-cyan-100 rounded hover:bg-purple-800 transition">
                        Update
                      </button>
                    </Link>
                  </td>
                  <td className="p-3 ">
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-3 text-white">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPetProduct;
