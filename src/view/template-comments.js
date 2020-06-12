import { updateComment } from '../firebase/crud.js';

export const renderComment = (postsComments, postId, sizeComments) => {
  const divComment = document.getElementById(postId);
  divComment.innerHTML = '';
  postsComments.forEach((com) => {
    const div = document.createElement('div');
    div.className = 'name-comments';
    const comment = com.data();
    const getdate = comment.date.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const template = `
        <div class= "header-comment">
            <img src=${comment.userPhoto} class="user-comment">
            <div>
            <h2><b>${comment.userName}</b><br>${shortTime} ${shortDate}</h2>
            </div>
            <span class="comment">
                <i id="option-${com.id}" class="fas fa-ellipsis-h"></i>
            </span>
        </div>
        <div class= "main-comment">
            <div class="text-post">
                <p class="p-comment" id="textComment-${com.id}">${comment.content}</p>
                <div class="save-comment hide" idComent="${com.id}"><i class="far fa-save"></i></div>
            </div>
            <div class="hide tooltip-container" id="show-tootTip-${com.id}">
                <div class="tooltip">
                    <div idComent="${com.id}" class="opt update-comment edit-${com.id}"><i class="fas fa-edit icon-tool"></i> <span>Editar</span></div>
                    <div idComent="${com.id}" class="opt del"> <i class="fas fa-trash-alt icon-tool"></i><span>Eliminar</span></div>
                </div>
            </div>
        </div>
      `;
    div.innerHTML = template;

    const optionsOfComments = div.querySelector(`#option-${com.id}`);
    if (optionsOfComments) {
      optionsOfComments.addEventListener('click', () => {
        const tool = document.querySelector(`#show-tootTip-${com.id}`);
        tool.classList.toggle('hide');
      });
    }
    const editComment = div.querySelector(`.edit-${com.id}`);
    if (editComment) {
      editComment.addEventListener('click', () => {
        const tool = document.querySelector(`#show-tootTip-${com.id}`);
        tool.classList.toggle('hide');
      });
    }

    auth.onAuthStateChanged((user) => {
      const userPhoto = user.photoURL;
      const photoBeforeComment = document.querySelectorAll('.first');
      photoBeforeComment.forEach((ele) => {
        if (comment.userPhoto) {
          // eslint-disable-next-line no-param-reassign
          ele.src = userPhoto;
        }
      });
    });


    divComment.appendChild(div);

    const iconSaveCom = div.querySelectorAll('.save-comment');
    if (iconSaveCom.length) {
      iconSaveCom.forEach((comments) => {
        comments.addEventListener('click', (e) => {
          e.preventDefault();
          const idComent = comments.getAttribute('idComent');
          const newContent = document.querySelector('.p-comment');
          if (newContent.innerText.trim() !== '') {
            newContent.contentEditable = 'false';
            comments.classList.add('hide');
            const text = newContent.innerText.trim();
            updateComment(idComent, text);
          }
        });
      });
    }
    return div;
  });
  const sizeComment = document.getElementById(`size-${postId}`);
  sizeComment.innerHTML = sizeComments;
};
