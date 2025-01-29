import { protectRoute } from "@/utils";
import { redirect } from "next/navigation";

export default async function FeedsLayout({ children }: { children: React.ReactNode }) {
    // const isProtected = await protectRoute();
    // if (!isProtected) {
    //   return redirect("/login");
    // }
    return <>{children}</>;
}
