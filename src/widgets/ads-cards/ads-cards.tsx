"use client";

import { Card } from "@/components";
import Link from "next/link";
import { useState } from "react";
import { extractImagesPaths, deleteFiles, deleteAds } from "@/utils";
import { toast } from "react-toastify";

export const AdsCards = ({ adsList }: { adsList: any[] | null }) => {
  const [adsListState, setAdsListState] = useState<any[] | null>(adsList);
  const [selectedAds, setSelectedAds] = useState<any>(null);
  if (!adsListState) return null;
  const handleCheck = (id: string, checked: boolean) => {
    setSelectedAds((prev: any) => ({ ...prev, [id]: checked }));
  };
  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deleteAdsList = adsListState.filter((ad) => selectedAds[ad.id]);
    const imagesPaths = extractImagesPaths(deleteAdsList);
    const deleteIds = deleteAdsList.map((ad) => ad.id);
    const { deletionFileError } = await deleteFiles(
      imagesPaths
    );
    if (deletionFileError) {
      toast.error("Failed to delete files");
    }
    toast.success("Files deleted successfully");
    const { deleteError } = await deleteAds(deleteIds);
    if (deleteError) {
      toast.error("Failed to delete ads");
    }
    toast.success("Ads deleted successfully");
    setAdsListState(adsListState.filter((ad) => !deleteIds.includes(ad.id)));
  };
  return (
    <div className="mt-4">
      <div style={{ justifyContent: "flex-end" }} className="flex w-full">
        {selectedAds && Object.values(selectedAds).some((x) => x) && (
          <form onSubmit={handleDelete}>
            <button
              type="submit"
              className="bg-red-500 text-white px-4 py-2 rounded-md mb-4"
            >
              Delete
            </button>
          </form>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
        {adsListState?.map((ad) => (
          <Card
            key={ad.id}
            id={ad.id}
            onCheck={handleCheck}
            isChecked={selectedAds?.[ad.id]}
          >
            <Link href={`/ads/${ad.id}`}>
              <h3 className="text-lg font-semibold mb-2 text-[#333]">
                {ad.title}
              </h3>
              <p className="text-gray-600">{ad.description}</p>
              <p className="text-gray-600 text-sm">{ad.updated_at}</p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};
