import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

export async function createClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

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

export async function getFeeds(userId: string | undefined) {
  const supabase = await createClient();
  const { data: feeds, error: feedsError } = await supabase
    .from("Feed")
    .select("*")
    .eq("created_by", userId);

  return { feeds, feedsError };
}

export async function getFeed(userId: string | undefined, id: string) {
  const supabase = await createClient();
  const { data: feed, error: feedError } = await supabase
    .from("Feed")
    .select("*")
    .eq("created_by", userId)
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
