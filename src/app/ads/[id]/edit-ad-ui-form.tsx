"use client";

import Link from "next/link";
import { useState, FormEvent } from "react";
import { InputText, Button, Spinner } from "@/components";
import { updateAd } from "@/utils";
import { toast } from "react-toastify";

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

  const updateAdHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const { updateResult } = await updateAd(adId, newTitle, newDescription);
    if (updateResult.status === 200) {
      setIsEditing(false);
    } else {
      toast.error("Failed to update ad");
    }
    setIsLoading(false);
  };
  const extractImageName = (url: string) => {
    const urlParts = url.split("&name=");
    return urlParts[1];
  };
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
          {signedUrls.map((mediaData: any, index: number) => (
            <div key={mediaData.id} className="relative w-[200px] h-[300px]">
              <img
                src={mediaData.signedUrl || ""}
                alt={`${title} - Image ${index + 1}`}
                className="object-cover rounded-lg w-full h-full"
              />
              <p className="absolute bottom-0 left-0  bg-black-300 text-white px-2 py-1 rounded-lg">
                {extractImageName(mediaData.path)}
              </p>
            </div>
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
          <Button type="submit" onClick={() => {}}>
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
