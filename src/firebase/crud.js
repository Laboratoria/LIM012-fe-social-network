/* eslint-disable no-console */
export const deletePost = (id, userId) => {
  db.collection('posts').doc(id).delete().then(() => {
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
  db.collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    console.log(objectPost);
    delete objectPost[id];
    console.log('deleting....');
    console.log(objectPost);
    db.collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
};

export const editPost = () => {
  console.log('edit');
};
