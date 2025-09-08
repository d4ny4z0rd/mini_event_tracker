"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      const data = await res.json();
      setError(data.error || "Failed to register");
    }
  }

  const handlePush = () => {
    router.push("/signin");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-500">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-white shadow-lg rounded-2xl px-8 py-10 w-full max-w-sm text-black gap-4"
      >
        <h1 className="text-2xl font-bold text-center mb-10">Task Tracker</h1> 
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded border-white"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded border-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded border-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="text-white py-2 rounded bg-blue-600 hover:cursor-pointer"
        >
          Sign Up
        </button>
        <h1 className="text-black mt-4 text-center hover:underline hover:cursor-pointer" onClick={handlePush}>Already have an account?</h1>
      </form>
    </div>
  );
}
