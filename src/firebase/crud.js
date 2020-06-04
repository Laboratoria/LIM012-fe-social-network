export const deletePost = (id, userId) => {
  db.collection('posts').doc(id).delete().then(() => {
    // llamar a colecion de usuarios
    // eslint-disable-next-line no-console
    console.log(userId);
  })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error removing document: ', error);
    });
};
