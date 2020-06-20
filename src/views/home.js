import { firstTimeUser, getPosts } from '../firebase/firestore.js';

export const home = () => {
  const div = document.createElement('div');
  div.id = 'main-section';
  div.className = 'main-section-style';
  const homeView = `
    <div class="user-info">
      <div class="user-cover-photo-container">
        <div class="user-cover-photo"><img src="" alt="cover photo"></div>
        <img src="images/profile-cube.png" alt="profile photo" class="user-profile-photo pic-style">
      </div>
      <div class="username-bio">
        <h3></h3>
        <h5></h5>
      </div>
    </div>
    <section id="lateral-right">
      <div class="post-section">
        <img src="images/profile-cube.png" alt="profile photo" class="pic-style right-size">
        <a href="#/post-section">What's on your mind?</a>
      </div>
      <div id="core-rail">
        <div id="home-posts">
        </div>
      </div>
    </section>`;
  div.innerHTML = homeView;
  // Personalize Home
  const homePosts = div.querySelector('#home-posts');
  const profileName = div.querySelector('.username-bio h3');
  const profileBio = div.querySelector('.username-bio h5');
  console.log(profileBio)
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const db = firebase.firestore();
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        if (doc.data().bio !== '') {
          profileBio.innerHTML = doc.data().bio;
        } else {
          profileBio.innerHTML = 'Usuario de BUNKER';
        }
      });
      profileName.innerHTML = user.displayName;
      firstTimeUser(user.uid, user.displayName, user.photoURL);
      getPosts(user.uid, homePosts, 'visibility', 'public');
      if (user.photoURL) {
        const photoPost = div.querySelectorAll('.pic-style');
        photoPost.forEach((imgTag) => {
          imgTag.src = user.photoURL;
        });
      }
    }
  });
  return div;
};
