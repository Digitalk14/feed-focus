"use server";

import { revalidatePath } from "next/cache";

export async function createAd(formData: FormData) {
  "use server";

  const name = formData.get("name");
  
  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      success: false,
      error: "Name is required"
    };
  }

  // Add your server-side logic here

  revalidatePath("/");
  return { success: true };
}
