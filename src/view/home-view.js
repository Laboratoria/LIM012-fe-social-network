export default () => {
  const div = document.createElement('div');
  div.id = 'home';
  div.className = 'view-home';
  const homeView = `
    <header class="bar">
      <div class="logo-bunker">
        <img src="images/logo.png" alt="logo" class="logo-static">
        <h1 class="title-static">BUNKER</h1>
      </div>
      <div class="icons">
        <i class="fas fa-home icon icon-up"></i>
        <i class="fas fa-cog icon"></i>
        <img class="profile circle user-icon" src="./images/profile-img-woman.png">
        <i class="fas fa-bars icon"></i>
      </div>
    </header >
    <main class="main-home">
      <div class="profile-section lateral lateral-rigth">
        <div class="profile-photos">
          <img class="cover-profile">
          <img class="profile profile-main circle" src="./images/profile-img-woman.png">
        </div>
          <div class="profile-information">
          <h3>Usuario de BUNKER</h3>
          <h5>Description</h5>
        </div>
      </div>
      <div class="social lateral">
        <div class="share-section container">
          <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
          <button class="share">What's on your mind?</button>
        </div>
        <div class="core-rail container">
          <!---publication--->
          <div class="publication">
            <div class="pub">
              <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
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
          </div>
        </div>
      </div>
      <div class="post-container">
          <div class="go-back"><i class="fas fa-arrow-left"></i></div>
          <section class="settings-section">
          </section>
        </div>
       <div class="menu-container">
          <ul class="menu-options">
            <li class="edit-profile">Edit Profile</li>
            <li class="theme-options">Themes</li>
            <li>Log out</li>
          </ul>
        </div>
    </main>
    <footer class="bar bar-down space-around ">
      <a href="#/home"><i class="fas fa-home icon"></i></a>
      <a href="#/profile"><i class="fas fa-user icon"></i></a>
    </footer>`;
  div.innerHTML = homeView;
  const menuBtn = div.querySelector('.fa-bars');
  const menu = div.querySelector('.menu-container');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('appear');
  });
  const postForm = ` <form id="post-form">
    <div>
      <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
      <textarea id="post-content" placeholder="What's on your mind?" required></textarea>
    </div>
    <input id="upload-photo" type="file">
    <label class="photo-icon" for="upload-photo"><i class="fas fa-photo-video"></i></label>
    <button class="btn-submit">POST</button>
  </form>`;
  const editProfile = `<form id="profile-form">
  <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
  <div>
    <p>nombre de Usuario</p>
    <label class="photo-label" for="change-photo">Change profile picture</label>
    <input id="change-photo" type="file">
    <label for="new-username">User name</label>
    <input id="new-username" type="text" placeholder="nombre de usuario">
    <label for="bio">Bio</label>
    <input id="bio" type="text" placeholder="Tell me something about you">
    <button class="btn-submit">SAVE</button>
  </div>
</form>`;
  const themes = `<div class="themes-options">
<button class="light-mode">LIGHT MODE <i class="far fa-sun"></i></button>
<button class="dark-mode">DARK MODE <i class="far fa-moon"></i></button>
</div>`;
  const postContainer = div.querySelector('.post-container');
  const settingsSection = div.querySelector('.settings-section');
  const shareBtn = div.querySelector('.share');
  shareBtn.addEventListener('click', () => {
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = postForm;
  });
  const goBack = div.querySelector('.fa-arrow-left');
  goBack.addEventListener('click', () => {
    postContainer.classList.remove('show-element');
  });
  const editProfileBtn = div.querySelector('.edit-profile');
  editProfileBtn.addEventListener('click', () => {
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = editProfile;
  });
  const themeBtn = div.querySelector('.theme-options');
  themeBtn.addEventListener('click', () => {
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = themes;
  });
  return div;
};
