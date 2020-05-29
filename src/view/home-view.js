const renderPost = (docs) => {
  const posts = docs.map((doc) => {
    const post = doc.data();
    const time = post.date;
    const getdate = time.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const li = document.createElement('li');
    li.innerHTML = `
<div class="pub post-details">
  <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
  <div class="date">
    Name<br>${shortTime} ${shortDate}<i class="fas fa-globe-americas privacity"></i>
  </div>
  <i class="fas fa-ellipsis-h"></i>
</div>
<div id="user-post-content">
<div class="publi container">${post.content}</div>
</div>
<div class="pub comments">
  <i class="far fa-heart"></i>
  <i class="far fa-comments"></i>
</div>`;
    const userPostContent = li.querySelector('#user-post-content');
    if (post.photo !== '') {
      const img = document.createElement('img');
      img.className = 'photo-post';
      img.alt = 'photo';
      storage.ref().child(post.photo).getDownloadURL().then((url) => {
        img.src = url;
      }).catch((err) => {
        console.log(err.message);
      });
      userPostContent.appendChild(img);
    }
    return li;
  });
  return posts;
};
export default () => {
  const div = document.createElement('div');
  div.id = 'home';
  div.className = 'view-home';
  const homeView = `
    <header class="bar bar-up">
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
    <div class="app-content">
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
        <div class="share-section container lateral-share">
          <img class="profile circle circle-comment" src="./images/profile-img-woman.png">
          <button class="share">What's on your mind?</button>
        </div>
        <ul class="core-rail container lateral-container" id="public-posts">
          <!---publication--->
        </ul>
      </div>
      <div class="post-container">
          <div class="go-back"><i class="fas fa-arrow-left"></i></div>
          <section class="settings-section">
          </section>
        </div>
        </div>
       <div class="menu-container">
          <ul class="menu-options">
            <li class="edit-profile">Edit Profile</li>
            <li class="theme-options">Themes</li>
            <li class="logout">Log out</li>
          </ul>
        </div>
    </main>
    <footer class="bar bar-down space-around ">
      <a href="#/home"><i class="fas fa-home icon"></i></a>
      <a href="#/profile"><i class="fas fa-user icon"></i></a>
    </footer>`;
  div.innerHTML = homeView;
  // DISPLAYING THE MENU
  const menuBtn = div.querySelector('.fa-bars');
  const menu = div.querySelector('.menu-container');
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('appear');
  });
  // CREATING THE POST FORM HTML
  const postForm = document.createElement('form');
  postForm.id = 'post-form';
  const postFormCotent = `
    <div>
      <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
      <div id="option-public">
      <p>user</p>
      <select id="visibility-select">
        <option selected disabled>visibility</option>
        <option>Pubic</option>
        <option>Private</option>
    </select>
      <textarea id="post-content" placeholder="What's on your mind?" required></textarea>
      </div>
    </div>
    <div id="preview"></div>
    <input id="upload-photo" type="file">
    <label class="photo-icon" for="upload-photo"><i class="fas fa-photo-video"></i></label>
    <button class="btn-submit post">POST</button>`;
  postForm.innerHTML = postFormCotent;
  // CREATING PROFILE SECTION HTML
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
  // CREATING THEMES SECTION HTML
  const themes = `<div class="themes-options">
<button class="light-mode">LIGHT MODE <i class="far fa-sun"></i></button>
<button class="dark-mode">DARK MODE <i class="far fa-moon"></i></button>
</div>`;
  // SHARE POST HTML
  const postContainer = div.querySelector('.post-container');
  const settingsSection = div.querySelector('.settings-section');
  const coreRail = div.querySelector('.core-rail');
  const shareBtn = div.querySelector('.share');
  shareBtn.addEventListener('click', () => {
    coreRail.classList.add('hide-overflow');
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = '';
    settingsSection.appendChild(postForm);
  });
  // GO BACK ARROW FUNCTION
  const goBack = div.querySelector('.fa-arrow-left');
  goBack.addEventListener('click', () => {
    coreRail.classList.remove('hide-overflow');
    postContainer.classList.remove('show-element');
  });
  // MENU EDIT PROFILE OPTION HTML
  const editProfileBtn = div.querySelector('.edit-profile');
  editProfileBtn.addEventListener('click', () => {
    coreRail.classList.add('hide-overflow');
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = editProfile;
  });
  // MENU THEMES OPTION HTML
  const themeBtn = div.querySelector('.theme-options');
  themeBtn.addEventListener('click', () => {
    coreRail.classList.add('hide-overflow');
    postContainer.classList.add('show-element');
    settingsSection.innerHTML = themes;
  });
  // LOG OUT
  const logoutBtn = div.querySelector('.logout');
  logoutBtn.addEventListener('click', () => {
    auth.signOut().then(() => {
      console.log('user signed out');
    });
  });
  // SHOW PREVIEW OF SELECTED IMG
  const preview = postForm.querySelector('#preview');
  const uploadPhoto = postForm.querySelector('#upload-photo');
  // SHARE A POST
  auth.onAuthStateChanged((user) => {
    if (user) {
      // UPLOAD FILES
      uploadPhoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        const refPath = `${user.uid}/${file.name}`;
        uploadPhoto.name = refPath;
        storage.ref(refPath).put(file);
        preview.innerHTML = `<img src=${URL.createObjectURL(file)} id="preview-img" alt="preview">`;
      });
      // FORM POST FUNCTION
      postForm.addEventListener('submit', (e) => {
        e.preventDefault();
        db.collection('posts').add({
          content: postForm['post-content'].value,
          likes: 0,
          visibility: 'public',
          date: firebase.firestore.FieldValue.serverTimestamp(),
          photo: postForm['upload-photo'].name
        })
          .then((docRef) => {
            db.collection('users').doc(user.uid).get().then((doc) => {
              const postsIds = doc.data().posts;
              const newindex = Object.keys(postsIds).length + 1;
              postsIds[newindex] = docRef.id;
              db.collection('users').doc(user.uid).set({
                posts: postsIds
              });
            });
          })
          .then(() => {
            postForm.reset();
            preview.innerHTML = '';
            coreRail.classList.remove('hide-overflow');
            postContainer.classList.remove('show-element');
          })
          .catch((err) => {
            console.log(err.message);
          });
      });

      // FIRESTORE GET DATA TO SHOW IN HOME VIEW
      const publicPosts = div.querySelector('#public-posts');
      db.collection('posts').where('visibility', '==', 'public').onSnapshot((postsDocuments) => {
        if (publicPosts !== null) {
          publicPosts.innerHTML = '';
          // passing an array of documents
          renderPost(postsDocuments.docs).forEach((li) => {
            publicPosts.appendChild(li);
          });
        }
      });
    }
  });
  return div;
};

export { renderPost };
