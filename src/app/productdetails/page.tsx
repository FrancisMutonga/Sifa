"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../config/firebase";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import ProductCard from "../components/productscard";
import Carousel from "../components/carousel";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  specs: string;
  category: string;
  color: string;
}

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        console.log("Fetching product with ID:", productId);
        setLoading(true);

        // Fetch the current product
        const productRef = doc(db, "products", productId);
        const productSnapshot = await getDoc(productRef);

        if (productSnapshot.exists()) {
          const productData = productSnapshot.data() as Product;
          console.log("Product Data:", productData);
          setProduct({ id: productId, ...productData });

          // Fetch similar products
          const productsRef = collection(db, "products");
          const q = query(productsRef, where("category", "==", productData.category));
          const querySnapshot = await getDocs(q);

          const similarProductsData: Product[] = querySnapshot.docs
            .filter((doc) => doc.id !== productId)
            .map((doc) => ({ id: doc.id, ...doc.data() } as Product));

          console.log("Similar Products:", similarProductsData);
          setSimilarProducts(similarProductsData);
        } else {
          setError("Product not found.");
          console.error("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product details.");
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="container mx-auto py-8">
      {product && (
        <>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-xl mt-2">{product.description}</p>
              <div className="mt-4">
                <h3 className="font-semibold">Specifications:</h3>
                <p>{product.specs}</p>
              </div>
              <div className="mt-4">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Color:</strong> {product.color}</p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Similar Products</h2>
            <Carousel>
              {similarProducts.map((item) => (
                <ProductCard
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  category={item.category}
                  onClick={() => window.location.href = `/product/${item.id}`}
                />
              ))}
            </Carousel>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetailsPage;
