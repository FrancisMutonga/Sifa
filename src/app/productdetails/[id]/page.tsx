import { supabase } from "../../supabaseClient";
import { notFound } from "next/navigation";

interface Product {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  specs: string;
  color: string;
}

export async function generateStaticParams() {
  const { data: products, error } = await supabase
    .from("products")
    .select("id");

  if (error) {
    console.error("Error fetching product IDs:", error);
    return [];
  }

  return products.map((product: { id: string }) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: {
    id: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    return notFound();
  }

  const product: Product = data;

  const image = product.image ? product.image : "/default-image.jpg";

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
            <p className="text-md text-nude mb-2">
              Category: {product.category}
            </p>
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
