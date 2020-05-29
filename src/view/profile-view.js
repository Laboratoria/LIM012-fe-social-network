import { renderPost } from './home-view.js';

export default () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'main-profile';
  const profileView = `
      <div class="profile-section no-lateral">
        <div class="profile-photos">
          <img class="cover-profile cover-desktop">
          <img class="profile profile-main circle" src="./images/profile-img-woman.png">
        </div>
          <div class="profile-information">
          <h3>Usuario de BUNKER</h3>
          <h5>Description</h5>
        </div>
      </div>
      <div class="social no-lateral">
        <div class="share-section container">
          <img class="profile circle" src="./images/profile-img-woman.png">
          <button class="share">What's on your mind?</button>
        </div>
        <div class="core-rail container" id="my-posts">
          <div class="publication">
            <div class="pub">
              <img class="profile circle" src="./images/profile-img-woman.png">
              <div class="date">
                Name<br>date at time <i class="fas fa-globe-americas privacity"></i>
              </div>
              <i class="fas fa-ellipsis-h"></i>
            </div>
            <div class="publi container">
            </div>
            <div class="pub comments">
              <i class="far fa-heart"></i>
              <i class="far fa-comments"></i>
            </div>
          </div>`;
  profileContainer.innerHTML = profileView;
  const myPosts = profileContainer.querySelector('#my-posts');
  // FIRESTORE GET DATA, SHOW JUST USER POSTS IN PROFILE
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).collection('posts').onSnapshot((postsCollection) => {
        myPosts.innerHTML = '';
        // passing an array of documents
        renderPost(postsCollection.docs).forEach((li) => {
          myPosts.appendChild(li);
        });
      });
    }
  });
  return profileContainer;
};
