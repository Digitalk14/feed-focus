"use client";

import { useState, FormEvent, useEffect } from "react";
import {
  Main,
  ImageUpload,
  Spinner,
  InputText,
  ButtonRemove,
} from "@/components";
import { postAd } from "@/utils";
import { Bounce, toast } from "react-toastify";

const MAX_FILES = 2;

export const CreateAdWidget = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [errors, setErrors] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const { errors } = await postAd(title, description, uploadedFiles);
    if (errors) {
      const messages = errors.map((error) => error.message).join(", ");
      toast.error(`Error uploading files: ${messages}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
    setIsLoading(false);
  };

  const isSubmitDisabled = !title || !description || uploadedFiles.length === 0;

  return (
    <Main>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Create New Ad</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <InputText
            name="title"
            value={title}
            onChange={setTitle}
            label="Name"
          />
          <InputText
            name="description"
            value={description}
            onChange={setDescription}
            label="Description"
          />
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
                <ButtonRemove onClick={() => handleRemoveFile(index)} />
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
            disabled={isSubmitDisabled || isLoading}
            className={`flex items-center justify-center border border-[#e0e0e0] bg-[#585dff] text-white cursor-pointer hover:bg-[#4146ff] rounded-lg shadow-sm w-[200px] h-[50px] ${
              isSubmitDisabled && "opacity-50"
            }`}
          >
            {isLoading ? <Spinner /> : "Save"}
          </button>
        </form>
      </div>
    </Main>
  );
};
