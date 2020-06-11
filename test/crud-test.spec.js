import MockFirebase from 'mock-cloud-firestore';

import { formPost } from '../src/firebase/crud.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc: {
          content: 'que tal?',
          likes: 0,
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData);
const db = firebase.firestore();
const getPosts = callback => db.collection('posts')
  .onSnapshot((docs) => {
    const data = [];
    docs.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    callback(data);
  });

describe('lista de posts', () => {
  it('Debería porder agregar un post', (done) => {
    return formPost('hola, nuevo post', 0, 'public', '06/06/2020', 'id/file.jpg')
      .then(() => getPosts(
        (data) => {
          console.log(data);
          const result = data.find(post => post.content === 'hola, nuevo post');
          expect(result.content).toBe('hola, nuevo post');
          done();
        }
      ));
  });
});
