"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/phero";
import SearchFilter from "../components/searchfilter";
import ProductCard from "../components/productscard";
import { supabase } from "../supabaseClient";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*");

        if (error) throw error;

        setProducts(data);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="bg-forest mt-20">
      <Hero />
      <div className="container mx-auto p-8">
        {/* Search Filter */}
        <SearchFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        {/* Loading and Error States */}
        {loading && <p className="text-center">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        
        {/* No products available in the selected category */}
        {filteredProducts.length === 0 && !loading && !error && (
          <p className="text-center">No products available in this category.</p>
        )}
        
        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} passHref>
              <div className="cursor-pointer">
              <ProductCard
              name={product.name}
              image={product.image}
              description={product.description} 
              category={product.category} 
            />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
