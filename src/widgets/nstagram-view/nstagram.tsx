"use client";

import { useState } from "react";
import { Content } from "@/utils";
import {
  PexelIcon,
  LikesCommentsShare,
  AuthorAvatar,
  Ad,
  Post,
} from "@/components";

export const NstagramView = ({
  content,
  adsList,
}: {
  content: Content;
  adsList: Ad[];
}) => {
  console.log(adsList);
  return (
    <div
      className="flex flex-col gap-4 max-w-[600px] mx-auto bg-white"
      style={{ maxWidth: "600px" }}
    >
      {content.photos.map((photo, index) => {
        return <Post key={photo.id} photo={photo} />;
      })}
    </div>
  );
};
