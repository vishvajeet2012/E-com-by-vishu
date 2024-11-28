import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdatePetDetails from "./model/popup/UpdatePetDetails";

function Listproduct() {
  const [products, setProducts] = useState([]);
  const [showUpdateProducts, setShowUpdateProduct] = useState(false);
  const [id, setId] = useState(null);

  const showUpdateProduct = () => setShowUpdateProduct(false);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/dogfetchProduct");
        const result = await res.json();

        if (res.ok) {
          setProducts(result.data);
        } else {
          toast.error(result.message || "Failed to fetch products");
        }
      } catch (error) {
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  // Delete product from the database
  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`/api/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        toast.error(result.message || "Failed to delete product");
      }
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#1c1c1c] p-6">
        <h1 className="text-2xl font-bold text-center text-white mb-4">
          Product List
        </h1>
        <div className="overflow-auto bg-[#1c1c1c] shadow rounded-lg p-4">
          <table className="table-auto w-full">
            <thead>
              <tr className="text-left bg-[#1c1c1c] border-b">
                <th className="p-3 text-white">Image</th>
                <th className="p-3 text-white">Dog Name</th>
                <th className="p-3 text-white">Breed</th>
                <th className="p-3 text-white">Price</th>
                <th className="p-3 text-white">Delete</th>
                <th className="p-3 text-white">Update</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id} className="border-b">
                    <td className="p-3">
                      <img
                        src={
                          product.images[0] || "https://via.placeholder.com/100"
                        }
                        alt={product.dogName || "Dog Image"}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 text-white">{product.dogName}</td>
                    <td className="p-3 text-white">{product.dogBreed}</td>
                    <td className="p-3 text-white">
                      {product.price
                        ? new Intl.NumberFormat("en-IN", {
                            style: "currency",
                            currency: "INR",
                          }).format(product.price)
                        : "N/A"}
                    </td>
                    <td className="p-3 ">
                      <button
                        onClick={() => deleteProduct(product._id)}
                        className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                    <td className="p-3 ">
                      <button
                        onClick={() => {
                          setId(product._id);
                          setShowUpdateProduct(true);
                        }}
                        className="py-1 px-3 bg-purple-700 text-cyan-100 rounded hover:bg-red-600 transition"
                      >
                        Update Product
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center p-3 text-white">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showUpdateProducts && (
        <UpdatePetDetails id={id} showUpdateProduct={showUpdateProduct} />
      )}
    </>
  );
}

export default Listproduct;
