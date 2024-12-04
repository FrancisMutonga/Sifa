"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import Link from "next/link";
import { Session } from "@supabase/supabase-js";  // Import the correct type

const Dashboard: React.FC = () => {
  const router = useRouter();
  
  // Replace `any` with `Session` type
  const [user, setUser] = useState<Session | null>(null); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: sessionUser, error } = await supabase.auth.getUser();  // Use await to get the resolved user data

      if (error || !sessionUser) {
        router.push("/admin/login");
      } else {
        setUser(sessionUser);  // Set the user to the resolved session
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-black mt-20">
      <div className="p-4 text-white flex justify-between">
        <h1 className="text-3xl">Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <div className="p-6">
        {/* Display welcome message with the user's email */}
        <h2 className="text-2xl mb-6">
          Welcome, {user?.user?.email || "Admin"}!
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {/* View All Products */}
          <Link href="/admin/products">
            <div className="bg-dusty p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Manage Products</h3>
            </div>
          </Link>

          {/* Add Product */}
          <Link href="/admin/add-product">
            <div className="bg-dusty p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Add Products</h3>
            </div>
          </Link>

          {/* Settings */}
          <Link href="/admin/settings">
            <div className="bg-dusty p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Settings</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
