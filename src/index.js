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
    changeView(window.location.hash);
    if (user.metadata.creationTime === user.metadata.lastSignInTime) {
      return db.collection('users').doc(user.uid).set({
        bio: ''
      });
    }
  } else {
    window.location.hash = '#/';
    changeView(window.location.hash);
  }
});
