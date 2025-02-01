import { LeftMenu } from "@/components";
import { getAds, getUser } from "@/utils";
import { CreateFeedWidget } from "@/widgets";

export default async function CreateAdPage() {
  const { user, userError } = await getUser();
  const { adsList, adsListError } = await getAds(user?.id);
  if (adsListError || !adsList) {
    return <div>No ads found, try to create one</div>;
  }
  return (
    <>
      <LeftMenu />
      <CreateFeedWidget adsList={adsList} />
    </>
  );
}
