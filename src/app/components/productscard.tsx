import React from "react";

interface ProductCardProps {
  name: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, image }) => {
  return (
    <div className=" rounded-lg flex flex-col justify-center items-center hoverflow-hidden shadow-xl cursor-pointer transform transition duration-300 hover:scale-105 hover:translate-y-2">
      <div
        className="w-full h-52 bg-contain bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="p-4 ">
        <h3 className="text-lg text-white font-bold">{name}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
