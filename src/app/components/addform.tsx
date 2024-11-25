"use client";
import React, { useState } from "react";
import { db } from "../config/firebase";
import { addDoc, collection } from "firebase/firestore";

const AddProductForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    specs: "",
    category: "",
    color: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const productsRef = collection(db, "products");
      await addDoc(productsRef, formData);
      setMessage("Product added successfully!");
      setFormData({
        name: "",
        description: "",
        image: "",
        specs: "",
        category: "",
        color: "",
      });
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
      {message && <p className={`text-center mb-4 ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>{message}</p>}
      
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
            Product Image URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="e.g., https://example.com/product.jpg"
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
            <option value="" disabled>Select a category</option>
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
