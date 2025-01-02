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
    <div className="p-6 mt-20 bg-gradient-to-r from-gray-900 via-gray-800 to-black flex flex-col gap-4 w-full">
      <h2 className="text-2xl font-bold text-center mb-4">Manage Best Sellers</h2>
      <table className="w-full bg-gray-200 border-collapse border border-gray-300 text-black rounded">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Category</th>
            <th className="border border-gray-300 px-4 py-2">Best Seller</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td className="border border-gray-300 px-4 py-2">
                {category.name}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {category.is_best_seller ? "Yes" : "No"}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="px-4 py-2 bg-dusty text-white rounded"
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
