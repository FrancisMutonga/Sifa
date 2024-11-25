"use client";
import React, { useState, useEffect } from "react";
import { db } from "../firebase-config"; // Import Firestore config
import { collection, getDocs } from "firebase/firestore";

// Define the type for the product (adjust to your Firestore document structure)
type product = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
};

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<product[]>([]); // State to store products
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Fetch products from Firestore
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(""); // Reset error state if any
        const productsRef = collection(db, "products"); // Reference to Firestore products collection
        const querySnapshot = await getDocs(productsRef); // Get documents from the collection
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsData); // Update state with fetched products
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading to false when done
      }
    };

    fetchProducts(); // Call fetch function on component mount
  }, []); // Empty dependency array to run this only once on mount

  return (
    <div className="container mx-auto text-black py-8">
      <h2 className="text-2xl text-center mb-4">All Products</h2>

      {/* Display loading or error */}
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Display products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md" />
            <h3 className="text-lg font-bold mt-2">{product.name}</h3>
            <p>{product.description}</p>
            <p className="text-sm text-gray-500">Category: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
