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

const deletingComment = (commentId) => {
  db.collection('comments').doc(commentId).delete();
};

export const deletingCommentFromUser = () => {
  const iconDelete = document.querySelectorAll('.del');
  iconDelete.forEach((objComment) => {
    objComment.addEventListener('click', () => {
      const idcomment = objComment.getAttribute('idComent');
      deletingComment(idcomment);
    });
  });
};

export const updateComment = (commentId, newContent) => db.collection('comments').doc(commentId).update({
  content: newContent,
});

export const updateCommentFromUser = () => {
  const iconEdit = document.querySelectorAll('.update-comment');
  if (iconEdit) {
    iconEdit.forEach((comments) => {
      comments.addEventListener('click', (e) => {
        e.preventDefault();
        const newContent = document.querySelector('.p-comment');
        const iconSave = document.querySelector('.save-comment');
        console.log('hola')
        newContent.contentEditable = 'true';
        newContent.focus();
        iconSave.classList.remove('hide');
      });
    });
  }
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

// Creación de Comentarios
export const formComment = (postId, content, likes, date, userPhoto, userName) => db.collection('comments').add({
  postId,
  content,
  likes,
  date,
  userPhoto,
  userName,
});
