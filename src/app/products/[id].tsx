// /pages/products/[id].tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";  // Import useRouter for dynamic routing
import { supabase } from "../supabaseClient";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
}

const ProductDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;  // Access the dynamic product ID from the URL

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return;  // Don't fetch until the ID is available

    const fetchProductDetail = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found.</p>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <img src={product.image} alt={product.name} className="w-full h-auto" />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
    </div>
  );
};

export default ProductDetailPage;
