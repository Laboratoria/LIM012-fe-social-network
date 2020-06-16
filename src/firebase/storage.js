export const addFileToStorage = (refPath, file) => storage.ref(refPath).put(file);
export const getFileFromStorage = (path) => {
  return storage.ref().child(path).getDownloadURL().then(url => url);
};
