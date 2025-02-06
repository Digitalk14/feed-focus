import { LeftMenu, ButtonCreateNew, Main } from "@/components";
import { getAds } from "@/utils";
import { AdsCards } from "@/widgets";
import { cookies } from "next/headers";

export default async function AdsPage() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("user_id")?.value || "";
  const { adsList, adsListError } = await getAds(userId);
  return (
    <>
      <LeftMenu />
      <Main>
        <ButtonCreateNew href="/ads/create">Create new Ad</ButtonCreateNew>
        <AdsCards adsList={adsList} />
      </Main>
    </>
  );
}
