import React from "react";
import Image from "next/image";

interface ProductCardProps {
  name: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image }) => {
  return (
    <div className="rounded-lg flex flex-col justify-center items-center shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 hover:translate-y-2">
      <div className="w-full h-52 relative">
        <Image
          src={image}
          alt={name}
          layout="fill" 
          objectFit="contain" 
          className="rounded-t-lg"
        />
      </div>

      <div className="p-4">
        <h3 className="text-xl  text-dusty font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
