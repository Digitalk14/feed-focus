"use client";

import { InputText, Main, SubmitButton, Ad } from "@/components";
import { useState } from "react";
import { AddAdsToFeed } from "../add-ads-to-feed";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { createFeed } from "@/utils";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";


export const CreateFeedWidget = ({ adsList }: { adsList: any[] }) => {
  const [title, setTitle] = useState("New Feed");
  const [description, setDescription] = useState("New Feed Description");
  const [selectedAds, setSelectedAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const adsIds = selectedAds.map((ad) => ad.id);
    const { createdFeedResult, createdFeedError } = await createFeed(title, description, adsIds);
    if (createdFeedError) {
      toast.error(JSON.stringify(createdFeedError));
    }
    setIsLoading(false);
    toast.success("Feed created successfully");
    redirect("/feeds");
  };

  const isSubmitDisabled = !title || !description;

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Main>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Create New Feed</h2>
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
              <AddAdsToFeed adsList={adsList} callback={setSelectedAds} preselectedAds={[]} />
              <SubmitButton
                isSubmitDisabled={isSubmitDisabled}
                isLoading={isLoading}
              />
            </form>
          </div>
        </Main>
      </DndProvider>
    </>
  );
};
