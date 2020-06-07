import { logout } from '../firebase/auth.js';
import { renderPost } from '../firebase-controller/renderpost.js';

export default () => {
  const div = document.createElement('div');
  div.id = 'home';
  div.className = 'view';
  const homeView = `
  <header>
    <div class="logo-bunker">
      <img src="images/logo.png" alt="logo" class="logo">
      <h1 class="title">BUNKER</h1>
    </div>
    <div class="icons">
        <a href="#/home" class="share"><i class="fas fa-home icon icon-up"></i></a>
        <a href="#/profile" class="profileBtn"><img class="profile circle user-icon" src="./images/profile-img-woman.png"></a>
        <button id="menuBtn">
          <i class="fas fa-cog icon"></i> 
          <i class="fas fa-bars icon"></i>
        </button>
    </div>
  </header>
  <main class="main-home app-content">
  <div id="route-change-content">
    <div id="profile-section" class="lateral-left">
      <div>
        <img class="cover-profile">
        <img class="profile" src="./images/profile-img-woman.png">
      </div>
      <div class="profile-information">
        <h3>Usuario de BUNKER</h3>
        <h5>Description</h5>
      </div>
    </div>
    <div class="lateral-rigth">
      <div class="share-section container lateral-share">
        <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
        <a href="#/post-content" class="share">What's on your mind?</a>
      </div>
      <div class="core-rail">
        <ul id="public-posts">
          <!---publication--->
        </ul>
      </div>
    </div>
    </div>
    <div class="menu-container">
      <ul class="menu-options">
        <li class="edit-profile"><a href="#/edit-profile">Edit Profile</a></li>
        <li class="theme-options"><a href="#/theme-options">Themes</a></li>
        <li class="logout">Log out</li>
      </ul>
    </div>
  </main>
  <footer class="bar-down">
    <a href="#/home"><i class="fas fa-home icon"></i></a>
    <a href="#/profile"><i class="fas fa-user icon"></i></a>
  </footer>`;
  div.innerHTML = homeView;
  // DISPLAYING THE MENU
  const menuBtn = div.querySelector('#menuBtn');
  const menu = div.querySelector('.menu-container');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('appear');
  });
  // LOG OUT
  const logoutBtn = div.querySelector('.logout');
  logoutBtn.addEventListener('click', logout);
  auth.onAuthStateChanged((user) => {
    if (user) {
      // FIRESTORE GET DATA TO SHOW IN HOME VIEW
      const publicPosts = div.querySelector('#public-posts');
      db.collection('posts').where('visibility', '==', 'public').orderBy('date', 'desc').onSnapshot((postsDocuments) => {
        if (publicPosts !== null) {
          publicPosts.innerHTML = '';
          // passing an array of documents
          const documents = postsDocuments.docs.map((doc) => {
            return { id: doc.id, ...doc.data() };
          });
          renderPost(documents, user.uid).forEach((li) => {
            publicPosts.appendChild(li);
          });
        }
      });
    }
  });
  return div;
};

export { renderPost };
