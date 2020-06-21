import MockFirebase from 'mock-cloud-firestore';

import {
  getData, firstTimeUser, addDocumentIdToUserCollection,
  addPost, addComment, updateDocument, deleteDocument, deleteDocumentIdFromUserCollection,
} from '../src/firebase/firestore.js';

const fixtureData = {
  __collection__: {
    users: {
      __doc__: {
        user001: {
          userName: 'Fulano Uno',
          userPhoto: 'image1',
          coverPhoto: '',
          bio: 'Soy primer usuario de Bunker',
          myComments: ['comment001'],
          myLikes: [],
          myPosts: ['post001'],
        },
        user002: {
          userName: 'Fulano Dos',
          userPhoto: 'image2',
          coverPhoto: '',
          bio: 'Soy segundo usuario de Bunker',
          myComments: ['comment002'],
          myLikes: ['post002'],
          myPosts: ['post002', 'post003'],
        },
        user003: {
          userName: 'Fulano Tres',
          userPhoto: 'image3',
          coverPhoto: '',
          bio: 'Soy tercer usuario de Bunker',
          myComments: [],
          myLikes: ['post001'],
          myPosts: [],
        },
      },
    },
    posts: {
      __doc__: {
        post001: {
          content: 'primer post',
          likes: 0,
          photo: '',
          userId: 'user001',
          visibility: 'public',
        },
        post002: {
          content: 'segundo post',
          likes: 3,
          photo: '',
          userId: 'user002',
          visibility: 'private',
        },
        post003: {
          content: 'tercer post',
          likes: 4,
          photo: '',
          userId : 'user002',
          visibility: 'private',
        },
      },
    },
    comments: {
      __doc__: {
        comment001: {
          userId : 'user001',
          postId: 'post001',
          content: 'hola',
          timestap: '20/05/20',
        },
        comment002: {
          userId : 'user002',
          postId: 'post002',
          content: 'hola de nuevo',
          timestap: '15/05/20',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData);

describe('firstTimeUser', () => {
  it('Debería porder crear un nuevo usuario', done => firstTimeUser('user004', 'Yudith Cumba', '')
    .then(getData((data) => {
      const result = data.find(user => user.id === 'user004');
      expect(result.userName).toBe('Yudith Cumba');
      done();
    }, 'users',
    )));
});


describe('addPost', () => {
  it('Debería porder agregar un post', done => addPost( 'user001', 'Nuevo post', '', 'public')
    .then(() => getData(
      (data) => {
        const result = data.find(post => post.content === 'Nuevo post');
        expect(result.content).toBe('Nuevo post');
        done();
      }, 'posts',
    )));
});

describe('addDocumentIdToUserCollection', () => {
  it('Debería añadir el post006 al user001', done => addDocumentIdToUserCollection('user001', 'post006', 'myPosts')
    .then(() => {
      getData((data) => {
        const userCollection = data.find(doc => doc.id === 'user001');
        const postfield = userCollection.myPosts;
        const postId = postfield.some(elements => elements === 'post006');
        expect(postId).toBeTruthy();
        done();
      }, 'users');
    }));
});

describe('addComment', () => {
  it('Debería porder agregar un comentario', done => addComment('user003', 'post002', 'que bien')
    .then(() => getData(
      (data) => {
        const result = data.find(comment => comment.content === 'que bien');
        expect(result.content).toBe('que bien');
        done();
      }, 'comments',
    )));
});
describe('updatDocument', () => {
  it('Debería actualizar la colección user con id user001 con valor ', (done) => {
    return updateDocument('users', 'user001', 'userName', 'Nuevo fulano')
      .then(getData((data) => {
        const result = data.find(user => user.id === 'user001');
        expect(result.userName).toBe('Nuevo fulano');
        done();
      }, 'users'));
  });
});

describe('deleteDocument', () => {
  it('Debería poder eliminar el post con id post002  de la colección post', done => deleteDocument('posts', 'post002')
    .then(() => getData(
      (data) => {
        const postDeleted = data.find(post => post.id === 'post002');
        expect(postDeleted).toBeUndefined();
        done();
      }, 'posts',
    )));
});

describe('deleteDocumentIdFromUserCollection', () => {
  it('Debería eliminar el id del post de la coleccion users', done => deleteDocumentIdFromUserCollection('user002', 'post002', 'myPosts')
    .then(() => {
      getData((data) => {
        // console.log(data);
        const userCollection = data.find(doc => doc.id === 'user002');
        const postfield = userCollection.myPosts;
        const postId = postfield.find(elements => elements === 'post002');
        expect(postId).toBeUndefined();
        done();
      }, 'users');
    }));
});
