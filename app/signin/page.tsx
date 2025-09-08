"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
        return;
      }

      const data = await res.json();
      console.log(data); 
      console.log("Logged in successfully");

      setEmail("");
      setPassword("");

      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    }
  }

  const handlePush = () => {
    router.push("/signup");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-sm"
      >
        <h1 className="text-black text-center mb-8 text-2xl font-bold">Task Tracker</h1>
        
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300 text-gray-900"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 hover:cursor-pointer px-4 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
        <h1 className="text-black mt-10 text-center hover:underline hover:cursor-pointer" onClick={handlePush}>Create account?</h1>
      </form>
    </div>
  );
}
