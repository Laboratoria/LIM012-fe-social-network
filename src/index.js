import { changeView } from './view-controler/router.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};
window.addEventListener('load', () => {
  init();
});
auth.onAuthStateChanged((user) => {
  if (user) {
    window.location.hash = '#/home';
    // if (user.emailVerified) {
    //   window.location.hash = '#/home';
    // } else {
    //   window.location.hash = '#/login';
    // }
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      // eslint-disable-next-line consistent-return
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (!doc.exists) {
          return db.collection('users').doc(user.uid).set({
            bio: '',
            myLikes: {},
            posts: {},
            cover: '',
          });
        }
      });
    }
  } else {
    window.location.hash = '#/';
    changeView(window.location.hash);
  }
});
