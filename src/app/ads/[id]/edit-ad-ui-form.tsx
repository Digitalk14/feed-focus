"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import {
  InputText,
  Button,
  Spinner,
  ImageUpload,
  UploadedImage,
} from "@/components";
import { updateAd, uploadFile, preparePreloadedFiles } from "@/utils";
import { toast } from "react-toastify";
import { MAX_IMAGES } from "@/lib";
import { PreloadedImages } from "@/components/image-upload/preloaded-images";
interface EditAdUIFormProps {
  adId: string;
  title: string;
  description: string;
  signedUrls: any[];
  updated_at: string;
}

export const EditAdUIForm = ({
  adId,
  title,
  description,
  signedUrls,
  updated_at,
}: EditAdUIFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);
  const [preloadedFiles, setPreloadedFiles] = useState<File[]>(signedUrls);
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

  const handleAddFiles = async () => {
    const filePaths: any[] = [];
    await Promise.all(
      uploadedFiles.map(async (file) => {
        const { fileData, fileError } = await uploadFile(adId, file);
        if (fileError) {
          // fileError.push(fileError);
          console.log(fileError);
        } else {
          filePaths.push(fileData);
        }
      })
    );
    return { filePaths };
  };

  const updateAdHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { filePaths } = await handleAddFiles();
    const { preparedPreloadedFiles } = preparePreloadedFiles(preloadedFiles);
    const allFiles = [...preparedPreloadedFiles, ...filePaths];
    const { updateResult } = await updateAd(
      adId,
      newTitle,
      newDescription,
      allFiles
    );
    if (updateResult.status === 200) {
      setIsEditing(false);
    } else {
      toast.error("Failed to update ad");
    }
    setIsLoading(false);
  };

  const handleRemoveNewFile = (indexToRemove: number) => {
    setUploadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };

  const handleRemovePreloadedFile = (indexToRemove: number) => {
    setPreloadedFiles((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
  };
  const isSaveButtonDisabled =
    isLoading ||
    preloadedFiles.length + uploadedFiles.length < 1 ||
    newTitle.length < 1 ||
    newDescription.length < 1;
  return (
    <form onSubmit={updateAdHandler}>
      <div className="w-full mx-auto pl-6 pr-6">
        <Link
          href="/ads"
          className="text-[#585DFF] hover:text-blue-600 mb-4 block"
        >
          {"<"} Back
        </Link>
        <div className="flex flex-col gap-2 mb-4">
          {isEditing ? (
            <InputText
              name="title"
              value={newTitle}
              onChange={(value) => setNewTitle(value)}
              label="Title"
            />
          ) : (
            <h1 className="text-3xl font-bold">{newTitle}</h1>
          )}
        </div>

        {/* Image gallery */}
        <div className="flex flex-wrap gap-4 mb-6 overflow-x-auto">
          {isEditing &&
            preloadedFiles.length + uploadedFiles.length < MAX_IMAGES && (
              <ImageUpload onFilesSelected={handleFilesSelected} />
            )}
          {uploadedFiles.map((file, index) => (
            <UploadedImage
              key={file.name + index}
              file={file}
              index={index}
              handleRemoveFile={handleRemoveNewFile}
              isEditing={isEditing}
            />
          ))}
          {preloadedFiles.map((mediaData: any, index: number) => (
            <PreloadedImages
              isEditing={isEditing}
              handleRemoveFile={handleRemovePreloadedFile}
              mediaData={mediaData}
              key={mediaData.id}
              index={index}
            />
          ))}
        </div>
        <div className="space-y-4 mb-4">
          {isEditing ? (
            <InputText
              name="description"
              value={newDescription}
              onChange={(value) => setNewDescription(value)}
              label="Description"
            />
          ) : (
            <p className="text-gray-700 text-lg">{newDescription}</p>
          )}
          <p className="text-sm text-gray-500">
            Updated at: {new Date(updated_at).toLocaleDateString()}
          </p>
        </div>
        {isEditing ? (
          <Button disabled={isSaveButtonDisabled} type="submit" onClick={() => {}}>
            {isLoading ? <Spinner /> : "Save"}
          </Button>
        ) : (
          <div
            className="flex max-w-60 px-4 py-2 items-center justify-center bg-[#585dff] text-white border border-[#e0e0e0] rounded-lg shadow-sm cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </div>
        )}
      </div>
    </form>
  );
};
