// import MockFirebase from "mock-cloud-firestore";

/* eslint-disable no-console */
// posts
export const deletingPost = postId => firebase.firestore().collection('posts').doc(postId).delete();

export const getData = (callback, collectionName) => firebase.firestore().collection(collectionName)
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

export const formPost = (content, likes, visibility, date, photo, userPhoto, userName) => firebase.firestore().collection('posts').add({
  content,
  likes,
  visibility,
  date,
  photo,
  userPhoto,
  userName,
});

export const updatePosts = (postId, newContent, newVisibility) => {
  const posts = firebase.firestore().collection('posts').doc(postId);
  return posts.update({
    content: newContent,
    visibility: newVisibility,
  });
};
// comments
const deletingComment = (commentId) => {
  firebase.firestore().collection('comments').doc(commentId).delete();
};
export const updateComment = (commentId, newContent) => firebase.firestore().collection('comments').doc(commentId).update({
  content: newContent,
});

export const formComment = (postId, content, likes, date, userPhoto, userName) => firebase.firestore().collection('comments').add({
  postId,
  content,
  likes,
  date,
  userPhoto,
  userName,
});
// from users
export const deletingPostFromUser = (userId, postId) => {
  const callback = (dataUser) => {
    const objectPost = dataUser.data().posts;
    delete objectPost[postId];
    firebase.firestore().collection('users').doc(userId).update({
      posts: objectPost,
    });
  };
  return getData(callback, 'users');
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


export const updateCommentFromUser = () => {
  const iconEdit = document.querySelectorAll('.update-comment');
  if (iconEdit) {
    iconEdit.forEach((comments) => {
      comments.addEventListener('click', (e) => {
        e.preventDefault();
        const newContent = document.querySelector('.p-comment');
        const iconSave = document.querySelector('.save-comment');
        newContent.contentEditable = 'true';
        newContent.focus();
        iconSave.classList.remove('hide');
      });
    });
  }
};

export const updateBothCollections = (userId, property, newValue) => {
  firebase.firestore().collection('users').doc(userId).get().then((docId) => {
    const postIds = docId.data().posts;
    const ids = Object.keys(postIds);
    ids.forEach((element) => {
      postIds[element][property] = newValue;
    });
    firebase.firestore().collection('users').doc(userId).update({
      posts: postIds,
    });
    return ids;
  })
    .then((ids) => {
      firebase.firestore().collection('posts').get().then((doc) => {
        doc.docs.forEach((post) => {
          if (ids.some(id => id === post.id)) {
            firebase.firestore().collection('posts').doc(post.id).update({
              [property]: newValue,
            });
          }
        });
      });
    });
};

export const updatePostsFromUser = (userId, postId, newContent, newVisibility) => {
  firebase.firestore().collection('users').doc(userId).get().then((docUser) => {
    const objectPost = docUser.data().posts;
    objectPost[postId].content = newContent;
    objectPost[postId].visibility = newVisibility;
    firebase.firestore().collection('users').doc(userId).update({
      posts: objectPost,
    });
  });
};
