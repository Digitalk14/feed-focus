import { LeftMenu } from "@/components";
import { FeedsList } from "@/components/feeds-list";

export default async function FeedsPage() {
  return (
    <LeftMenu>
      <FeedsList />
    </LeftMenu>
  );
}
