import { getContent, getFeed, getFeedAds } from "@/utils";
import { NstagramView, ErrorView } from "@/widgets";

type PropsType = {
  params: Promise<{ id: string }>;
};

export default async function InstagramContent({ params }: PropsType) {
  const { id } = await params;
  const { feed, feedError } = await getFeed(id);
  if (feedError || !feed) {
    return <div>No feed found</div>;
  }
  const content = await getContent("random");
  const { adsList, adsError } = await getFeedAds(feed?.ads);

  if (adsError || !adsList) {
    return (
      <ErrorView
        title="No ads was added to this feed"
        description="Please add some ads."
      />
    );
  }

  if (!content.photos) {
    return <ErrorView title="No content found" description="Please add some content." />;
  }
  return <NstagramView content={content} adsList={adsList} feed={feed} />;
}
