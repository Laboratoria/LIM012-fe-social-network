export const example = () => {
    // aquí tu código
}
export const loginFacebook = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result.user);
    }).catch((error) => {
      console.log(error.message);
    });
};