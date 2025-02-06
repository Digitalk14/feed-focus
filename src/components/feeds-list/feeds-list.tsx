"use server"

import { getUser, getFeeds } from "@/utils";
import Link from "next/link";
import { cookies } from "next/headers";

export const FeedsList = async () => {
  const cookieStore = await cookies();

  const userId = cookieStore.get("user_id")?.value || "";
  console.log(userId);
  const { feeds, feedsError } = await getFeeds(userId);

  if (feedsError) {
    console.log(feedsError);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
      {feeds?.map((feed) => (
        <Link
          href={`/feeds/${feed.id}`}
          key={feed.id}
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow  "
        >
          <h3 className="text-lg font-semibold mb-2 text-[#333]">
            {feed.title}
          </h3>
          <p className="text-gray-600">{feed.description}</p>
          <p className="text-gray-600 text-sm">{feed.updated_at}</p>
        </Link>
      ))}
    </div>
  );
};
