export const registerUserEmail = (email, password) => (
  auth.createUserWithEmailAndPassword(email, password));

export const verificationEmail = () => (auth.currentUser.sendEmailVerification());

export const signInUserEmail = (email, password) => (
  auth.signInWithEmailAndPassword(email, password));

export const forgotPassword = email => auth.sendPasswordResetEmail(email);

export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result.user);
  }).catch((error) => {
    console.log(error.message);
  });
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).then((result) => {
    console.log(result.user);
  }).catch((error) => {
    console.log(error.message);
  });
};
