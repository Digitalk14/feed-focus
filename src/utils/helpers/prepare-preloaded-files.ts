export const preparePreloadedFiles = (preloadedFiles: any[]) => {
  const preparedPreloadedFiles = preloadedFiles.map((file: any) => {
    return {
      id: file.id,
      path: file.path,
      fullPath: file.fullPath,
    };
  });
  return {preparedPreloadedFiles};
};
