import { currentUser } from '../firebase/auth.js';
import { updateDocument } from '../firebase/firestore.js';

export const profileForm = () => {
  const form = document.createElement('form');
  form.id = 'profile-form';
  const template = `
      <label for="profile-img-selected">Change profile picture</label>
      <input type="file" id="profile-img-selected" name="profile-picture" accept="image/png, image/jpeg">
      <label for="new-username">USER NAME</label>
      <input type="text" id="new-username">
      <label for="bio">BIO</label>
      <input type="text" id="bio">
      <button id="edit-button" class="submit-button-style">POST</button>`;
  form.innerHTML = template;


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = currentUser();
    const inputUserName = form['new-username'].value;
    const inputBio = form.bio.value;

    if (inputUserName !== '') {
      user.updateProfile({
        displayName: inputUserName,
      });
      updateDocument('users', user.uid, 'userName', inputUserName);
    }
    if (inputBio !== '') {
      updateDocument('users', user.uid, 'bio', inputBio);
    }
  });

  return form;
};
