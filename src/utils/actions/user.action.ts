"use server";

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
  if (!user || userError) result = false;
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
    return { loginResult: null, loginError: error };
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
  console.log(error);
  if (error) {
    console.log(error);
    return { signupResult: null, signupError: error };
  }

  // revalidatePath("/", "layout");
  redirect("/dashboard");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  
  // Delete user-related cookies
  const cookieStore = await cookies();
  cookieStore.delete('user_id');
  
  redirect("/login");
}
