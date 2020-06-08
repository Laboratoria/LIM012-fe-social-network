export const collectionUser = (userId, docId) => {
  db.collection('users').doc(userId).get().then((docUser) => {
    const postsInformation = docUser.data().posts;
    console.log(postsInformation);
    db.collection('posts').doc(docId).get().then((docPost) => {
      postsInformation[docId] = docPost.data();
      db.collection('users').doc(userId).update({
        posts: postsInformation,
      });
    });
  });
};

export const formPost = (content, likes, visibility, date, photo, userPhoto, userName) => db.collection('posts').add({
  content,
  likes,
  visibility,
  date,
  photo,
  userPhoto,
  userName,
});
