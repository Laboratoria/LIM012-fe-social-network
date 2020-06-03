export const registerUserEmail = (email, password) => (
  firebase.auth().createUserWithEmailAndPassword(email, password));

export const verificationEmail = () => (auth.currentUser.sendEmailVerification());

export const signInUserEmail = (email, password) => (
  auth.signInWithEmailAndPassword(email, password));

export const forgotPassword = email => auth.sendPasswordResetEmail(email);

export const loginFacebook = () => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return auth.signInWithPopup(provider);
};

export const loginGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return auth.signInWithPopup(provider);
};

export const logout = () => {
  auth.signOut().then();
};
