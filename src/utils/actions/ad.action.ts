"use server";

import { createClient } from "../supabase/server";

export async function getAds(userId: string | undefined) {
  const supabase = await createClient();
  const { data: adsList, error: adsListError } = await supabase
    .from("Ad")
    .select("*")
    .eq("user_id", userId);
  return { adsList, adsListError };
}

export async function getAd(id: string) {
  const supabase = await createClient();
  const ad = (await supabase.from("Ad").select("*").eq("id", id).single()).data;

  return ad;
}

export async function getAdMedia(path: string) {
  const supabase = await createClient();
  const { data: mediaSrc } = await supabase.storage
    .from("Ads-images")
    .getPublicUrl(path);
  return { mediaSrc };
}

export async function saveAd(
  userId: string | undefined,
  title: string,
  description: string,
  filePaths: string[]
) {
  const supabase = await createClient();
  const { data: adData, error: adError } = await supabase
    .from("Ad")
    .insert([
      {
        title: title,
        description: description,
        media_url: JSON.stringify(filePaths),
        user_id: userId,
      },
    ])
    .select();
  return { adData, adError };
}

export async function updateAd(
  id: string,
  title: string,
  description: string,
  filePaths: string[]
) {
  const supabase = await createClient();
  const media_url = JSON.stringify(filePaths);
  const updateResult = await supabase
    .from("Ad")
    .update({ title, description, media_url })
    .eq("id", id)
    .select();
  return { updateResult };
}

export async function deleteAds(ids: string[]) {
  const supabase = await createClient();
  const { data: deleteResult, error: deleteError } = await supabase
    .from("Ad")
    .delete()
    .in("id", [ids]);
  return { deleteResult, deleteError };
}
