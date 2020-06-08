// eslint-disable-next-line import/no-cycle
import { renderPost } from '../firebase-controller/renderpost.js';
import { onlyMyPost } from '../firebase/database.js';

export default () => {
  const profileContainer = document.createElement('ul');
  profileContainer.id = 'my-posts';
  // FIRESTORE GET DATA, SHOW JUST USER POSTS IN PROFILE
  auth.onAuthStateChanged((user) => {
    if (user) {
      const printInProfile = (doc, userId) => {
        profileContainer.innerHTML = '';
        renderPost(doc, userId).forEach((li) => {
          profileContainer.appendChild(li);
        });
      };
      onlyMyPost(printInProfile);
    }
  });
  return profileContainer;
};
