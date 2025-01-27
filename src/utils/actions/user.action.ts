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
