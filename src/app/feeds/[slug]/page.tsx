import { getFeed, getFeedAds } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import { EditFeedUIForm } from "./edit-feed-ui-form";
import { cookies } from "next/headers";
import { ErrorView } from "@/widgets";

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
    return (
      <ErrorView
        title="Sorry, something went wrong"
        description="Please try again later."
      />
    );
  }
  const { adsList, adsError } = await getFeedAds(feed?.ads);

  if (adsError) {
    return (
      <ErrorView
        title="Sorry, something went wrong"
        description="Please try again later."
      />
    );
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
