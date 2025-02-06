import { getContent, getFeed, getFeedAds } from "@/utils";
import { NstagramView } from "@/widgets";

type PropsType = {
  params: Promise<{ id: string }>;
};

export default async function InstagramContent({ params }: PropsType) {
  const { id } = await params;
  const { feed, feedError } = await getFeed(id);
  console.log("FEED ERROR", feedError)
  if (feedError || !feed) {
    return <div>No feed found</div>;
  }
  const content = await getContent("random");
  const { adsList, adsError } = await getFeedAds(feed?.ads);

  if (adsError || !adsList) {
    return <div>No ads found</div>;
  }

  if (!content.photos) {
    return <div>No content found</div>;
  }
  return <NstagramView content={content} adsList={adsList} />;
}
