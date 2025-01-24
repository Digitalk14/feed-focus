import { LeftMenu, Main } from "@/components";
import { FeedsList } from "@/components/feeds-list";

export default async function FeedsPage() {
  return (
    <>
      <LeftMenu></LeftMenu>
      <Main>
        <FeedsList />
      </Main>
    </>
  );
}
