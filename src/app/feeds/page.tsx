import { ButtonCreateNew, LeftMenu, Main } from "@/components";
import { FeedsList } from "@/components/feeds-list";
import { protectRoute } from "@/utils";
import { redirect } from "next/navigation";

export default async function FeedsPage() {
  // const isProtected = await protectRoute();
  // if (!isProtected) {
  //   return redirect("/login");
  // }
  return (
    <>
      <LeftMenu></LeftMenu>
      <Main>
      <ButtonCreateNew href="/feeds/create">Create new Feed</ButtonCreateNew>
        <FeedsList />
      </Main>
    </>
  );
}
