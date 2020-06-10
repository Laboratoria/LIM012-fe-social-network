export const renderComment = (postsComments, postId, sizeComments) => {
  const postComment = postsComments.map((com) => {
    const div = document.createElement('div');
    div.className = 'name-comments';
    const comment = com.data();
    const getdate = comment.date.toDate();
    const shortDate = getdate.toDateString();
    const shortTime = getdate.toLocaleTimeString();
    const template = `
        <div class= "header-comment">
            <img src=${comment.userPhoto} class="user-comment">
            <h2><b>${comment.userName}</b><br>${shortTime} ${shortDate}</h2>
            <span class="comment">
                <i id="option-id" class="fas fa-ellipsis-h"></i>
            </span>
        </div>
        <div class= "main-comment">
            <div class="text-post">
                <p class="p-comment" id="textComment-id}">${comment.content}</p>
                <div class="save-comment hide" idComent="id"><i class="far fa-save"></i></div>
            </div>
            <div class="tooltip-container hide" id="show-tootTip-id">
                <div class="tooltip">
                    <div idComent="id" class="opt update-comment edit-id"><i class="fas fa-edit icon-tool"></i> <span>Editar</span></div>
                    <div idComent="id" class="opt del"> <i class="fas fa-trash-alt icon-tool"></i><span>Eliminar</span></div>
                </div>
            </div>
        </div>
      `;
    div.innerHTML = template;

    const commentPhoto = document.querySelector('.user-comment');
    if (comment.userPhoto) {
      commentPhoto.src = comment.userPhoto;
    }

    return div;
  });

  const divComment = document.getElementById(postId);
  const sizeComment = document.getElementById(`size-${postId}`);
  sizeComment.innerHTML = sizeComments;
  divComment.innerHTML = '';
  console.log(divComment);
  postComment.forEach((comment) => {
    console.log(comment);
    divComment.appendChild(comment);
  });
  return postComment;
};
