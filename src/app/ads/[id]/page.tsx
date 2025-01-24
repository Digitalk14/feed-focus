
import { getAd } from "@/utils";
import { FunctionComponent } from "react";
import { LeftMenu, Main } from "@/components";
import Image from "next/image";

type PropsType = {
  params: Promise<{ id: string }>;
};

const Page: FunctionComponent<PropsType> = async function Page({ params }) {
  const { id } = await params;
  const ad = await getAd(id);
  return (
    <>
      <LeftMenu />
      <Main>
        <div>
          <h1>{ad?.title}</h1>
          <img src={ad?.media_url} alt={ad?.title} width={100} height={100} />
          <p>{ad?.description}</p>
          <p>Updated at: {ad?.updated_at}</p>
        </div>
      </Main>
    </>
  );
};
export default Page;
