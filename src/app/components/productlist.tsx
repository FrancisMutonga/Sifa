"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: string;
  category: string;
  color: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase.from("products").select("*");

        if (error) {
          console.error("Error fetching products:", error.message);
          setError("Failed to load products.");
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const groupedProducts = products.reduce<Record<string, Product[]>>(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push(product);
      return acc;
    },
    {}
  );

  if (loading) return <p>Loading products...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Product List</h2>
      {Object.entries(groupedProducts).map(([category, categoryProducts]) => (
        <div key={category} className="mb-8">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">{category}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 border rounded-lg shadow hover:shadow-lg transition"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={500}
                  height={400}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h4 className="text-lg font-bold text-gray-800">{product.name}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-gray-500 text-sm mt-2">
                  Color: <span className="font-medium">{product.color}</span>
                </p>
                <p className="text-gray-500 text-sm">
                  Specs: <span className="font-medium">{product.specs}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
