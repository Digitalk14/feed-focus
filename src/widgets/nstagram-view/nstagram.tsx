"use client";

import React, { Fragment } from "react";
import { Content } from "@/utils";
import { Ad, Post, AdPost } from "@/components";

const AD_POST_INTERVAL = 3 + 1;

export const NstagramView = ({
  content,
  adsList,
}: {
  content: Content;
  adsList: Ad[];
}) => {
  return (
    <div
      className="flex flex-col max-w-[600px] mx-auto bg-white"
      style={{ maxWidth: "600px", gap: "30px" }}
    >
      {content.photos.map((photo, index) => {
        // const nextAd = getNextAd(index);
        return (
          <Fragment key={photo.id}>
            <Post photo={photo} />
            {(index + 1) % 4 === 0 && (
              <AdPost ad={adsList[Math.floor(index / AD_POST_INTERVAL) % adsList.length]} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};
