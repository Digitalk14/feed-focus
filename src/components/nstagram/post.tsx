"use client";

import { Photo } from "pexels";
import { PexelIcon, LikesCommentsShare, AuthorAvatar } from "@/components";

export const Post = ({ photo }: { photo: Photo }) => {
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "long" });
  return (
    <div className="relative">
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
          <span className="font-bold">{photo.photographer}</span> {photo.alt}
        </p>
        <p className="text-sm text-gray-500">
          {month} {day}
        </p>
      </div>
    </div>
  );
};
