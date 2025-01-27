"use client";

import { useState, FormEvent } from "react";
import { Main, ImageUpload } from "@/components";
import { uploadFiles } from "@/utils";

const MAX_FILES = 2;

export const CreateAdWidget = () => {
  const [title, setTitle] = useState("title");
  const [description, setDescription] = useState("description");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesSelected = (files: File[]) => {
    setUploadedFiles((prev) => {
      const newFiles = files.filter(
        (newFile) =>
          !prev.some((existingFile) => existingFile.name === newFile.name)
      );
      return [...prev, ...newFiles];
    });
  };

  const handleRemoveFile = (indexToRemove: number) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await uploadFiles(uploadedFiles);
  };

  const isSubmitDisabled = !title || !description || uploadedFiles.length === 0;
  
  return (
    <Main>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Create New Ad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Name<span className="text-red-500">*</span>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#585dff] focus:outline-none focus:ring-1 focus:ring-[#585dff]"
            />
          </label>

          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 my-4"
          >
            Description<span className="text-red-500">*</span>
            <input
              type="text"
              id="description"
              name="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#585dff] focus:outline-none focus:ring-1 focus:ring-[#585dff]"
            />
          </label>

          {/* Image previews */}
          <p className="text-sm font-medium text-gray-700 mt-4">
            Upload creatives<span className="text-red-500">*</span>
          </p>
          <div
            className="my-8 flex flex-row gap-4 overflow-x-auto"
            style={{ margin: "10px 0", overflowX: "auto" }}
          >
            {uploadedFiles.length <= MAX_FILES && (
              <ImageUpload onFilesSelected={handleFilesSelected} />
            )}
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  maxWidth: "200px",
                  maxHeight: "300px",
                  minWidth: "200px",
                  minHeight: "300px",
                }}
                className="relative"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="max-w-[200px] max-h-[300px] object-cover rounded-lg"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <button
                  type="button"
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    fontSize: "20px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: "5px",
                    cursor: "pointer",
                    width: "25px",
                    height: "25px",
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-[#333] rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                  onClick={() => handleRemoveFile(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            type="submit"
            style={{
              height: "50px",
              opacity: isSubmitDisabled ? 0.5 : 1,
              cursor: isSubmitDisabled ? "not-allowed" : "pointer",
            }}
            disabled={isSubmitDisabled}
            className={`flex items-center justify-center border border-[#e0e0e0] bg-[#585dff] text-white cursor-pointer hover:bg-[#4146ff] rounded-lg shadow-sm w-[200px] h-[50px] ${
              isSubmitDisabled && "opacity-50"
            }`}
          >
            Save
          </button>
        </form>
      </div>
    </Main>
  );
};
