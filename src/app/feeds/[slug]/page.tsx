import { createClient } from "@/utils/supabase/server";
import { FunctionComponent } from "react";
import { LeftMenu } from "@/components";

type PropsType = {
  params: Promise<{ slug: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: feed, error: feedError } = await supabase
    .from("Feed")
    .select("*")
    .eq("created_by", user?.id)
    .eq("id", slug);

  if (feedError) {
    console.error(feedError);
  }

  const { data: adsList, error: adsError } = await supabase
    .from("Ad")
    .select()
    .in("id", feed?.[0].ads);
  console.log(adsList);
  if (adsError) {
    console.error(adsError);
  }

  return (
    <LeftMenu>
        <div>
            <h1>{feed?.[0].title}</h1>
            <p>{feed?.[0].description}</p>
        </div>
    </LeftMenu>
  )
};
export default Page;
