import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  description: string;
 
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  description,
}) => {
  return (
    <div className="border rounded-lg bg-gray-300 hoverflow-hidden shadow hover:shadow-lg cursor-pointer transform transition duration-300 hover:scale-105 hover:translate-y-2">
      {/* Card Image */}
      <div
        className="w-full h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        
      />
      
      <div className="p-4">
        <h3 className="text-lg text-black font-bold">{name}</h3>
        <p className="text-black mt-2">{description}</p>
              </div>
    </div>
  );
};

export default ProductCard;
