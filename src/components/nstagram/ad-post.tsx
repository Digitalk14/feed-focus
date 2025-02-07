"use client";

import { Ad, AuthorAvatar, LikesCommentsShare } from "@/components";
import { useEffect, useState } from "react";
import { getAdMediaSignedUrl } from "@/utils";

export const AdPost = ({ ad }: { ad: Ad }) => {
  const [images, setImages] = useState<{ path: string; signedUrl: string }[]>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const imageUrls = JSON.parse(ad.media_url);
  useEffect(() => {
    const fetchUrls = async () => {
      if (imageUrls.length && !images.length) {
        const paths = imageUrls.map((media: any) => media.path);
        const signedUrls = await getAdMediaSignedUrl(paths);
        setImages(signedUrls);
      }
    };
    fetchUrls();
  }, [imageUrls, images]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0 && currentIndex < images.length - 1) {
      // Swiped left
      setCurrentIndex(prev => prev + 1);
    }

    if (distance < 0 && currentIndex > 0) {
      // Swiped right
      setCurrentIndex(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  if (!images.length) return null;
  return (
    <div className="relative ">
      <div className="relative py-[50px]">
        <div
          className="flex absolute top-1 left-1"
          style={{
            width: "100%",
            background: "white",
            top: 0,
            left: 0,
            padding: "10px",
            zIndex: 2,
          }}
        >
          <AuthorAvatar author={"H&M"} sponsored={true} avatarColor={"#3797f1"} />
        </div>
        <div 
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((image, index) => (
              <img 
                key={index}
                src={image.signedUrl} 
                alt={"desc"} 
                className="w-full flex-shrink-0"
              />
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-[#3797f1] flex justify-between p-4">
          <span className="text-white">Shop now</span>
          <span className="text-white">{"→"}</span>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        {images.length > 1 && (
          <div className="flex gap-1 justify-center p-1">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? 'bg-[#3797f1]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
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
