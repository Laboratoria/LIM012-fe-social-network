import MockFirebase from 'mock-cloud-firestore';

import {
  formPost, getPosts, deletingPost, updatePosts,
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
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

describe('lista de posts', () => {
  it('Debería porder agregar un post', done => formPost('hola, nuevo post', 0, 'public', '06/06/2020', 'id/file.jpg')
    .then(() => getPosts(
      (data) => {
        const result = data.find(post => post.content === 'hola, nuevo post');
        expect(result.content).toBe('hola, nuevo post');
        done();
      },
    )));
});

describe('deletingPost', () => {
  it('Debería poder eliminar el post con id post002  de la colección post', done => deletingPost('post002')
    .then(() => getPosts(
      (data) => {
        const postDeleted = data.find(post => post.id === 'post002');
        expect(postDeleted).toBeUndefined();
        done();
      },
    )));
});

describe('updatePosts', () => {
  it('Debería editar el post con id post001  de la colección post', done => updatePosts('post001', 'nuevo contenido', 'public')
    .then(() => getPosts(
      (data) => {
        const postEdited = data.find(post => post.id === 'post001');
        expect(postEdited.content).toBe('nuevo contenido');
        done();
      },
    )));
});
