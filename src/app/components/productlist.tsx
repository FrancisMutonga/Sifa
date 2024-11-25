"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, query, limit, orderBy, where, startAfter } from "firebase/firestore";
import ProductCard from "./productscard"; // Import ProductCard component

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]); // State to store fetched products
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>(""); // Error state
  const [lastVisible, setLastVisible] = useState<any>(null); // Track the last document fetched
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Selected category state
  const observer = useRef<IntersectionObserver | null>(null); // For scroll observer

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors

      const productsRef = collection(db, "products");

      // Start by creating the base query
      let q = query(productsRef, orderBy("name"), limit(20));

      // Add category filter if selected
      if (selectedCategory && selectedCategory !== "") {
        q = query(q, where("category", "==", selectedCategory));
      }

      // Add pagination logic (if there's a last visible document)
      if (lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const querySnapshot = await getDocs(q);

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts((prevProducts) => [...prevProducts, ...productsData]); // Append new products
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1]); // Update last visible document
    } catch (err) {
      setError("Failed to fetch products.");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, lastVisible]);

  const loadMoreProducts = (entries: IntersectionObserverEntry[]) => {
    const entry = entries[0];
    if (entry.isIntersecting && !loading) {
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts(); // Initial load of products

    // Create the IntersectionObserver to trigger load more when scrolled to the bottom
    observer.current = new IntersectionObserver(loadMoreProducts, {
      rootMargin: "100px",
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchProducts]); // Dependency array ensures this runs once on mount

  useEffect(() => {
    if (observer.current) {
      const element = document.getElementById("scroll-trigger");
      if (element) {
        observer.current.observe(element);
      }
    }
  }, [loading]); // Re-attach observer when loading state changes

  return (
    <div className="container mx-auto py-8">
      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && products.length === 0 && (
        <p className="text-center">No products available.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            image={product.image}
            description={product.description} // Pass description
            category={product.category} // Pass category
          />
        ))}
      </div>

      {/* Trigger element for the IntersectionObserver */}
      <div id="scroll-trigger" className="h-1"></div>
    </div>
  );
};

export default ProductList;
