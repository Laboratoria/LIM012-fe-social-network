import {
  deletingDocument, deletingPostFromUser,
} from '../firebase/crud.js';

export const deletePost = (postId, userId) => {
  deletingDocument('posts', postId);
  deletingPostFromUser(userId, postId, 'posts');
};

export const deletingCommentFromUser = (userId, postId) => {
  const iconDelete = document.querySelectorAll('.del');
  iconDelete.forEach((objComment) => {
    objComment.addEventListener('click', () => {
      const idcomment = objComment.getAttribute('idComent');
      deletingDocument('comments', idcomment);
      deletingPostFromUser(userId, postId, 'comments');
    });
  });
};


export const updateCommentFromUser = () => {
  const iconEdit = document.querySelectorAll('.update-comment');
  if (iconEdit) {
    iconEdit.forEach((comments) => {
      comments.addEventListener('click', (e) => {
        e.preventDefault();

        const idComent = comments.getAttribute('idComent');
        const newContent = document.querySelector(`#textComment-${idComent}`);
        const iconSave = newContent.parentNode.querySelector('.save-comment');

        newContent.contentEditable = 'true';
        newContent.focus();
        iconSave.classList.remove('hide');
      });
    });
  }
};