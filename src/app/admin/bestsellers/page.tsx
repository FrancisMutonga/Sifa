"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; 

interface Category {
  id: string;
  name: string;
  is_best_seller: boolean;
}

const BestSellers: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories") 
        .select("*");

      if (error) {
        console.error("Error fetching categories:", error);
        return;
      }

      setCategories(data || []);
    };

    fetchCategories();
  }, []);

 
  const toggleBestSeller = async (id: string, isBestSeller: boolean) => {
    const { error } = await supabase
      .from("categories") // Replace with your actual table name
      .update({ is_best_seller: !isBestSeller })
      .eq("id", id);

    if (error) {
      console.error("Error updating best seller status:", error);
      return;
    }

    // Update the local state after the successful update
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, is_best_seller: !isBestSeller } : cat
      )
    );
  };

  return (
    <div className="p-6 mt-10  flex flex-col gap-4 w-full">
      <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl text-forest font-bold text-center mb-4">Manage Best Sellers</h2>
      <table className="w-full bg-white/50 text-black rounded-md">
        <thead>
          <tr>
            <th className=" px-4 py-2 text-dusty text-xl">Category</th>
            <th className=" px-4 py-2 text-dusty text-xl">Best Seller</th>
            <th className="px-4 py-2 text-dusty text-xl">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="border-b border-gray-200 text-black">
              <td className="px-6 py-4">
                {category.name}
              </td>
              <td className="px-4 py-2 text-center">
                {category.is_best_seller ? "Yes" : "No"}
              </td>
              <td className=" px-4 py-2 text-center">
                <button
                  className="px-6 py-2 bg-dusty text-white rounded-2xl"
                  onClick={() =>
                    toggleBestSeller(category.id, category.is_best_seller)
                  }
                >
                  {category.is_best_seller ? "Remove" : "Add"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BestSellers;
