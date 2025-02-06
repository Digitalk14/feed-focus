"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Ad, Button, ButtonCancel, InputText, Spinner } from "@/components";
import { AddAdsToFeed } from "@/widgets/add-ads-to-feed";
import { getAds, updateFeed } from "@/utils";
import Link from "next/link";

export const EditFeedUIForm = ({
  feedId,
  title,
  description,
  ads,
  userId,
}: {
  feedId: string;
  title: string;
  description: string;
  ads: any[] | null;
  userId: string | undefined;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [allAdsList, setAllAdsList] = useState<Ad[]>([]);
  const [selectedAds, setSelectedAds] = useState<Ad[]>(ads || []);
  const updateFeedHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const adsIds = selectedAds.map((ad) => ad.id);
    const { updatedFeedResult, updatedFeedError } = await updateFeed(
      feedId,
      newTitle,
      newDescription,
      adsIds
    );
    if (updatedFeedError) {
      toast.error(JSON.stringify(updatedFeedError));
    }
    setIsLoading(false);
    toast.success("Feed created successfully");
    redirect("/feeds");
  };
  const isSubmitDisabled = !newTitle || !newDescription;
  useEffect(() => {
    const fetchAds = async () => {
      if (isEditing && !allAdsList.length) {
        const { adsList, adsListError } = await getAds(userId);
        if (adsListError || !adsList) {
          return;
        }
        setAllAdsList(adsList);
      }
    };
    fetchAds();
  }, [isEditing, allAdsList]);
  return (
    <DndProvider backend={HTML5Backend}>
      <form onSubmit={updateFeedHandler}>
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
        {isEditing && (
          <AddAdsToFeed
            adsList={allAdsList}
            callback={setSelectedAds}
            preselectedAds={ads}
          />
        )}
        {!isEditing && ads && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mb-4">
            {ads.map((ad) => (
              <Link href={`/ads/${ad.id}`} key={ad.id}>
                <div
                  key={ad.id}
                  className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-semibold text-lg mb-2">{ad.title}</h3>
                  {ad.description && (
                    <p className="text-gray-600 text-sm">{ad.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
        <div className="flex justify-start gap-4">
          {isEditing ? (
            <>
              <Button
                disabled={isSubmitDisabled}
                type="submit"
                onClick={() => {}}
              >
                {isLoading ? <Spinner /> : "Save"}
              </Button>
              <ButtonCancel onClick={() => setIsEditing(false)}>
                Cancel
              </ButtonCancel>
            </>
          ) : (
            <div className="flex gap-4">
              <div
                className="flex max-w-60 px-4 py-2 items-center justify-center bg-[#585dff] text-white border border-[#e0e0e0] rounded-lg shadow-sm cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </div>
              <a
                target="_blank"
                href={`${window.location.origin}/content/nstagram/${feedId}`}
                className="flex max-w-60 px-4 py-2 items-center justify-center bg-[#ffffff] text-[#585dff] border border-[#585dff] rounded-lg shadow-sm cursor-pointer"
              >
                Check Feed
              </a>
            </div>
          )}
        </div>
      </form>
    </DndProvider>
  );
};
