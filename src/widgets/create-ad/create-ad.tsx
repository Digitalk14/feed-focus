"use client";

import { useState, FormEvent } from "react";
import {
  Main,
  ImageUpload,
  InputText,
  UploadedImage,
  SubmitButton,
} from "@/components";
import { postAd } from "@/utils";
import { Bounce, toast } from "react-toastify";
import { MAX_IMAGES } from "@/lib";

export const CreateAdWidget = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
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
            {uploadedFiles.length < MAX_IMAGES && (
              <ImageUpload onFilesSelected={handleFilesSelected} />
            )}
            {uploadedFiles.map((file, index) => (
              <UploadedImage
                key={`${index}-${file.name}`}
                file={file}
                index={index}
                handleRemoveFile={handleRemoveFile}
                isEditing={true}
              />
            ))}
          </div>
          <SubmitButton
            isSubmitDisabled={isSubmitDisabled}
            isLoading={isLoading}
          />
        </form>
      </div>
    </Main>
  );
};
