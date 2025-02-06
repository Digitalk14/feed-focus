"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

export const ButtonCancel = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button
      className={`flex px-4 py-2 items-center justify-center bg-[#ffffff] text-[#585dff] border border-[#e0e0e0] rounded-lg shadow-sm`}
      onClick={onClick}
      type={type ?? "button"}
    >
      {children}
    </button>
  );
};
