//const providerGoogle = new firebase.auth.GoogleAuthProvider();
//const providerFacebook = new firebase.auth.FacebookAuthProvider();

export const currentUser = () => firebase.auth().currentUser;

export const registerUserEmail = (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)};

export const verificationEmail = () => firebase.auth().currentUser.sendEmailVerification();

export const logIn = (email, password) => { 
  return firebase.auth().signInWithEmailAndPassword(email, password)
};

export const recoverPassword = (email) => firebase.auth().sendPasswordResetEmail(email);

export const logInFacebook = () => firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider());

export const logInGoogle = () => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

export const logout = () => firebase.auth().signOut();

export const updateUserProfile = (userName) => {
  return firebase.auth().currentUser.updateProfile({
    displayName: userName,
  });
};
