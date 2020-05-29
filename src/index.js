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
    console.log(user);
    window.location.hash = '#/home';
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      db.collection('users').doc(user.uid).get().then((doc) => {
        if (!doc.exists) {
          return db.collection('users').doc(user.uid).set({
            bio: '',
            posts: {}
          });
        }
      });
    }
  } else {
    window.location.hash = '#/';
    changeView(window.location.hash);
  }
});
