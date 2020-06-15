import MockFirebase from 'mock-cloud-firestore';

import {
  formPost, getData, deletingDocument, updatePosts,
  formComment, updateComment, deletingDocumentFromUser,
  addDocumentIdToUserCollection, updateUserDataOnPosts,
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
        post003: {
          content: 'tercer post',
          likes: 0,
          photo: '',
          userName: 'User Bunker Tres',
          userPhoto: 'user003/actualPhoto',
          visibility: 'private',
        },
      },
    },
    users: {
      __doc__: {
        user001: {
          bio: 'Soy primer usuario de Bunker',
          myLikes: ['post001'],
          posts: ['post001'],
        },
        user002: {
          bio: 'Soy segundo usuario de Bunker',
          myLikes: ['post001'],
          posts: ['post002'],
        },
        user003: {
          bio: 'Soy tercer usuario de Bunker',
          myLikes: ['post001'],
          posts: ['post003'],
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
describe('addDocumentIdToUserCollection', () => {
  it('Debería añadir el id del post a la coleccion users', done => addDocumentIdToUserCollection('user001', 'post006', 'posts')
    .then(() => {
      getData((data) => {
        const userCollection = data.find(doc => doc.id === 'user001');
        const postfield = userCollection.posts;
        const postId = postfield.some(elements => elements === 'post006');
        expect(postId).toBeTruthy();
        done();
      }, 'users');
    }));
});
describe('lista de comentarios', () => {
  it('Debería porder agregar un comentario', done => formComment('post002', 'que bien', 0, '06/06/2020', 'id/file.jpg', 'fulana', 'user001')
    .then(() => getData(
      (data) => {
        const result = data.find(comment => comment.content === 'que bien');
        expect(result.content).toBe('que bien');
        done();
      }, 'comments',
    )));
});
describe('deletingDocument', () => {
  it('Debería poder eliminar el post con id post002  de la colección post', done => deletingDocument('posts', 'post002')
    .then(() => getData(
      (data) => {
        const postDeleted = data.find(post => post.id === 'post002');
        expect(postDeleted).toBeUndefined();
        done();
      }, 'posts',
    )));
});
describe('deletingDocumentFromUser', () => {
  it('Debería eliminar el id del post de la coleccion users', done => deletingDocumentFromUser('user002', 'post002', 'posts')
    .then(() => {
      getData((data) => {
        const userCollection = data.find(doc => doc.id === 'user002');
        const postfield = userCollection.posts;
        const postId = postfield.find(elements => elements === 'post002');
        expect(postId).toBeUndefined();
        done();
      }, 'users');
    }));
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
  it('Debería editar el comentario con id comment001  de la colección post', done => updateComment('comment001', 'comentario editado')
    .then(() => getData(
      (data) => {
        const commentEdited = data.find(comment => comment.id === 'comment001');
        expect(commentEdited.content).toBe('comentario editado');
        done();
      }, 'comments',
    )));
});
describe('updateUserDataOnPosts', () => {
  it('Debería actualizar ', done => updateUserDataOnPosts('posts', 'user003', 'userPhoto', 'user003/newPhoto')
    .then(() => {
      getData((data) => {
        const actualPost = data.find(doc => doc.id === 'post003');
        expect(actualPost.userPhoto).toBe('user003/newPhoto');
        done();
      }, 'posts');
    }));
});
