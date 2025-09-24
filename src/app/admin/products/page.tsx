"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  color: string;
  specs: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("id, name");

      if (error) {
        setError("Failed to fetch categories.");
        console.error(error.message);
      } else {
        setCategories(data || []);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products based on selected category
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      let query = supabase
        .from("products")
        .select("id, name, description, color, specs, category_id");

      if (selectedCategory) {
        query = query.eq("category_id", selectedCategory);
      }

      const { data, error } = await query;

      if (error) {
        setError("Failed to fetch products. Please try again.");
        console.error(error.message);
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
  };

  const handleSave = async () => {
    if (!editingProduct) return;

    const { error } = await supabase
      .from("products")
      .update({
        name: editingProduct.name,
        description: editingProduct.description,
        color: editingProduct.color,
        specs: editingProduct.specs,
      })
      .eq("id", editingProduct.id);

    if (error) {
      alert("Failed to update product.");
    } else {
      alert("Product updated successfully!");
      setEditingProduct(null);
      // Refresh the product list
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
  };

  const handleDelete = async () => {
    if (!editingProduct) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", editingProduct.id);

    if (error) {
      alert("Failed to delete product.");
    } else {
      alert("Product deleted successfully!");
      setEditingProduct(null);
      // Refresh the product list
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden  mt-10 ">
      <div className="w-full p-6 flex flex-col gap-4">
       <div className="flex flex-row justify-center items-center gap-12 py-6 px-3">
        <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-forest  font-bold text-center">Products</h1>
        <div className=" ">
          <Link
            href={"/admin/products/new"}
            className="bg-white/50 text-forest hover:bg-forest hover:text-white px-6 py-4 rounded-full text-lg shadow-md"
          >
            {" "}
            +new
          </Link>
          </div>
          </div>
         

        {error && <p className="text-center text-red-500">{error}</p>}

        <div className="mb-2 item-center justify-center">
          <label htmlFor="category" className="block text-xl  text-forest mb-2">
            Filter by Category
          </label>
          <select
            id="category"
            className="px-4 py-2 border border-forest bg-white/40 text-black rounded-xl w-1/2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.length === 0 ? (
              <option value="" disabled>
                No categories available
              </option>
            ) : (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-600">No products available.</p>
        ) : (
          <div className="w-full overflow-mx-auto">
            <table className="border-collapse bg-white/50 shadow-md rounded-lg overflow-hidden w-full">
              <thead>
                <tr className="bg-dusty text-white">
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Color</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b text-black">
                    <td className="py-3 px-4">{product.name}</td>
                    <td className="py-3 px-4">{product.color}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-dusty hover:underline font-semibold"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {editingProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-20">
            <div className="bg-dusty p-6 rounded-lg shadow-lg w-full ">
              <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
              <form>
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Description:
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        description: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Color:
                  <input
                    type="text"
                    value={editingProduct.color}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        color: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <label className="block mb-2">
                  Specs:
                  <input
                    type="text"
                    value={editingProduct.specs}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        specs: e.target.value,
                      })
                    }
                    className="block w-full bg-gray-200 text-black border rounded-md px-3 py-2 mt-1"
                  />
                </label>
                <div className="flex justify-between gap-3 mt-4 px-10">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded-2xl"
                  >
                    Delete
                  </button>
                  <div className="flex flex-row space-x-10">
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="bg-white text-gray-700 px-4 py-2 rounded-2xl"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="bg-forest text-white px-4 py-2 rounded-2xl ml-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
