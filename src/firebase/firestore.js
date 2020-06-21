import { renderPost } from '../templates/post.js';
import { renderComment } from '../templates/comment.js';

const db = firebase.firestore();
const getData = (callback, collectionName) => db.collection(collectionName)
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });
const getDocument = (collectionName, docId, callback) => db.collection(collectionName).doc(docId)
  .get().then((doc) => {
    callback(doc);
  });
const firstTimeUser = (userId, displayName, profilePhoto) => {
  db.collection('users').doc(userId).get().then((doc) => {
    if (!doc.exists) {
      db.collection('users').doc(userId).set({
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
const getPosts = (userId, element, query, value) => {
  return db.collection('posts').where(query, '==', value).orderBy('timestamp', 'asc').onSnapshot((postsDocuments) => {
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
const getComments = (userId) => {
  return db.collection('comments').orderBy('timestamp', 'asc').onSnapshot((commentDocuments) => {
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
const addDocumentIdToUserCollection = (userId, docId, field) => {
  return db.collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayUnion(docId),
  });
};
const addPost = (userId, content, photo, visibility) => {
  return db.collection('posts').add({
    userId,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    photo,
    visibility,
    likes: 0,
  });
};
const addComment = (userId, postId, content) => {
  return db.collection('comments').add({
    userId,
    postId,
    content,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};
const updateDocument = (collection, docId, field, value) => {
  return db.collection(collection).doc(docId).update({
    [field]: value,
  });
};
const deleteDocument = (collection, docId) => db.collection(collection).doc(docId).delete();
const deleteDocumentIdFromUserCollection = (userId, docId, field) => {
  return db.collection('users').doc(userId).update({
    [field]: firebase.firestore.FieldValue.arrayRemove(docId),
  });
};
export {
  firstTimeUser, addPost, getPosts, addDocumentIdToUserCollection,
  deleteDocument, deleteDocumentIdFromUserCollection, updateDocument,
  addComment, getData, getDocument, getComments,
};
