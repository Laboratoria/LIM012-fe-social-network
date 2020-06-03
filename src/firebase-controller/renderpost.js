import { deletePost } from '../firebase/crud.js';

export const renderPost = (docs, userId) => {
  const posts = docs.map((doc) => {
    const post = doc.data();
    const time = post.date;
    const getdate = time.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const li = document.createElement('li');
    li.className = 'publication';
    li.innerHTML = `
  <div class="header">
    <img class="profile" src="./images/profile-img-woman.png">
    <div class="date">
      Name<br>${shortTime} ${shortDate} <i class="fas fa-globe-americas privacity"></i>
    </div>
    <div class="modal-options">
      <ul>
        <li><a class="edit" >Edit post</a></li>
        <li><a class="delete" >Delete post</a></li>
      </ul>
    </div>
    <i class="fas fa-ellipsis-h"></i>
  </div>
  <div id="user-post-content">
    <div class="main">${post.content}</div>
  </div>
  <div class="footer">
    <i class="far fa-heart"></i>
    <i class="far fa-comments"></i>
  </div>`;
    const userPostContent = li.querySelector('#user-post-content');
    const options = li.querySelector('.fa-ellipsis-h');
    const modalOptions = li.querySelector('.modal-options');
    options.addEventListener('click', () => {
      modalOptions.classList.toggle('options-appear');
    });
    if (post.photo !== '') {
      const img = document.createElement('img');
      img.className = 'photo-post';
      img.alt = 'photo';
      storage.ref().child(post.photo).getDownloadURL().then((url) => {
        img.src = url;
      });
      userPostContent.appendChild(img);
    }
    const btnDelete = li.querySelector('.delete');
    btnDelete.addEventListener('click', () => deletePost(doc.id, userId));
    return li;
  });
  return posts;
};
