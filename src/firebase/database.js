export const collectionUser = (userId, docId) => {
  db.collection('users').doc(userId).get().then((docUser) => {
    const postsInformation = docUser.data().posts;
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
export const getComment = (userId, callback) => {
  db.collection('users').doc(userId).get().then((docId) => {
    db.collection('comments').orderBy('date', 'desc').onSnapshot((comments) => {
      db.collection('posts').get()
        .then((posts) => {
          let postIds = posts.docs.map(post => post.id);
          if (window.location.hash === '#/profile') {
            postIds = Object.keys(docId.data().posts);
          }
          postIds.forEach((postId) => {
            const postComments = comments.docs.filter(comment => comment.data().postId === postId);
            callback(postComments, postId, postComments.length);
          });
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

export const formComment = (postId, content, likes, date, userPhoto, userName) => db.collection('comments').add({
  postId,
  content,
  likes,
  date,
  userPhoto,
  userName,
});
