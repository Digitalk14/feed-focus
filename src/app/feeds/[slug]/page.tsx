import { getUser, getFeed, getFeedAds } from "@/utils/supabase/server";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";

type PropsType = {
  params: Promise<{ slug: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const { slug } = await params;
  const { user, userError } = await getUser();
  const { feed, feedError } = await getFeed(user?.id, slug);

  if (feedError) {
    console.error(feedError);
  }
  const { adsList, adsError } = await getFeedAds(feed?.ads);

  if (adsError) {
    console.error(adsError);
  }

  return (
    <>
      <LeftMenu />
      <Main>
        <div>
          <h1>{feed?.title}</h1>
          <p>{feed?.description}</p>
        </div>
      </Main>
    </>
  );
};
export default Page;
