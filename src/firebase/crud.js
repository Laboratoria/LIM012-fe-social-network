export const deletePost = (id, userId) => {
  db.collection('posts').doc(id).delete().then(() => {
    // llamar a colecion de usuarios
    console.log(userId);
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
};

export const editPost = () => {
  console.log('edit');
};
