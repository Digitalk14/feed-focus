"use client";
import React from "react";

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <main className="flex-1 p-8">{children}</main>;
};
