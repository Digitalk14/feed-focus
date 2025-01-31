"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils";
import { saveAd } from "./ad.action";

export async function uploadFile(userId: string, file: File) {
  const supabase = await createClient();
  let date = new Date().toISOString();
  const { data: fileData, error: fileError } = await supabase.storage
    .from("Ads-images")
    .upload(`${userId}/date=${date}&name=${file.name}`, file);
  return { fileData, fileError };
}

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
  if (!user?.id) {
    return { errors: ["User not found"] };
  }
  await Promise.all(
    files.map(async (file) => {
      const { fileData, fileError } = await uploadFile(user?.id, file);
      if (fileError) {
        errors.push(fileError);
      } else {
        filePaths.push(fileData);
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
