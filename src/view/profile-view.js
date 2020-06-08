import { renderPost } from '../firebase-controller/renderpost.js';

export default () => {
  const profileContainer = document.createElement('ul');
  profileContainer.id = 'my-posts';
  // FIRESTORE GET DATA, SHOW JUST USER POSTS IN PROFILE
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        profileContainer.innerHTML = '';
        const postsIds = doc.data().posts;
        const postsIdsKeys = Object.keys(postsIds);
        const docs = postsIdsKeys.map((currentId) => {
          return { id: currentId, ...postsIds[currentId] };
        });
        docs.sort((a, b) => {
          if (a.date > b.date) {
            return -1;
          }
          if (a.date < b.date) {
            return 1;
          }
          return 0;
        });
        renderPost(docs, user.uid).forEach((li) => {
          profileContainer.appendChild(li);
        });
      });
      // db.collection('users').doc(user.uid).onSnapshot((doc) => {
      //   profileContainer.innerHTML = '';
      //   const postsIds = doc.data().posts;
      //   const postsIdsKeys = Object.keys(postsIds);
      //   const ids = postsIdsKeys.map(currentId => postsIds[currentId]);
      //   db.collection('posts').orderBy('date', 'desc').get().then((userPosts) => {
      //     // eslint-disable-next-line max-len
      //     const docs = userPosts.docs.filter(postDoc => ids.some(userPostId => postDoc.id === userPostId));
      //     // passing an array of documents
      //     renderPost(docs, user.uid).forEach((li) => {
      //       profileContainer.appendChild(li);
      //     });
      //   });
      // });
    }
  });
  return profileContainer;
};
