"use client";

import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { DragCard, Ad } from "@/components";

export const AddAdsToFeed = ({
  adsList,
  preselectedAds,
  callback,
}: {
  adsList: Ad[];
  preselectedAds: Ad[] | null;
  callback: (ads: Ad[]) => void;
}) => {
  const [addedAds, setAddedAds] = useState<Ad[]>(preselectedAds || []);

  useEffect(() => {
    callback(addedAds);
  }, [addedAds]);

  const [{ isOver: isOverSelected }, dropSelected] = useDrop(
    () => ({
      accept: "ad",
      drop: (item: Ad & { sourceType?: string }) => {
        if (item.sourceType === "added") return; // Ignore if already in selected
        setAddedAds([...addedAds, item]);
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [addedAds]
  );

  const [{ isOver: isOverAvailable }, dropAvailable] = useDrop(
    () => ({
      accept: "ad",
      drop: (item: Ad & { sourceType?: string }) => {
        if (item.sourceType === "available") return; // Ignore if already in available
        setAddedAds(addedAds.filter((ad) => ad.id !== item.id));
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [addedAds]
  );

  const availableAds = adsList.filter(
    (ad) => !addedAds.find((addedAd) => addedAd.id === ad.id)
  );

  return (
    <div className="flex flex-col gap-2 h-full w-full mt-2 mb-4">
      <p className="text-sm text-[#374151]">
        Select ads to add to your feed
        <span className="text-red-500">*</span>
      </p>
      <div className="flex gap-4 h-full w-full">
        {/* Available ads */}
        {dropAvailable(
          <div
            className={`w-[50%] p-4 border rounded-lg ${
              isOverAvailable ? "bg-blue-50" : "bg-white"
            }`}
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Available Ads</h2>
            <div
              className="space-y-2 "
              style={{
                height: "300px",
                overflowY: "auto",
              }}
            >
              {availableAds.map((ad) => (
                <DragCard key={ad.id} ad={ad} type="available" />
              ))}
            </div>
          </div>
        )}

        {/* Drop zone for selected ads */}
        {dropSelected(
          <div
            className={`w-[50%] p-4 border rounded-lg ${
              isOverSelected ? "bg-blue-50" : "bg-gray-50"
            }`}
            style={{
              width: "40%",
            }}
          >
            <h2 className="text-lg font-semibold mb-4">Selected Ads</h2>
            <div
              className="space-y-2"
              style={{
                height: "300px",
                overflowY: "auto",
              }}
            >
              {addedAds.map((ad) => (
                <DragCard key={ad.id} ad={ad} type="added" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
