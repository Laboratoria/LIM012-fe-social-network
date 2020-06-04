
export default () => {
  const form = document.createElement('form');
  form.id = 'profile-form';
  const divcontent = `
      <div>
        <img class="profile circle margin-photo" src="./images/profile-img-woman.png">
        <p>nombre de Usuario</p>
      </div> 
      <label class="photo-label" for="change-photo">Change profile picture</label>
      <input id="change-photo" type="file">
      <label for="new-username">User name</label>
      <input id="new-username" type="text" placeholder="nombre de usuario">
      <label for="bio">Bio</label>
      <input id="bio" type="text" placeholder="Tell me something about you">
      <button class="btn-submit">SAVE</button>`;
  form.innerHTML = divcontent;
  return form;
};
