export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    console.log(result.user);
  }).catch((error) => {
    console.log(error.message);
  });
};

export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth().signInWithPopup(provider).then((result) => {
    console.log(result.user);
  }).catch((error) => {
    console.log(error.message);
  });
};

export const createUserEmailAndPassword = (email, password) => {
  firebase.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
  }).catch(err => console.log(err));
};

export const loginEmailAndPassword = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
    console.log(cred.user);
  }).catch(err => console.log(err));
};
