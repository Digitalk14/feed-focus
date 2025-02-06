import { ButtonCreateNew, LeftMenu, Main } from "@/components";
import { FeedsList } from "@/components/feeds-list";

export default async function FeedsPage() {
  
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
