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

export const editPost = (userId, postId, newContent) => {
  const posts = db.collection('posts').doc(postId);
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    objectPost[postId].content = newContent;
    db.collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
  return posts.update({
    content: newContent,
  })
    .then(() => {
      console.log('Document successfully updated!');
      window.location.hash = '#/profile';
    })
    .catch((error) => {
    // The document probably doesn't exist.
      console.error('Error updating document: ', error);
    });
};
