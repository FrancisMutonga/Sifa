"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../supabaseClient";
import Image from "next/image";


interface Category {
  id: string;
  name: string;
}

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState(""); 
  const [specs, setSpecs] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]); 
  const router = useRouter();


  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("id, name");
      if (error) {
        console.error("Error fetching categories:", error);
      } else {
        setCategories(data || []); 
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `images/${fileName}`;

      
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image", error);
        return;
      }

     
      const publicUrlData = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (publicUrlData.data?.publicUrl) {
        setImageUrl(publicUrlData.data.publicUrl);  
      } else {
        console.error("Error: publicUrl not found.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
  
  
    if (!name.trim() || !description.trim() || !color.trim() || !category.trim() || !specs.trim() || !imageUrl.trim()) {
      alert("Please fill in all fields and upload an image.");
      return;
    }
  
    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          color,
          category_id: category,
          specs,
          image: imageUrl,
        },
      ]);
  
    if (error) {
      console.error("Error adding product", error);
    } else {
      alert("Product added successfully!");
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen  p-6 mt-10 flex flex-col items-center justify-center">
      <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-forest font-bold  mb-4">Add New Product</h2>

      <div className=" p-6 shadow-md text-black grid-place-items-center rounded-xl">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full mb-4 bg-white/30 p-2 border border-gray-300 rounded-xl"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-4 bg-white/30 p-2 border border-gray-300 rounded-xl"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            className="w-full mb-4 bg-white/30 p-2 border border-gray-300 rounded-xl"
          />

          {/* Category Dropdown */}
          <select
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-full mb-4 bg-white/30 p-2 border border-gray-300 rounded-xl"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <textarea
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder="Specifications"
            className="w-full mb-4 bg-white/30 p-2 border border-gray-300 rounded-xl"
          />

          {/* Image Upload Section */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 bg-white/30 border border-gray-300 rounded-xl"
            />

            {/* Display Preview of Image Before Upload */}
            {imageFile && (
              <div className="mt-4">
                <Image
                  src={URL.createObjectURL(imageFile)}
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-white/70 text-forest font-semibold px-6 py-2 rounded-full border border-forest mx-auto block"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};


export default AddProduct;