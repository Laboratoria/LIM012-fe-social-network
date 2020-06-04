export const deletePost = (id, userId) => {
  db.collection('posts').doc(id).delete().then(() => {
    console.log(userId);
  })
    .catch((error) => {
      console.error('Error removing document: ', error);
    });
  db.collection('cities').doc(userId)({
    doc: firebase.firestore.FieldValue.delete(),
  });
};

export const editPost = () => {
  console.log('edit');
};
