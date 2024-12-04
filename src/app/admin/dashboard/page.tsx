"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data?.user) {
        router.push("/admin/login");
        return;
      }

      setUser(data.user); // Set the user data
      setIsLoading(false);
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
        <h2 className="text-2xl mb-6">Welcome, {user?.email || "Admin"}!</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/admin/products">
            <div className="bg-dusty p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Manage Products</h3>
            </div>
          </Link>

          <Link href="/admin/add-product">
            <div className="bg-dusty p-6 shadow-xl rounded">
              <h3 className="font-bold text-lg mb-4">Add Products</h3>
            </div>
          </Link>

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
