"use client";
import { supabase } from "../../supabaseClient";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  specs: string;
  color: string;
}

export default function Page() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
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
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setError("Product not found");
          return;
        }

        setProduct(data);
      } catch (err) {
        setError("Failed to fetch product");
        console.error(err); // Log the error to the console
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
            <img
              src={image}
              alt={product.name}
              className="w-1/2 h-auto object-contain"
            />
          </div>

          <div className="w-1/2">
            <h3 className="text-3xl text-nude font-bold mb-4">{product.name}</h3>
            <p className="text-lg text-nude mb-4">{product.description}</p>
            <p className="text-md text-nude mb-2">Category: {product.category}</p>
            <p className="text-md text-nude mb-2">Color: {product.color}</p>
            <p className="text-md text-nude mb-4">Specs: {product.specs}</p>
          </div>
        </div>

        <div className="mt-8">
          <a href="/shop" className="text-nude">
            Back to Products
          </a>
        </div>
      </div>
    </div>
  );
}
