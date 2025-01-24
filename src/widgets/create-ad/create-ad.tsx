"use client";
import { useState } from "react";
import { Main, Button } from "@/components";
import { ImageUpload } from "@/components";

export const CreateAdWidget = () => {
  const [name, setName] = useState("");

  const handleFilesSelected = (files: File[]) => {
    // Handle the selected files here
    console.log("Selected files:", files);
  };

  return (
    <Main>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Create New Ad</h2>
        <form noValidate className="space-y-4">
          <div>
            <ImageUpload onFilesSelected={handleFilesSelected} />
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#585dff] focus:outline-none focus:ring-1 focus:ring-[#585dff]"
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center bg-[#585dff] text-white border border-[#e0e0e0] rounded-lg shadow-sm cursor-pointer w-[200px] h-[50px]"
          >
            Save
          </button>
        </form>
      </div>
    </Main>
  );
};
