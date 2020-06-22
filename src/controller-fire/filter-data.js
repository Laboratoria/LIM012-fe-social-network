import { renderPost } from '../templates/post.js';
import { renderComment } from '../templates/comment.js';

export const getPosts = (userId, element, query, value) => firebase.firestore().collection('posts').where(query, '==', value).orderBy('timestamp', 'asc')
  .onSnapshot((postsDocuments) => {
    const changes = postsDocuments.docChanges();
    changes.forEach((change) => {
      if (change.type === 'added') {
        renderPost(userId, change.doc, element);
      } else if (change.type === 'removed') {
        const div = document.getElementById(change.doc.id);
        element.removeChild(div);
      } else if (change.type === 'modified') {
        const div = document.getElementById(change.doc.id);
        const contentTag = div.querySelector('.main-post p');
        contentTag.innerHTML = change.doc.data().content;
        const likeCounter = div.querySelector('.like-counter');
        likeCounter.innerHTML = change.doc.data().likes;
        if (window.location.hash === '#/home' && change.doc.data().visibility === 'private') {
          element.removeChild(div);
        }
      }
    });
  });
export const getComments = userId => firebase.firestore().collection('comments').orderBy('timestamp', 'asc').onSnapshot((commentDocuments) => {
  const changes = commentDocuments.docChanges();
  // obtengo coleccion de posts
  firebase.firestore().collection('posts').get().then((posts) => {
    let postsGroup;
    if (window.location.hash === '#/home') {
    // si estoy en home filtro los posts y obtengo solo los que son publicos
      postsGroup = posts.docs.filter(post => post.data().visibility === 'public');
    } else if (window.location.hash === '#/profile') {
    // si estoy en mi profile filtro los posts y obtengo solo los mios
      postsGroup = posts.docs.filter(post => post.data().userId === userId);
    }
    // por cada post obtengo sus comentarios
    postsGroup.forEach((post) => {
      const commentContainer = document.getElementById(`comment-container-${post.id}`);
      const postContainer = document.getElementById(post.id);
      const commentCounter = postContainer.querySelector('.comments-counter');
      // solo me quedo con los comentarios que sean del post
      console.log(post.data());
      const postComments = changes.filter(change => change.doc.data().postId === post.id);
      // por cada comentario...
      console.log(postComments.map(comment => comment.doc.data().content));
      postComments.forEach((comment) => {
        console.log(comment.doc.data().content);
        console.log(comment.type);
        if (comment.type === 'added') {
        // si es añadido lo muestro en su contenedor
          renderComment(userId, comment.doc, commentContainer);
          commentCounter.innerHTML = commentContainer.childElementCount;
        } else if (comment.type === 'removed') {
        // si es eliminado lo elimino de su contenedor
          const div = document.getElementById(comment.doc.id);
          commentContainer.removeChild(div);
          commentCounter.innerHTML = commentContainer.childElementCount;
        } else if (comment.type === 'modified') {
        // si ha sido editado hallo su etiqueta y lo edito
          const div = document.getElementById(comment.doc.id);
          const contentTag = div.querySelector('.comment-p');
          contentTag.innerHTML = comment.doc.data().content;
        }
      });
    });
  });
});
