export const collectionUser = (userId, docId) => {
  db.collection('users').doc(userId).get().then((doc) => {
    const postsIds = doc.data().posts;
    const newindex = Object.keys(postsIds).length + 1;
    postsIds[newindex] = docId;
    db.collection('users').doc(userId).set({
      posts: postsIds,
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
