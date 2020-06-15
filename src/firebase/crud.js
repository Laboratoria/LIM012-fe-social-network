// import MockFirebase from "mock-cloud-firestore";

/* eslint-disable no-console */
// posts

export const getData = (callback, collectionName) => firebase.firestore().collection(collectionName)
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const formPost = (content, likes, visibility, date, photo, userPhoto, userName) => firebase.firestore().collection('posts').add({
  content,
  likes,
  visibility,
  date,
  photo,
  userPhoto,
  userName,
});

export const addPostIdToCollectionUser = (userId, docId) => {
  db.collection('users').doc(userId).update({
    posts: firebase.firestore.FieldValue.arrayUnion(docId),
  });
};
export const updatePosts = (postId, newContent, newVisibility) => {
  const posts = firebase.firestore().collection('posts').doc(postId);
  return posts.update({
    content: newContent,
    visibility: newVisibility,
  });
};
// comments
export const deletingDocument = (collection, docId) => firebase.firestore().collection(collection).doc(docId).delete();
export const updateComment = (commentId, newContent) => firebase.firestore().collection('comments').doc(commentId).update({
  content: newContent,
});

export const formComment = (postId, content, likes, date, userPhoto, userName, uid) => firebase.firestore().collection('comments').add({
  postId,
  content,
  likes,
  date,
  userPhoto,
  userName,
  uid,
});
// from users
export const deletingPostFromUser = (userId, postId) => {
  return firebase.firestore().collection('users').doc(userId).update({
    posts: firebase.firestore.FieldValue.arrayRemove(postId),
  });
};

export const updateUserPhotoOnPosts = (userId, property, newValue) => {
  return firebase.firestore().collection('users').doc(userId).get()
    .then((docId) => {
      const ids = docId.data().posts;
      firebase.firestore().collection('posts').get().then((doc) => {
        doc.docs.forEach((post) => {
          if (ids.some(id => id === post.id)) {
            firebase.firestore().collection('posts').doc(post.id).update({
              [property]: newValue,
            });
          }
        });
      });
    });
};
