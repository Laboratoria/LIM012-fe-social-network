import {
  firstTimeUser, getPosts, getComments, updateDocument, getDocument,
} from '../firebase/firestore.js';
import { addFileToStorage, getFileFromStorage } from '../firebase/storage.js';

export const home = () => {
  const div = document.createElement('div');
  div.id = 'main-section';
  div.className = 'main-section-style';
  const homeView = `
    <div class="user-info">
      <div class="user-cover-photo-container">
        <label for="cover-img-selected"><i class="fas fa-camera"></i></label>
        <input type="file" id="cover-img-selected" name="cover-picture" accept="image/png, image/jpeg">
        <img class="user-cover-photo" alt="cover photo">
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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const coverPhoto = div.querySelector('.user-cover-photo');
      getDocument('users', user.uid, (doc) => {
        profileName.innerHTML = user.displayName;
        coverPhoto.src = doc.data().coverPhoto;
        if (doc.data().bio !== '') {
          profileBio.innerHTML = doc.data().bio;
        } else {
          profileBio.innerHTML = 'Usuario de BUNKER';
        }
      });
      firstTimeUser(user.uid, user.displayName, user.photoURL);
      getPosts(user.uid, homePosts, 'visibility', 'public');
      getComments(user.uid);
      if (user.photoURL) {
        const photoPost = div.querySelectorAll('.pic-style');
        console.log(photoPost)
        photoPost.forEach((imgTag) => {
          // eslint-disable-next-line no-param-reassign
          imgTag.src = user.photoURL;
        });
      }
      const changeCover = div.querySelector('#cover-img-selected');
      changeCover.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const refPath = `${user.uid}/${file.name}`;
        changeCover.name = refPath;
        addFileToStorage(refPath, file).then((data) => {
          getFileFromStorage(data.metadata.fullPath).then((url) => {
            coverPhoto.src = url;
            updateDocument('users', user.uid, 'coverPhoto', url);
          });
        });
      });
    }
  });
  return div;
};
