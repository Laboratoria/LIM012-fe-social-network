import {
  registerUserEmail,
  signInUserEmail,
} from '../src/firebase/auth.js';

const firebaseMock = require('firebase-mock');

const mockAuth = new firebaseMock.MockFirebase();

mockAuth.autoFlush();

global.firebase = firebaseMock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockAuth,
);

describe('Function registerUserEmail', () => {
  it('Deberia poder crear un nuevo usuario', () => {
    registerUserEmail('dmartinezs@uni.pe', '12345678')
      .then((user) => {
        expect(user.email).toBe('dmartinezs@uni.pe');
      });
  });
});

describe('Function signInUserEmail', () => {
  it('Deberia poder iniciar sesión', () => {
    signInUserEmail('dmartinezs@uni.pe', '12345678')
      .then((user) => {
        expect(user.isAnonymous).toBe(false);
      });
  });
});
