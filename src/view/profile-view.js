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
          <input class="share" placeholder="What's on your mind?">
          <i class="fas fa-plus-circle"></i>
        </div>
        <div class="core-rail container">
          <!---publication--->
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
    return profileContainer;
}