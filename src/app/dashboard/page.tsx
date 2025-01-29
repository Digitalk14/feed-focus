import { LeftMenu, Main } from "@/components";
import { getUser, protectRoute } from "@/utils";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  return (
    <>
      <LeftMenu />
      <Main>
        <p>Dashboard</p>
      </Main>
    </>
  );
}
