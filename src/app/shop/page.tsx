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
  categories: Category[]; // Ensure categories is an array of Category objects
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

// Define the response type from Supabase query
interface ProductResponse {
  id: string;
  name: string;
  image: string;
  categories: Category[] | Category | null; // categories can be either an array or a single object or null
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
        // Set the first category as the selected category
        if (data && data.length > 0) {
          setSelectedCategory(data[0].name);
        }
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
          .select("id, name, image, categories (name, icon)");
  
        if (selectedCategory) {
          query = query.ilike("categories.name", `%${selectedCategory}%`);
        }
  
        const { data, error } = await query;
  
        if (error) {
          setError("Failed to load products.");
          console.error(error.message);
        } else {
          // Validate the categories and set the product data
          const validatedProducts: Product[] = (data as ProductResponse[]).map(
            (product) => ({
              ...product,
              categories: Array.isArray(product.categories)
                ? product.categories
                : product.categories
                ? [product.categories]
                : [], // Safeguard against null or non-array categories
            })
          );

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
  }, [selectedCategory]);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories?.some(
          (category) => category?.name === selectedCategory // Safeguard against undefined category
        )
      )
    : products;

  return (
    <div className="bg-forest mt-20 p-8 mx-auto ">
      <Hero />

      {/* Category Icons Filter */}
      <div className="flex items-center text-white space-x-8 mb-8 overflow-x-auto">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center ${selectedCategory === category.name ? "text-nude" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <Image
                src={category.icon.trimEnd() || "/icons/default.png"}
                alt={category.name}
                width={40}
                height={40}
                className="object-contain"
              />
              <span>{category.name}</span>
            </button>
          ))
        ) : (
          <p>No categories available</p>
        )}
      </div>

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {filteredProducts.length === 0 && !loading && !error && (
        <p className="text-center">No products available in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/productdetails/${product.id}`} passHref>
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
