import { createClient, PhotosWithTotalResults, Photo } from "pexels";

export interface Content {
  photos: Photo[];
  next_page_link: string;
}

export const getContent = async (slug: string): Promise<Content> => {
  const client = createClient(process.env.NEXT_PUBLIC_PEXELS_API_KEY as string);
  const response = await client.photos.search({ query: slug, per_page: 30 });
  if ("photos" in response && "next_page" in response) {
    return {
      photos: response.photos,
      next_page_link: response.next_page.toString(),
    };
  }
  throw new Error("Failed to fetch photos");
};
