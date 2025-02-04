"use client";

import { useState } from "react";
import { Content } from "@/utils";
import { PexelIcon, LikesCommentsShare, AuthorAvatar, Ad } from "@/components";

export const NstagramView = ({
  content,
  adsList,
}: {
  content: Content;
  adsList: Ad[];
}) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  console.log(adsList);
  return (
    <div
      className="flex flex-col gap-4 max-w-[600px] mx-auto bg-white"
      style={{ maxWidth: "600px" }}
    >
      {content.photos.map((photo) => (
        <div key={photo.id} className="relative">
          <div className="relative">
            <div
              className="flex absolute top-1 left-1"
              style={{ top: "10px", left: "10px" }}
            >
              <AuthorAvatar author={photo.photographer} />
            </div>
            <img src={photo.src.portrait} alt={photo.alt!} />
            <PexelIcon />
          </div>
          <div className="flex flex-col gap-2 p-2">
            <div className="flex items-center gap-2">
              <LikesCommentsShare />
            </div>
            <p>
              <span className="font-bold">{photo.photographer}</span>{" "}
              {photo.alt}
            </p>
            <p className="text-sm text-gray-500">
              {month} {day}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
