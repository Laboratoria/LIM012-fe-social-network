export const currentUser = () => firebase.auth().currentUser;

// eslint-disable-next-line max-len
export const registerUserEmail = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

// eslint-disable-next-line max-len
export const logIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);

export const recoverPassword = email => firebase.auth().sendPasswordResetEmail(email);

// eslint-disable-next-line max-len
export const logInFacebook = () => firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());

// eslint-disable-next-line max-len
export const logInGoogle = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const logout = () => firebase.auth().signOut();

export const updateUserProfile = userName => firebase.auth().currentUser.updateProfile({
  displayName: userName,
});
