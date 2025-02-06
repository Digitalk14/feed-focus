"use client";

import { signup } from "@/utils";
import { toast } from "react-toastify";

export const SignupForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const { signupError } = await signup(formData);
    if (signupError) {
      toast.error(signupError.message);
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
        className="w-full py-3 px-4 h-12 bg-[#585DFF] text-white rounded-full hover:opacity-90 transition-opacity"
      >
        SIGNUP
      </button>
    </form>
  );
};
