import { getUser, getFeed, getFeedAds } from "@/utils";
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
    console.log(feedError);
  }
  const { adsList, adsError } = await getFeedAds(feed?.ads);

  if (adsError) {
    console.log(adsError);
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
