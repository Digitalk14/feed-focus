"use client";

import React, { useState } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

export const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      className="flex px-4 py-2 items-center justify-center bg-[#585dff] text-white border border-[#e0e0e0] rounded-lg shadow-sm cursor-pointer"
      onClick={onClick}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
};
