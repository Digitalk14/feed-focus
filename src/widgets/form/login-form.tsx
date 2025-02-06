"use client";

import { login } from "@/utils";
import Link from "next/link";
import { toast } from "react-toastify";

export const LoginForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { loginError } = await login(formData);
    if (loginError) {
      toast.error(loginError.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="email" className="block text-gray-500 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#585DFF] outline-none transition-colors text-[#333]"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-gray-500 mb-2">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-3 py-2 border-b-2 border-gray-200 focus:border-[#585DFF] outline-none transition-colors text-[#333]"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 bg-[#585DFF] h-12 text-white rounded-full hover:opacity-90 transition-opacity"
      >
        LOGIN
      </button>

      <p className="text-center text-gray-500 mt-8">
        {/* eslint-disable-next-line */}
        Don't have an account? 
        <Link href="/signup" className="text-[#585DFF] hover:underline">
          Sign Up
        </Link>
      </p>
    </form>
  );
};
