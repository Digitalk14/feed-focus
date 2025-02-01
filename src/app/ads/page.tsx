import { LeftMenu, ButtonCreateNew, Main, Card } from "@/components";
import { getUser, getAds } from "@/utils";
import Link from "next/link";
import { AdsCards } from "@/widgets";

export default async function AdsPage() {
  const { user, userError } = await getUser();
  const { adsList, adsListError } = await getAds(user?.id);
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
