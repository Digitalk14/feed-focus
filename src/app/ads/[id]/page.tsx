import { getAd, getAdMedia } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import { EditAdUIForm } from "./edit-ad-ui-form";

type PropsType = {
  params: Promise<{ id: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const { id } = await params;
  const ad = await getAd(id);
  const mediaUrls = ad?.media_url ? JSON.parse(ad.media_url) : [];
  console.log(mediaUrls);
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
        <EditAdUIForm
          adId={id}
          title={ad?.title}
          description={ad?.description}
          signedUrls={signedUrls}
          updated_at={ad?.updated_at}
        />
      </Main>
    </>
  );
};
export default Page;
