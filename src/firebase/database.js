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

export const onlyMyPost = (callback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        const myPostsIds = Object.keys(doc.data().posts);
        db.collection('posts').orderBy('date', 'desc').onSnapshot((post) => {
          const docMyPosts = post.docs.filter(allPost => myPostsIds.some(myPost => allPost.id === myPost));
          const docMyPost = docMyPosts.map((doc2) => {
            return { id: doc2.id, ...doc2.data() };
          });
          callback(docMyPost, user.uid);
        });
      });
    }
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
