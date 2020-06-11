// eslint-disable-next-line import/no-cycle
import { renderPost } from '../firebase-controller/renderpost.js';
import { onlyMyPost, getComment } from '../firebase/filterdata.js';
import { renderComment } from './template-comments.js';

export default () => {
  const profileContainer = document.createElement('ul');
  profileContainer.id = 'my-posts';
  // FIRESTORE GET DATA, SHOW JUST USER POSTS IN PROFILE
  auth.onAuthStateChanged((user) => {
    if (user) {
      const printInProfile = (docs, userId) => {
        profileContainer.innerHTML = '';
        docs.forEach((post) => {
          profileContainer.appendChild(renderPost(post, userId));
        });
      };
      onlyMyPost(printInProfile);
      getComment(user.uid, renderComment);
    }
  });
  return profileContainer;
};
