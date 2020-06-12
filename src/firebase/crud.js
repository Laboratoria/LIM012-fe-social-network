/* eslint-disable no-console */
export const deletingPost = (postId) => {
  db.collection('posts').doc(postId).delete();
};
export const deletingPostFromUser = (userId, postId) => {
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    delete objectPost[postId];
    db.collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
};

export const getPosts = callback => db.collection('posts')
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const updateBothCollections = (userId, property, newValue) => {
  db.collection('users').doc(userId).get().then((docId) => {
    const postIds = docId.data().posts;
    const ids = Object.keys(postIds);
    ids.forEach((element) => {
      postIds[element][property] = newValue;
    });
    db.collection('users').doc(userId).update({
      posts: postIds,
    });
    return ids;
  })
    .then((ids) => {
      db.collection('posts').get().then((doc) => {
        doc.docs.forEach((post) => {
          if (ids.some(id => id === post.id)) {
            db.collection('posts').doc(post.id).update({
              [property]: newValue,
            });
          }
        });
      });
    });
};
export const updatePosts = (postId, newContent, newVisibility) => {
  const posts = db.collection('posts').doc(postId);
  return posts.update({
    content: newContent,
    visibility: newVisibility,
  });
};
export const updatePostsFromUser = (userId, postId, newContent, newVisibility) => {
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    objectPost[postId].content = newContent;
    objectPost[postId].visibility = newVisibility;
    db.collection('users').doc(userId).update({
      posts: objectPost,
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
