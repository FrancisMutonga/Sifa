"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/phero";
import ProductCard from "../components/productscard";
import { supabase } from "../supabaseClient";
import Link from "next/link";
import Image from "next/image"; // Use Next.js Image component

// Define the product and category interfaces
interface Product {
  id: string;
  name: string;
  image: string;
  categories: { name: string; icon: string }[]; // Ensure categories is an array
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fetch categories and icons
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, icon");

      if (error) {
        setError("Failed to fetch categories.");
        console.error(error.message);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let query = supabase
          .from("products")
          .select("id, name, image, categories (id, name, icon)");

        if (selectedCategory) {
          // Add filter to the query if a category is selected
          query = query.ilike("categories.name", `%${selectedCategory}%`);
        }

        const { data, error } = await query;

        if (error) {
          setError("Failed to load products.");
          console.error(error.message);
        } else {
          // Ensure categories are always an array
          const validatedProducts: Product[] = data?.map(
            (product: Product) => ({
              ...product,
              categories: product.categories ? [product.categories] : [], // Ensure categories is always an array
            })
          );

          console.log(validatedProducts); // Inspect the final product data
          setProducts(validatedProducts || []);
        }
      } catch (err) {
        setError("Failed to load products.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]); // This will run every time the selectedCategory changes

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories.some(
          (category) => category.name === selectedCategory
        )
      )
    : products;

  return (
    <div className="bg-forest mt-20 p-20 mx-auto ">
      <Hero />

      {/* Category Icons Filter */}
      <div className="flex items-center space-x-8 mb-8 overflow-x-auto">
        {/* "All" Icon Button */}
        <button
          key="all"
          className={`flex flex-col items-center ${
            selectedCategory === "" ? "text-nude" : ""
          }`}
          onClick={() => setSelectedCategory("")}
        >
          <Image
            src="/all.png"
            alt="All"
            width={32} // Adjust the width and height according to your needs
            height={32}
            className="object-contain"
          />
          <span>All</span>
        </button>

        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center ${
                selectedCategory === category.name ? "text-nude" : ""
              }`}
              onClick={() => setSelectedCategory(category.name)} // Set the selected category on click
            >
              <Image
                src={category.icon.trimEnd() || "/icons/default.png"} // Trim any trailing spaces
                alt={category.name}
                width={40} // Adjust the width and height according to your needs
                height={40}
                className="object-contain"
              />
              <span>{category.name}</span>
            </button>
          ))
        ) : (
          <p>No categories available</p> // Fallback message if categories is empty or null
        )}
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center">No products available in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/productdetails/${product.id}`}
            passHref
          >
            <div className="cursor-pointer">
              <ProductCard name={product.name} image={product.image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
