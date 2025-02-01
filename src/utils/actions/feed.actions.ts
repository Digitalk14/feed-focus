import { createClient } from "../supabase/server";

export async function getFeeds(userId: string | undefined) {
  const supabase = await createClient();
  const { data: feeds, error: feedsError } = await supabase
    .from("Feed")
    .select("*")
    .eq("user_id", userId);

  return { feeds, feedsError };
}

export async function getFeed(userId: string | undefined, id: string) {
  const supabase = await createClient();
  const { data: feed, error: feedError } = await supabase
    .from("Feed")
    .select("*")
    .eq("user_id", userId)
    .eq("id", id)
    .single();

  return { feed, feedError };
}

export async function getFeedAds(list: string[]) {
  const supabase = await createClient();
  const { data: adsList, error: adsError } = await supabase
    .from("Ad")
    .select("*")
    .in("id", list);

  return { adsList, adsError };
}
