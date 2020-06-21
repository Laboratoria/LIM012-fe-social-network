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
        const li = document.querySelector(`[data-id=${change.doc.id}]`);
        li.parentNode.removeChild(li);
      } 
      // else if (change.type === 'modified') {
      //   const li = document.querySelector(`[data-id=${change.doc.id}]`);
      //   const contentTag = li.querySelector('.main-post p');
      //   contentTag.innerHTML = change.doc.data().content;
      //   const likeCounter = li.querySelector('.like-counter');
      //   likeCounter.innerHTML = change.doc.data().likes;
      //   // if (change.doc.data().visibility === 'private' || window.location.hash === '#/home') {
      //   //   element.removeChild(li);
      //   // }
      // }
    });
  });
};
// const getComments = (userId) => {
//   return db.collection('comments').orderBy('timestamp', 'asc').onSnapshot((postsDocuments) => {
//     const changes = postsDocuments.docChanges();
//     changes.forEach((change) => {
//       const commentContainer = document.getElementById(change.doc.data().postId);
//       if (change.type === 'added') {
//         renderComment(userId, change.doc, commentContainer);
//       } else if (change.type === 'removed') {
//         const li = commentContainer.querySelector(`[data-id=${change.doc.id}]`);
//         commentContainer.removeChild(li);
//       } else if (change.type === 'modified') {
//         const li = commentContainer.querySelector(`[data-id=${change.doc.id}]`);
//         const contentTag = li.querySelector('.comment-p');
//         contentTag.innerHTML = change.doc.data().content;
//       }
//     });
//   });
// };
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
  addComment, getData, getDocument, 
  // getComments,
};
