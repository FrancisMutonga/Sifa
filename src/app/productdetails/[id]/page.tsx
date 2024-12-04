
import { supabase } from "../../supabaseClient"; // Import your Supabase client
import { notFound } from "next/navigation"; // Import the Next.js built-in `notFound` function to handle missing pages

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

  return products.map((product: { id: number }) => ({
    id: product.id.toString(), 
  }));
}


export default async function Page({ params }: { params: { id: string } }) {
  
  const { id } = await params; 

 
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
      {/* Product Image */}
      <div className="flex flex-col  gap-16">
        <div className="flex items-center justify-center">
        <img
      src={image}
      alt={product.name}
      className="w-1/2 h-auto object-contain"
    />
        </div>
      
        {/* Product Details */}
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

      {/* Back to Products Button */}
      <div className="mt-8">
        <a href="/shop" className="text-nude">
          Back to Products
        </a>
      </div>

  
    </div>
    </div>
   
  );
}
