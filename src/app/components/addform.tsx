"use client";

import React, { useState } from "react";
import { supabase } from "../supabaseClient";

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    specs: "",
    category: "",
    color: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
  
    const fileName = `${Date.now()}_${imageFile.name}`;
    
    // Upload the image to the 'product-images' bucket
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("product-images")
      .upload(fileName, imageFile);
  
    if (uploadError) {
      console.error("Image upload error:", uploadError);
      setMessage("Failed to upload image. Please try again.");
      return null;
    }
  
    // Retrieve the public URL for the uploaded image
    const { data: publicUrlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName);
  
    if (!publicUrlData) {
      console.error("Error fetching public URL.");
      setMessage("Failed to fetch image URL.");
      return null;
    }
  
    return publicUrlData.publicUrl;
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Upload the image first
      const imageUrl = await uploadImage();

      if (!imageUrl) {
        setLoading(false);
        return;
      }

      // Update the form data with the image URL
      const finalData = { ...formData, image: imageUrl };

      // Insert the product into the database
      const { data, error } = await supabase.from("products").insert([finalData]);

      if (error) {
        throw error;
      }

      setMessage("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        image: "",
        specs: "",
        category: "",
        color: "",
      });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add a New Product</h2>
      {message && (
        <p
          className={`text-center mb-4 ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="e.g., Sleek Chair"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter a brief description..."
            rows={4}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">
            Product Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="specs" className="block text-gray-700 font-semibold mb-2">
            Specifications
          </label>
          <textarea
            id="specs"
            name="specs"
            value={formData.specs}
            onChange={handleInputChange}
            placeholder="Enter product specifications..."
            rows={3}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="Furniture">Furniture</option>
            <option value="Electronics">Electronics</option>
            <option value="Decor">Decor</option>
          </select>
        </div>

        <div>
          <label htmlFor="color" className="block text-gray-700 font-semibold mb-2">
            Color
          </label>
          <input
            type="text"
            id="color"
            name="color"
            value={formData.color}
            onChange={handleInputChange}
            placeholder="e.g., Black, White, Oak"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-300 hover:bg-primary-dark text-white py-2 px-4 rounded-lg transition duration-300 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
