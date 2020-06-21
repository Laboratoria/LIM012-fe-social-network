// eslint-disable-next-line import/no-cycle
import { renderPost } from '../templates/post.js';
import { renderComment } from '../templates/comment.js';

// const db = firebase.firestore();

export const getData = (callback, collectionName) => firebase.firestore().collection(collectionName)
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

// eslint-disable-next-line max-len
export const getDocument = (collectionName, docId, callback) => firebase.firestore().collection(collectionName).doc(docId)
  .get()
  .then((doc) => {
    callback(doc);
  });

export const firstTimeUser = (userId, displayName, profilePhoto) => {
  return firebase.firestore().collection('users').doc(userId).get().then((doc) => {
    if (!doc.exists) {
      firebase.firestore().collection('users').doc(userId).set({
        userName: displayName,
        userPhoto: profilePhoto,
        coverPhoto: '',
        bio: '',
        myLikes: [],
        myPosts: [],
        myComments: [],
      });
    }
  });
};
export const getPosts = (userId, element, query, value) => {
  return firebase.firestore().collection('posts').where(query, '==', value).orderBy('timestamp', 'asc').onSnapshot((postsDocuments) => {
    const changes = postsDocuments.docChanges();
    changes.forEach((change) => {
      if (change.type === 'added') {
        renderPost(userId, change.doc, element);
      } else if (change.type === 'removed') {
        const div = document.getElementById(change.doc.id);
        element.removeChild(div);
      } else if (change.type === 'modified') {
        const div = document.getElementById(change.doc.id);
        const contentTag = div.querySelector('.main-post p');
        contentTag.innerHTML = change.doc.data().content;
        const likeCounter = div.querySelector('.like-counter');
        likeCounter.innerHTML = change.doc.data().likes;
        if (window.location.hash === '#/home' && change.doc.data().visibility === 'private') {
          element.removeChild(div);
        }
      }
    });
  });
};
export const getComments = (userId) => {
  return firebase.firestore().collection('comments').orderBy('timestamp', 'asc').onSnapshot((commentDocuments) => {
    const changes = commentDocuments.docChanges();
    changes.forEach((change) => {
      const commentContainer = document.getElementById(`comment-container-${change.doc.data().postId}`);
      if (commentContainer) {
        const postContainer = document.getElementById(change.doc.data().postId);
        const commentCounter = postContainer.querySelector('.comments-counter');
        if (change.type === 'added') {
          renderComment(userId, change.doc, commentContainer);
          commentCounter.innerHTML = commentContainer.childElementCount;
        } else if (change.type === 'removed') {
          const div = document.getElementById(change.doc.id);
          commentContainer.removeChild(div);
          commentCounter.innerHTML = commentContainer.childElementCount;
        } else if (change.type === 'modified') {
          const div = document.getElementById(change.doc.id);
          const contentTag = div.querySelector('.comment-p');
          contentTag.innerHTML = change.doc.data().content;
        }
      }
    });
  });
};

export const addDocumentIdToUserCollection = (userId, docId, field) => {
  return firebase.firestore().collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayUnion(docId),
  });
};

export const addPost = (userId, content, photo, visibility) => {
  return firebase.firestore().collection('posts').add({
    userId,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    photo,
    visibility,
    likes: 0,
  });
};
export const addComment = (userId, postId, content) => {
  return firebase.firestore().collection('comments').add({
    userId,
    postId,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
export const updateDocument = (collection, docId, field, value) => {
  return firebase.firestore().collection(collection).doc(docId).update({
    [field]: value,
  });
};
// eslint-disable-next-line max-len
export const deleteDocument = (collection, docId) => firebase.firestore().collection(collection).doc(docId).delete();

export const deleteDocumentIdFromUserCollection = (userId, docId, field) => {
  return firebase.firestore().collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayRemove(docId),
  });
};
