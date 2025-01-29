import { createClient } from "../supabase/server";

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

export async function getAdMedia(path: string) {
  const supabase = await createClient();
  const { data: mediaSrc } = await supabase
    .storage
    .from("Ads-images")
    .getPublicUrl(path);
  return { mediaSrc };
}
