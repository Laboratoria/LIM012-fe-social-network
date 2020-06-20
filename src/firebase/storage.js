export const addFileToStorage = (refPath, file) => {
  return firebase.storage().ref(refPath).put(file);
}
export const getFileFromStorage = (path) => {
  return firebase.storage().ref().child(path).getDownloadURL();
};
