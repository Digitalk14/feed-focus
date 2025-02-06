import { getUser, getFeed, getFeedAds } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import { EditFeedUIForm } from "./edit-feed-ui-form";
import { cookies } from "next/headers";

type PropsType = {
  params: Promise<{ slug: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "";
  if (!userId) {
    return null;
  }
  const { slug } = await params;
  const { feed, feedError } = await getFeed(slug);

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
          userId={userId}
        />
      </Main>
    </>
  );
};
export default Page;
