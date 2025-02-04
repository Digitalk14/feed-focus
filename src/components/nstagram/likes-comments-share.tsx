"use client";

import { Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
};

export const LikesCommentsShare = () => {
  const [numbers, setNumbers] = useState({
    likes: 0,
    comments: 0,
    shares: 0,
  });

  useEffect(() => {
    // Generate random numbers on component mount
    setNumbers({
      likes: Math.floor(Math.random() * 2000000) + 500000, // Between 500K and 2.5M
      comments: Math.floor(Math.random() * 5000) + 1000, // Between 1K and 6K
      shares: Math.floor(Math.random() * 50000) + 10000, // Between 10K and 60K
    });
  }, []);

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Heart className="h-6 w-6" />
        <span className="text-sm font-medium">{formatNumber(numbers.likes)}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6" />
        <span className="text-sm font-medium">{formatNumber(numbers.comments)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Send className="h-6 w-6" />
        <span className="text-sm font-medium">{formatNumber(numbers.shares)}</span>
      </div>
    </div>
  );
};
