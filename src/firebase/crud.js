/* eslint-disable no-console */
export const deletePost = (postId, userId) => {
  db.collection('posts').doc(postId).delete().then(() => {
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    console.log(objectPost);
    delete objectPost[postId];
    console.log('deleting....');
    console.log(objectPost);
    db.collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
};

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

export const editPost = (userId, postId, newContent, newVisibility) => {
  const posts = db.collection('posts').doc(postId);
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    objectPost[postId].content = newContent;
    objectPost[postId].visibility = newVisibility;
    db.collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
  return posts.update({
    content: newContent,
    visibility: newVisibility,
  })
    .then(() => {
      console.log('Document successfully updated!');
      window.history.back();
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error('Error updating document: ', error);
      window.history.back();
    });
};
