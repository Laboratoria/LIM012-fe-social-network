import MockFirebase from 'mock-cloud-firestore';

import {
  // eslint-disable-next-line import/named
  formPost, getData, deletingPost, updatePosts, formComment, updateComment, deletingComment, updatePostsFromUser, deletingPostFromUser,
} from '../src/firebase/crud.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post001: {
          content: 'primer post',
          likes: 0,
          photo: '',
          userName: 'User Bunker Uno',
          visibility: 'public',
        },
        post002: {
          content: 'segundo post',
          likes: 0,
          photo: '',
          userName: 'User Bunker Dos',
          visibility: 'private',
        },
      },
    },
    users: {
      __doc__: {
        user001: {
          bio: 'Soy primer usuario de Bunker',
          myLikes: {
            post001: 'post001',
          },
          posts: {
            post001: {
              content: 'primer post',
              likes: 0,
              photo: '',
              userName: 'User Bunker Uno',
              visibility: 'public',
            },
          },
        },
        user002: {
          bio: 'Soy segundo usuario de Bunker',
          myLikes: {
            post001: 'post001',
          },
          posts: {
            post002: {
              content: 'segundo post',
              likes: 0,
              photo: '',
              userName: 'User Bunker Dos',
              visibility: 'private',
            },
          },
        },
      },
    },
    comments: {
      __doc__: {
        comment001: {
          postId: 'post001',
          content: 'hola',
          likes: 0,
          date: '20/05/20',
          userPhoto: '',
          userName: 'fulana',
        },
        comment002: {
          postId: 'post002',
          content: 'hola de nuevo',
          likes: 0,
          date: '20/15/20',
          userPhoto: '',
          userName: 'fulana2',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de posts', () => {
  it('Debería porder agregar un post', done => formPost('hola, nuevo post', 0, 'public', '06/06/2020', 'id/file.jpg', 'user/file.jpg', 'fulana')
    .then(() => getData(
      (data) => {
        const result = data.find(post => post.content === 'hola, nuevo post');
        expect(result.content).toBe('hola, nuevo post');
        done();
      }, 'posts',
    )));
});

describe('lista de comentarios', () => {
  it('Debería porder agregar un comentario', done => formComment('post002', 'que bien', 0, '06/06/2020', 'id/file.jpg', 'fulana')
    .then(() => getData(
      (data) => {
        const result = data.find(comment => comment.content === 'que bien');
        expect(result.content).toBe('que bien');
        done();
      }, 'comments',
    )));
});
describe('deletingPost', () => {
  it('Debería poder eliminar el post con id post002  de la colección post', done => deletingPost('post002')
    .then(() => getData(
      (data) => {
        const postDeleted = data.find(post => post.id === 'post002');
        expect(postDeleted).toBeUndefined();
        done();
      }, 'posts',
    )));
});
describe('deletingComment', () => {
  it('Debería poder eliminar el comentario', done => deletingComment('comment002')
    .then(() => getData(
      (data) => {
        const commentDeleted = data.find(comment => comment.id === 'comment002');
        expect(commentDeleted).toBeUndefined();
        done();
      }, 'comments',
    )));
});

describe('updatePosts', () => {
  it('Debería editar el post con id post001  de la colección post', done => updatePosts('post001', 'nuevo contenido', 'public')
    .then(() => getData(
      (data) => {
        const postEdited = data.find(post => post.id === 'post001');
        expect(postEdited.content).toBe('nuevo contenido');
        done();
      }, 'posts',
    )));
});
describe('updateComment', () => {
  it('Debería editar el post con id post001  de la colección post', done => updateComment('comment001', 'comentario editado')
    .then(() => getData(
      (data) => {
        const commentEdited = data.find(comment => comment.id === 'comment001');
        expect(commentEdited.content).toBe('comentario editado');
        done();
      }, 'comments',
    )));
});

describe('updatePostsFromUser', () => {
  it('Debería poder actualizar el post del usuario', done => updatePostsFromUser('user001', 'post001', 'contenido editado', 'public')
    .then(() => {
      getData((data) => {
        const userCollection = data.find(post => post.id === 'user001');
        const postEdited = userCollection.posts.post001;
        expect(postEdited.content).toBe('contenido editado');
        done();
      }, 'users');
    }));
});
describe('deletingPostFromUser', () => {
  it('Debería poder actualizar el post del usuario', done => deletingPostFromUser('user001', 'post001')
    .then(() => {
      getData((data) => {
        const userCollection = data.find(post => post.id === 'user001');
        const postfield = userCollection.posts.post001;
        expect(postfield).toBeUndefined();
        console.log(data);
        done();
      }, 'users');
    }));
});
