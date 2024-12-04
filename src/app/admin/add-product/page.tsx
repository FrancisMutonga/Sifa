"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [category, setCategory] = useState("");
  const [specs, setSpecs] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Used for preview before upload
  const router = useRouter();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file); // Set the file for preview

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = `images/${fileName}`;

      // Upload image to Supabase Storage
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (error) {
        console.error("Error uploading image", error);
        return;
      }

      // Fetch the public URL of the uploaded image
      const publicUrlData = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      if (publicUrlData.data?.publicUrl) {
        setImageUrl(publicUrlData.data.publicUrl);  // Successfully set the image URL
      } else {
        console.error("Error: publicUrl not found.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh

    // Check if all fields are filled in and if the image URL is set
    if (!name || !description || !color || !category || !specs || !imageUrl) {
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
          category,
          specs,
          image_url: imageUrl,
          created_at: new Date(),
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6 mt-20 flex flex-col items-center justify-center ">
      <h2 className="text-2xl mb-4">Add New Product</h2>

      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-black p-6 shadow-md text-black grid-place-items-center rounded">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            placeholder="Color"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />
          <textarea
            value={specs}
            onChange={(e) => setSpecs(e.target.value)}
            placeholder="Specifications"
            className="w-full mb-4 bg-gray-200 p-2 border border-gray-300 rounded"
          />
          
          {/* Image Upload Section */}
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-2 bg-gray-200 border border-gray-300 rounded"
            />
            
            {/* Display Preview of Image Before Upload */}
            {imageFile && (
              <div className="mt-4">
                <img
                  src={URL.createObjectURL(imageFile)} // Display the file preview
                  alt="Image Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded mx-auto block"
          >
            Add Product
          </button>
        </form>
        
      </div>
    </div>
  );
};

export default AddProduct;
