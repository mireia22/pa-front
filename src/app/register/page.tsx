"use client"

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/UserContext";

export default function RegisterPage() {
  const {  register } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(username, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#303a91]">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-[#323393] text-center mb-6">
          REGISTER HERE
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-[#FEA002] rounded-lg focus:outline-none focus:border-[#f2662b] transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border-2 border-[#FEA002] rounded-lg focus:outline-none focus:border-[#f2662b] transition"
          />
          <div className="flex justify-between items-center">
          <p>Already have an account? </p>
          <Link href={"/login"} className="cursor-pointer flex justify-between underline">Login</Link>
          </div>
         
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-blue-400 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
