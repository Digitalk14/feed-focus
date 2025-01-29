import { getAd, getAdMedia } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import Image from "next/image";
import { Bounce, toast } from "react-toastify";

type PropsType = {
  params: Promise<{ id: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const { id } = await params;
  const ad = await getAd(id);
  const mediaUrls = ad?.media_url ? JSON.parse(ad.media_url) : [];

  // Get signed URLs for all images
  const signedUrls = await Promise.all(
    mediaUrls.map(async (mediaData: any) => {
      const { mediaSrc } = await getAdMedia(mediaData.path);
      return {
        ...mediaData,
        signedUrl: mediaSrc.publicUrl,
      };
    })
  );
  return (
    <>
      <LeftMenu />
      <Main>
        <div className="max-w-4xl mx-auto p-6">
          <h1 className="text-3xl font-bold mb-6">{ad?.title}</h1>

          {/* Image gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {signedUrls.map((mediaData: any, index: number) => (
              <div key={mediaData.id} className="relative aspect-video">
                <img
                  src={mediaData.signedUrl || ""}
                  alt={`${ad?.title} - Image ${index + 1}`}
                  className="object-cover rounded-lg w-[200px] h-[300px]"
                />
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-gray-700 text-lg">{ad?.description}</p>
            <p className="text-sm text-gray-500">
              Updated at: {new Date(ad?.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Main>
    </>
  );
};
export default Page;
