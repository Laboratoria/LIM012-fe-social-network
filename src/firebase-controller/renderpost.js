/* eslint-disable import/no-cycle */
import { deletePost } from '../firebase/crud.js';
import { changeView } from '../view-controler/router.js';
import { templateComment } from '../view/template-comments.js';

export const renderPost = (docs, userId) => {
  const posts = docs.map((doc) => {
    const post = doc;
    const time = doc.date;
    const getdate = time.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const li = document.createElement('li');
    li.className = 'publication';
    li.innerHTML = `
  <div class="header">
    <img class="profile" src="./images/profile-img-woman.png">
    <div class="date">
    <b>${post.userName}</b><br>${shortTime} ${shortDate} <i class="fas fa-globe-americas privacity"></i>
    </div>
    <div class="modal-options">
      <ul>
        <li><a class="edit">Edit post</a></li>
        <li><a class="delete" >Delete post</a></li>
      </ul>
    </div>
    <i class="fas fa-ellipsis-h"></i>
  </div>
  <div id="user-post-content">
    <div class="main">${post.content}</div>
  </div>
  <div class="footer">
    <i class="far fa-heart"></i><span>${post.likes}</span>
    <i class="hide far fa-heart"></i><span>${post.likes}</span>
    <i class="far fa-comments"></i>
  </div>
  <div class="hide new-comment">
    <section>
      <img src="./images/profile-img-woman.png" class= "margin user-comment">
      <input type="text" placeholder="Agrega un comentario.." class="inputComment">
      <i class="fab fa-telegram-plane icon-send"></i>
    </section>
    <div id="containerComment---Id" class="hide container-comments"></div>
  </div>
  `;

    const clickComments = li.querySelector('.fa-comments');
    clickComments.addEventListener('click', () => {
      const newComments = li.querySelector('.new-comment');
      newComments.classList.toggle('hide');
    });

    const clickIconSend = li.querySelector('.icon-send');
    clickIconSend.addEventListener('click', () => {
      const containerComments = li.querySelector('.container-comments');
      containerComments.classList.remove('hide');
      containerComments.appendChild(templateComment());
      console.log('hola');
    });

    const userPostContent = li.querySelector('#user-post-content');
    const options = li.querySelector('.fa-ellipsis-h');
    db.collection('users').doc(userId).get().then((docId) => {
      const postIds = docId.data().posts;
      const ids = Object.keys(postIds);
      if (!ids.some(id => id === doc.id)) {
        options.style.display = 'none';
      }
    });

    const profilePhoto = li.querySelector('.profile');
    if (doc.userPhoto) {
      profilePhoto.src = doc.userPhoto;
    }
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

    const btnEdit = li.querySelector('.edit');
    btnEdit.addEventListener('click', () => {
      changeView('#/post-content', post.content, doc.id);
    });
    return li;
  });
  return posts;
};
