"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button = ({ children, onClick, type, disabled }: ButtonProps) => {
  return (
    <button
      className={`flex px-4 py-2 items-center justify-center ${
        disabled
          ? 'bg-gray-400 cursor-not-allowed opacity-60'
          : 'bg-[#585dff] cursor-pointer hover:bg-[#4146ff]'
      } text-white border border-[#e0e0e0] rounded-lg shadow-sm`}
      onClick={onClick}
      type={type ?? "button"}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
