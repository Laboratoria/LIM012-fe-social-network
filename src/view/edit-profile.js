
export default () => {
    const div = document.createElement('div');
    div.className = 'post-container';
    const divcontent = `<form id="profile-form">
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
    div.innerHTML = divcontent;
    return div;
};