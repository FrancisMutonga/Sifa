"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../supabaseClient";
import { Suspense } from "react";

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam.replace(/_/g, " ")));
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
    } else {
     
      const searchParams = new URLSearchParams(window.location.search);
      const redirectTo = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirectTo);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md bg-white/30 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 text-forest">
          Admin Login
        </h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-forest bg-white/40 rounded-xl "
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-xl border-forest bg-white/40"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" py-2 px-6 bg-white/60 text-forest rounded-full hover:bg-forest hover:text-white font-bold"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function SuspenseWrappedAdminLogin() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminLogin />
    </Suspense>
  );
}
