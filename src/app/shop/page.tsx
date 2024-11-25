"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/phero";
import SearchFilter from "../components/searchfilter";
import ProductCard from "../components/productscard";
import { db } from "../firebase-config"; 
import { collection, getDocs } from "firebase/firestore"; // Firestore SDK methods

interface Product {
  id: string;
  name: string;
  image: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); // State to store products
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // For category filtering
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string>(""); // Error state

  // Fetch products when the component is mounted
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Set loading state to true
        const querySnapshot = await getDocs(collection(db, "products")); // Fetch data from Firestore
        if (querySnapshot.empty) {
          setError("No products found in Firestore.");
        }
        const productsData: Product[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore doc ID
          name: doc.data().name, // Data from Firestore document
          image: doc.data().image, // Firestore field for image
          category: doc.data().category, // Firestore field for category
        }));
        setProducts(productsData); // Set the products data to state
      } catch (err) {
        setError("Failed to load products"); // Handle error
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false); // Set loading state to false when done
      }
    };

    fetchProducts(); // Call the function to fetch products
  }, []); // Empty dependency array, meaning it runs only once on mount

  // Generate a list of unique categories for the filter
  const categories = Array.from(new Set(products.map((product) => product.category)));

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-forest mt-20">
      <Hero />
      <div className="container mx-auto p-8">
        {/* Search Filter Component */}
        <SearchFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        {/* Loading and error handling */}
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {/* Display message if no products are found */}
        {filteredProducts.length === 0 && !loading && !error && (
          <p className="text-center">No products available in this category.</p>
        )}
        {/* Display products in a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              onClick={() => alert(`View ${product.name}`)} // Handle product click
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
