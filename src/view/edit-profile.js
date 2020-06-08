
export default () => {
  const form = document.createElement('form');
  form.id = 'profile-form';
  auth.onAuthStateChanged((user) => {
    if (user) {
      const divcontent = `
      <div>
        <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
        <p>${user.displayName}</p>
      </div> 
      <label class="photo-label" for="change-photo">Change profile picture</label>
      <input id="change-photo" type="file">
      <label for="new-username">User name</label>
      <input id="new-username" type="text" placeholder="User name">
      <label for="bio">Bio</label>
      <input id="bio" type="text" placeholder="Tell me something about you">
      <button class="btn-submit">SAVE</button>`;
      form.innerHTML = divcontent;
      const photoCircle = form.querySelector('.profile');
      const changePhoto = form.querySelector('#change-photo');
      if (user.photoURL !== null) {
        photoCircle.src = user.photoURL;
      } else {
        photoCircle.src = './images/profile-img-woman.png';
      }
      changePhoto.addEventListener('change', (event) => {
        const file = event.target.files[0];
        const refPath = `${user.uid}/${file.name}`;
        changePhoto.name = refPath;
        storage.ref(refPath).put(file);
        photoCircle.src = URL.createObjectURL(file);
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputUserName = form['new-username'].value;
        const inputBio = form.bio.value;
        if (inputUserName !== '') {
          user.updateProfile({
            displayName: inputUserName,
          }).then(() => {
            db.collection('users').doc(user.uid).get().then((docId) => {
              const postIds = docId.data().posts;
              const ids = Object.keys(postIds);
              ids.forEach((element) => {
                postIds[element].userName = inputUserName;
              });
              db.collection('users').doc(user.uid).update({
                posts: postIds,
              });
              return ids;
            }).then((ids) => {
              db.collection('posts').get().then((doc) => {
                console.log(doc);
                doc.docs.forEach((post) => {
                  if (ids.some(id => id === post.id)) {
                    db.collection('posts').doc(post.id).update({
                      userName: inputUserName,
                    });
                  }
                });
              });
            });
          });
        }
        if (inputBio !== '') {
          db.collection('users').doc(user.uid).update({
            bio: inputBio,
          });
        }
        if (changePhoto.value !== '') {
          storage.ref().child(changePhoto.name).getDownloadURL().then((url) => {
            user.updateProfile({
              photoURL: url,
            }).then(() => {
              db.collection('users').doc(user.uid).get().then((docId) => {
                const postIds = docId.data().posts;
                const ids = Object.keys(postIds);
                ids.forEach((element) => {
                  postIds[element].userPhoto = url;
                });
                db.collection('users').doc(user.uid).update({
                  posts: postIds,
                });
                return ids;
              }).then((ids) => {
                db.collection('posts').get().then((doc) => {
                  doc.docs.forEach((post) => {
                    if (ids.some(id => id === post.id)) {
                      db.collection('posts').doc(post.id).update({
                        userPhoto: url,
                      });
                    }
                  });
                });
              });
            });
          });
        }
        window.history.back();
      });
    }
  });
  return form;
};
