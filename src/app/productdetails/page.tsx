"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Use Next.js router hook for navigation
import { supabase } from "../supabaseClient";

interface Product {
  id: string;
  name: string;
  image_url: string; // Assuming you renamed this field from 'image' to 'image_url'
  description: string;
  category: string;
}

const ProductDetailPage: React.FC = () => {
  const router = useRouter(); // Using next/router's useRouter hook for navigation
  const { id } = router.query; // Get product ID from the URL query

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!id) return; // Wait for the ID to be available

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
        console.error("Error loading products:", err);
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
      <img src={product.image_url} alt={product.name} className="w-full h-auto" />
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <button onClick={() => router.push('/products')}>Back to Products</button>
    </div>
  );
};

export default ProductDetailPage;
