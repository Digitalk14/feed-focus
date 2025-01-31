export const extractImageName = (url: string) => {
  const urlParts = url.split("&name=");
  return urlParts[1];
};
