export const collectionUser = (userId, docId) => {
<<<<<<< HEAD
  db.collection('users').doc(userId).get().then((docUser) => {
    const postsInformation = docUser.data().posts;
    console.log(postsInformation);
    db.collection('posts').doc(docId).get().then((docPost) => {
      postsInformation[docId] = docPost.data();
      db.collection('users').doc(userId).update({
        posts: postsInformation,
      });
=======
  db.collection('users').doc(userId).get().then((doc) => {
    const postsIds = doc.data().posts;
    const newindex = Object.keys(postsIds).length + 1;
    postsIds[newindex] = docId;
    db.collection('users').doc(userId).update({
      posts: postsIds,
>>>>>>> a5e5f5abf3b7a5c20be8b7ed1c88040e3e70a9d2
    });
  });
};

export const formPost = (content, likes, visibility, date, photo) => db.collection('posts').add({
  content,
  likes,
  visibility,
  date,
  photo,
});
