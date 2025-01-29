"use server";

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  return { user, userError };
}

export async function protectRoute() {
  let result = true;
  const { user, userError } = await getUser();
  if (!user) result = false;
  return result;
}

export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) {
    redirect("/error");
  }

  // revalidatePath('/', 'layout')
  redirect("/dashboard");
}

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
