"use client";

import React, { useState, useEffect } from "react";
import Hero from "../components/phero";
import ProductCard from "../components/productscard";
import { supabase } from "../supabaseClient";
import Link from "next/link";
import Image from "next/image";


interface Product {
  id: string;
  name: string;
  image: string;
  categories: Category[]; 
}

interface Category {
  id: string;
  name: string;
  icon: string;
}


interface ProductResponse {
  id: string;
  name: string;
  image: string;
  categories: Category[] | Category | null; 
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  
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
       
        if (data && data.length > 0) {
          setSelectedCategory(data[0].name);
        }
      }
    };

    fetchCategories();
  }, []);


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
      
          const validatedProducts: Product[] = (data as ProductResponse[]).map(
            (product) => ({
              ...product,
              categories: Array.isArray(product.categories)
                ? product.categories
                : product.categories
                ? [product.categories]
                : [], 
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

 
  const filteredProducts = selectedCategory
    ? products.filter((product) =>
        product.categories?.some(
          (category) => category?.name === selectedCategory 
        )
      )
    : products;

  return (
    <div className=" mt-20 p-8 mx-auto ">
      <Hero />

      {/* Category Icons Filter */}
      <div className="flex items-center justify-center text-white space-x-8 mb-8 overflow-x-auto">
        {categories.length > 0 ? (
          categories.map((category) => (
            <button
              key={category.id}
              className={`flex flex-col items-center ${selectedCategory === category.name ? "text-forest" : ""}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              <Image
                src={category.icon.trimEnd() || "/icons/default.png"}
                alt={category.name}
                width={80}
                height={80}
                className="object-contain"
              />
              <span className="text-dusty font-bold text-lg">{category.name}</span>
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
