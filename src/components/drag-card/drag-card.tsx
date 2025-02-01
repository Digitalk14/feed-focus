"use client";

import { useDrag } from "react-dnd";

export interface Ad {
    id: string;
    title: string;
    updated_at: string;
    description: string;
    media_url: string;
  }

export const DragCard = ({
    ad,
    type,
    onRemove,
  }: {
    ad: Ad;
    type: "available" | "added";
    onRemove?: (ad: Ad) => void;
  }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: "ad",
      item: { ...ad, sourceType: type }, // Add source type to identify where the ad came from
      end: (item, monitor) => {
        if (!monitor.didDrop() && type === "added" && onRemove) {
          onRemove(ad);
        }
      },
      collect: (monitor: any) => ({
        isDragging: monitor.isDragging(),
      }),
    }));
  
    return (
      <>
        {drag(
          <div
            className={`p-4 mb-2 border rounded cursor-move ${
              isDragging ? "opacity-50" : ""
            } ${type === "available" ? "bg-white" : "bg-blue-50"}`}
          >
            {ad.title}
          </div>
        )}
      </>
    );
  };