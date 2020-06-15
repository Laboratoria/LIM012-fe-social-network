// import MockFirebase from "mock-cloud-firestore";
const getData = (callback, collectionName) => firebase.firestore().collection(collectionName)
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
const formPost = (content, likes, visibility, date, photo, userPhoto, userName) => firebase.firestore().collection('posts').add({
  content,
  likes,
  visibility,
  date,
  photo,
  userPhoto,
  userName,
});
const formComment = (postId, content, likes, date, userPhoto, userName, uid) => firebase.firestore().collection('comments').add({
  postId,
  content,
  likes,
  date,
  userPhoto,
  userName,
  uid,
});
const addDocumentIdToUserCollection = (userId, docId, field) => {
  return firebase.firestore().collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayUnion(docId),
  });
};
const updatePosts = (postId, newContent, newVisibility) => {
  const posts = firebase.firestore().collection('posts').doc(postId);
  return posts.update({
    content: newContent,
    visibility: newVisibility,
  });
};
const updateComment = (commentId, newContent) => firebase.firestore().collection('comments').doc(commentId).update({
  content: newContent,
});
const deletingDocument = (collection, docId) => firebase.firestore().collection(collection).doc(docId).delete();
const deletingDocumentFromUser = (userId, postId, field) => {
  return firebase.firestore().collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayRemove(postId),
  });
};
const updateUserDataOnPosts = (collection, userId, property, newValue) => {
  return firebase.firestore().collection('users').doc(userId).get()
    .then((docId) => {
      const ids = docId.data()[collection];
      return firebase.firestore().collection(collection).get().then((documents) => {
        documents.docs.forEach((doc) => {
          if (ids.some(id => id === doc.id)) {
            firebase.firestore().collection(collection).doc(doc.id).update({
              [property]: newValue,
            });
          }
        });
      });
    });
};
export {
  getData, formPost, formComment, addDocumentIdToUserCollection,
  updatePosts, updateComment, deletingDocument, deletingDocumentFromUser,
  updateUserDataOnPosts,
};
