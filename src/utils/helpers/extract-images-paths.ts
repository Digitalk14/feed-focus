interface MediaItem {
  path: string;
}

export const extractImagesPaths = (adsList: { media_url: string }[]): string[] => {
  if (!Array.isArray(adsList)) {
    return [];
  }

  return adsList.reduce<string[]>((paths, ad) => {
    try {
      const mediaItems = JSON.parse(ad.media_url) as MediaItem[];
      return [...paths, ...mediaItems.map(item => item.path)];
    } catch (error) {
      console.warn('Failed to parse media_url:', error);
      return paths;
    }
  }, []);
};
