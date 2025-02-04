import { getUser, getFeed, getFeedAds } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import { EditFeedUIForm } from "./edit-feed-ui-form";

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
        <EditFeedUIForm
          feedId={feed?.id}
          title={feed?.title}
          description={feed?.description}
          ads={adsList}
          userId={user?.id}
        />
      </Main>
    </>
  );
};
export default Page;
