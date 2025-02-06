import { LeftMenu } from "@/components";
import { getAds } from "@/utils";
import { CreateFeedWidget } from "@/widgets";
import { cookies } from "next/headers";

export default async function CreateAdPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "";
  const { adsList, adsListError } = await getAds(userId);
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
