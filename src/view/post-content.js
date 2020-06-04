import { formPost, collectionUser } from '../firebase/database.js';

export default () => {
  const div = document.createElement('div');
  div.className = 'post-container';
  const divcontent = `
    <div class="go-back"><i class="fas fa-arrow-left"></i></div>
    <section class="settings-section">
        <form id="post-form">
            <div id="option-public">
                <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
                <p>user</p>
                <select id="visibility-select">
                    <option>public</option>
                    <option>private</option>
                </select>
            </div>    
            <textarea id="post-content" placeholder="What's on your mind?" required></textarea>
            <div id="preview"></div>
            <input id="upload-photo" type="file">
            <label class="photo-icon" for="upload-photo"><i class="fas fa-photo-video"></i></label>
            <button class="btn-submit post">POST</button>
        <form>
    </section>`;
  div.innerHTML = divcontent;
  // GO BACK ARROW FUNCTION
  const goBack = div.querySelector('.fa-arrow-left');
  goBack.addEventListener('click', () => {
    window.history.back();
  });
  window.onclick = (event) => {
    if (event.target === div) {
      window.history.back();
    }
  };
  const postForm = div.querySelector('#post-form');
  // SHOW PREVIEW OF SELECTED IMG
  const preview = postForm.querySelector('#preview');
  const uploadPhoto = postForm.querySelector('#upload-photo');
  // SHARE A POST
  // UPLOAD FILES
  auth.onAuthStateChanged((user) => {
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
      const content = postForm['post-content'].value;
      const likes = 0;
      const visibility = postForm['visibility-select'].value;
      const date = firebase.firestore.FieldValue.serverTimestamp();
      const photo = postForm['upload-photo'].name;
      formPost(content, likes, visibility, date, photo)
        .then(docRef => collectionUser(user.uid, docRef.id))
        .then(() => {
          postForm.reset();
          window.history.back();
        });
    });
  });
  return div;
};
