import { createClient } from "../supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  return { user, userError };
}

export async function protectRoute() {
  const user = await getUser();
  if (!user) throw new Error("Unauthorized");
}

export async function getAds(userId: string | undefined) {
  const supabase = await createClient();
  const ads = (await supabase.from("Ad").select("*").eq("created_by", userId))
    .data;

  return ads;
}

export async function getAd(id: string) {
  const supabase = await createClient();
  const ad = (await supabase.from("Ad").select("*").eq("id", id).single()).data;

  return ad;
}

export async function getFeeds(userId: string | undefined) {
  const supabase = await createClient();
  const { data: feeds, error: feedsError } = await supabase
    .from("Feed")
    .select("*")
    .eq("created_by", userId);

  return { feeds, feedsError };
}

export async function getFeed(userId: string | undefined, id: string) {
  const supabase = await createClient();
  const { data: feed, error: feedError } = await supabase
    .from("Feed")
    .select("*")
    .eq("created_by", userId)
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
