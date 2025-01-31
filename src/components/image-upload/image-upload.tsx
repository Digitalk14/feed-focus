"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

interface ImageUploadProps {
  onFilesSelected: (files: File[]) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFilesSelected,
}) => {
  const [error, setError] = useState<string | null>(null);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Validate file size and type
      const validFiles = acceptedFiles.filter((file) => {
        if (file.size > MAX_FILE_SIZE) {
          setError(`File ${file.name} is too large. Maximum size is 5MB.`);
          return false;
        }
        // if (!file.type.startsWith("image/jpeg") ) {
        //   setError(`File ${file.name} is not a JPEG image.`);
        //   return false;
        // }
        return true;
      });

      if (validFiles.length > 0) {
        setError(null);
        onFilesSelected(validFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
      "image/avif": [".avif"],
    },
    multiple: true,
  });

  return (
    <div className="w-[200px]">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
          transition-colors duration-200 ease-in-out
          flex flex-col items-center justify-center
          h-[300px] cursor-pointer
        `}
      >
        <input {...getInputProps()} />
        <svg
          className="w-12 h-12 text-gray-400 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-center text-gray-600">
          {isDragActive ? "Drop files here" : "Drag & Drop files here"}
        </p>
        <p className="text-center text-gray-500 text-sm mt-2">or</p>
        <button
          type="button"
          className="mt-2 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
        >
          Browse Files
        </button>
        <p className="text-xs text-gray-500 mt-4 text-center">
          JPEG, maximum 3 files, maximum 10MB each
        </p>
      </div>

      {error && (
        <div className="mt-2 text-red-500 text-sm text-center">{error}</div>
      )}
    </div>
  );
};
