import { renderPost } from './home-view.js';

export default () => {
  const profileContainer = document.createElement('div');
  profileContainer.className = 'main-profile';
  const profileView = `
      <div class="profile-section">
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
        <ul class="core-rail" id="my-posts"></ul>
      </div>`;
  profileContainer.innerHTML = profileView;
  const myPosts = profileContainer.querySelector('#my-posts');
  // FIRESTORE GET DATA, SHOW JUST USER POSTS IN PROFILE
  auth.onAuthStateChanged((user) => {
    if (user) {
      db.collection('users').doc(user.uid).onSnapshot((doc) => {
        myPosts.innerHTML = '';
        const postsIds = doc.data().posts;
        const postsIdsKeys = Object.keys(postsIds);
        const ids = postsIdsKeys.map(currentId => postsIds[currentId]);
        db.collection('posts').orderBy('date', 'desc').get().then((userPosts) => {
          const docs = userPosts.docs.filter(postDoc => ids.some(userPostId => postDoc.id === userPostId));
          // passing an array of documents
          renderPost(docs).forEach((li) => {
            myPosts.appendChild(li);
          });
        });
      });
    }
  });
  return profileContainer;
};
