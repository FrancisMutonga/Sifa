import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
  description: string; // Keep description for displaying
  category: string; // Keep category for displaying
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  image,
  description,
  category,
}) => {
  return (
    <div className="border rounded-lg bg-dusty overflow-hidden shadow hover:shadow-lg cursor-pointer">
      <img src={image} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-500">{category}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
