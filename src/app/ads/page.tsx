import { LeftMenu, ButtonCreateNew, Main } from "@/components";
import { getUser, getAds, protectRoute } from "@/utils";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdsPage() {
  const { user, userError } = await getUser();
  const adsList = await getAds(user?.id);
  // const isProtected = await protectRoute();
  // if (!isProtected) {
  //   return redirect("/login");
  // }
  return (
    <>
      <LeftMenu />
      <Main>
        <ButtonCreateNew href="/ads/create">Create new Ad</ButtonCreateNew>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
          {adsList?.map((ad) => (
            <Link
              href={`/ads/${ad.id}`}
              key={ad.id}
              className="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow  "
            >
              <h3 className="text-lg font-semibold mb-2 text-[#333]">
                {ad.title}
              </h3>
              <p className="text-gray-600">{ad.description}</p>
              <p className="text-gray-600 text-sm">{ad.updated_at}</p>
            </Link>
          ))}
        </div>
      </Main>
    </>
  );
}
