"use client";
import { supabase } from "../../supabaseClient";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category_id: string;
  specs: string;
  color: string;
}

export default function Page() {
  const [product, setProduct] = useState<Product | null>(null);
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(name)") 
          .eq("id", id)
          .single();

        if (error || !data) {
          setError("Product not found");
          return;
        }

        setProduct({
          id: data.id,
          name: data.name,
          image: data.image,
          description: data.description,
          category_id: data.category_id,
          specs: data.specs,
          color: data.color,
        });

        setCategoryName(data.categories?.name || "Unknown Category");
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return notFound();
  }

  const image = product.image || "/default-image.jpg";

  return (
    <div className="bg-forest">
      <div className="container mt-20 bg-forest rounded-lg shadow-xl mx-auto p-8">
        <div className="flex flex-col gap-16">
          <div className="flex items-center justify-center">
            <Image
              src={image}
              alt={product.name}
              width={500}  
              height={500} 
              className="w-full h-auto object-contain"
              layout="intrinsic" // This allows the image to maintain its aspect ratio
            />
          </div>

          <div className="w-1/2">
            <h3 className="text-3xl text-nude font-bold mb-4">{product.name}</h3>
            <p className="text-lg text-nude mb-4">{product.description}</p>
            <p className="text-md text-nude mb-2">Category: {categoryName}</p>
            <p className="text-md text-nude mb-2">Color: {product.color}</p>
            <p className="text-md text-nude mb-4">Specs: {product.specs}</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/shop" className="text-dusty">
            Back to Products
          </a>
        </div>
      </div>
    </div>
  );
}
