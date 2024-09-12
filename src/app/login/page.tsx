"use client"
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/UserContext";

export default function LoginPage() {
  const {  login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#303a91]">
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg w-80">
        <h1 className="text-2xl font-semibold text-[#323393] text-center mb-6">
          LOGIN HERE
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
            <p>Dont have an account? </p>
            <Link href={"/register"} className="cursor-pointer flex justify-between underline">Register</Link>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-red-600 to-blue-600 text-white font-semibold rounded-lg shadow-md hover:from-red-500 hover:to-blue-400 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
