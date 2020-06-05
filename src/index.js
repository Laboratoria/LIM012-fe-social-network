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
<<<<<<< HEAD
    /*if (user.emailVerified) {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/login';
    }*/
=======
    window.location.hash = '#/home';
    // if (user.emailVerified) {
    //   window.location.hash = '#/home';
    // } else {
    //   window.location.hash = '#/login';
    // }
>>>>>>> a5e5f5abf3b7a5c20be8b7ed1c88040e3e70a9d2
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
