import { changeView } from './view-controler/router.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', init);
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/';
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      // eslint-disable-next-line consistent-return
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (!doc.exists) {
          return db.collection('users').doc(user.uid).set({
            bio: '',
            posts: {},
          });
        }
      });
    }
  } else {
    window.location.hash = '#/';
    changeView(window.location.hash);
  }
});
