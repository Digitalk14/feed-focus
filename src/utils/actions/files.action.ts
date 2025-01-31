"use server";

import { redirect } from "next/navigation";
import { FormEvent } from "react";
import { createClient } from "@/utils";
import { saveAd } from "./ad.action";

export async function postAd(
  title: string,
  description: string,
  files: File[]
) {
  const filePaths: any[] = [];
  const errors: any[] = [];
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  await Promise.all(
    files.map(async (file) => {
      let date = new Date().toISOString();
      const { data, error } = await supabase.storage
        .from("Ads-images")
        .upload(`${user?.id}/date=${date}&name=${file.name}`, file);
      if (error) {
        errors.push(error);
      } else {
        filePaths.push(data);
      }
    })
  );
  if (filePaths.length > 0) {
    const { adData, adError } = await saveAd(
      user?.id,
      title,
      description,
      filePaths
    );
    if (adError) {
      errors.push(adError);
    }
  }
  if (errors.length > 0) {
    return { errors: errors };
  } else {
    redirect("/ads");
  }
}

export async function getFilesByAuthor(userId: string) {
  const supabase = await createClient();
  const { data: files, error: filesError } = await supabase.storage.getBucket(
    "Ads-images"
  );
  return { files, filesError };
}
