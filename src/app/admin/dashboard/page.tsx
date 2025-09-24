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

      setUser(data.user);
      setIsLoading(false);
    };

    fetchUser();
  }, [router]);

  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  mt-20 ">
      {/* Content */}
      <div className="p-6 w-full">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:4xl text-forest font-bold mb-8">Welcome, {user?.email || "Admin"}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full text-center">
          <Link href="/admin/products">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Manage Products</h3>
            </div>
          </Link>

          <Link href="/admin/products/new">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Add Products</h3>
            </div>
          </Link>
          <Link href="/admin/news">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Manage News</h3>
            </div>
          </Link>
          <Link href="/admin/bestsellers">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Manage Bestsellers</h3>
            </div>
          </Link>

          <Link href="/admin/messages">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Messages</h3>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="bg-dusty p-6 shadow-xl rounded-3xl">
              <h3 className="font-bold text-lg mb-4">Settings</h3>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
