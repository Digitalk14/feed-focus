"use server";

import { FormEvent } from "react";
import { createClient } from "@/utils";

export async function uploadFiles(files: File[]) {
  files.forEach(async (file) => {
    console.log(file);
    const supabase = await createClient();
    const { data, error } = await supabase.storage
      .from("Ads-images")
      .upload(file.name, file);
    if (error) {
      console.log(error);
    }
    console.log(data);
  });
}

export async function getFilesByAuthor(userId: string) {
  const supabase = await createClient();
  const { data: files, error: filesError } = await supabase.storage.getBucket(
    "Ads-images"
  );
  return { files, filesError };
}
