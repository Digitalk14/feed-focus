"use client";

import { Ad, AuthorAvatar, LikesCommentsShare } from "@/components";
import { useEffect, useRef, useState } from "react";
import { getAdMediaSignedUrl } from "@/utils";

export const AdPost = ({ ad }: { ad: Ad }) => {
  const [images, setImages] = useState<{ path: string; signedUrl: string }[]>(
    []
  );
  const imageUrls = JSON.parse(ad.media_url);
  useEffect(() => {
    const fetchUrls = async () => {
      if (imageUrls.length && !images.length) {
        let paths = imageUrls.map((media: any) => media.path);
        const signedUrls = await getAdMediaSignedUrl(paths);
        setImages(signedUrls);
      }
    };
    fetchUrls();
  }, [imageUrls, images]);
  if (!images.length) return null;
  return (
    <div className="relative mb-4 mt-4">
      <div className="relative">
        <div
          className="flex absolute top-1 left-1"
          style={{
            width: "100%",
            background: "white",
            top: 0,
            left: 0,
            padding: "10px",
          }}
        >
          <AuthorAvatar author={"H&M"} sponsored={true} />
        </div>
        <img src={images[0].signedUrl} alt={"desc"} />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <div className="flex items-center gap-2">
          <LikesCommentsShare />
        </div>
        <p>
          <span className="font-bold">{ad.title}</span> {ad.description}
        </p>
      </div>
    </div>
  );
};
