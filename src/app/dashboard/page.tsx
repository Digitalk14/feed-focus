import { LeftMenu } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  return (
    <LeftMenu><p>Dashboard</p></LeftMenu>
  );
}
