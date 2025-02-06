"use server";

import { createClient } from "../supabase/server";
import { getUser } from "@/utils";

export async function getFeeds() {
// export async function getFeeds(userId: string | undefined) {
  const supabase = await createClient();
  const { data: feeds, error: feedsError } = await supabase
    .from("Feed")
    .select("*")
    // .eq("user_id", userId);

  return { feeds, feedsError };
}

export async function getFeed(id: string) {
  const supabase = await createClient();
  const { data: feed, error: feedError } = await supabase
    .from("Feed")
    .select("*")
    // .eq("user_id", userId)
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

export async function createFeed(
  title: string,
  description: string,
  ads: string[]
) {
  const { user, userError } = await getUser();
  if (!user || userError) {
    return { createdFeedResult: null, createdFeedError: "User not found" };
  }
  const supabase = await createClient();
  const { data: createdFeedResult, error: createdFeedError } = await supabase
    .from("Feed")
    .insert({ user_id: user.id, title, description, ads });
  return { createdFeedResult, createdFeedError };
}

export async function updateFeed(
  feedId: string,
  title: string,
  description: string,
  ads: string[]
) {
  const supabase = await createClient();
  const { data: updatedFeedResult, error: updatedFeedError } = await supabase
    .from("Feed")
    .update({ title, description, ads })
    .eq("id", feedId);
  return { updatedFeedResult, updatedFeedError };
}
