import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const FeedsList = async () => {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  const { data: feeds, error: feedsError } = await supabase
    .from('Feed')
    .select('*')
    .eq('created_by', user?.id)
  if (feedsError) {
    console.error(feedsError);
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {feeds?.map((feed) => (
        <Link
          href={`/feeds/${feed.id}`}
          key={feed.id}
          className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow  "
        >
          <h3 className="text-lg font-semibold mb-2 text-[#333]">{feed.title}</h3>
          <p className="text-gray-600">{feed.description}</p>
          <p className="text-gray-600 text-sm">{feed.updated_at}</p>
        </Link>
      ))}
    </div>
  );
}