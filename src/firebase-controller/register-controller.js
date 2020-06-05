import {
  registerUserEmail,
  verificationEmail,
} from '../firebase/auth.js';

// eslint-disable-next-line import/no-cycle
import { modalSendMessage } from '../view/signup-view.js';

const verificar = () => {
  verificationEmail().then(() => {
    modalSendMessage();
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error);
  });
};

export default (event) => {
  event.preventDefault();
  const formSignup = event.target;
  const userName = formSignup['signUp-name'].value;
  const email = formSignup['signUp-email'].value;
  const password = formSignup['signUp-password'].value;
  const terms = formSignup.querySelector('.checkbox').checked;
  const errorTerms = formSignup.querySelector('#error-terms');
  if (terms === true) {
    registerUserEmail(email, password)
      .then(() => {
        verificar();
        const user = auth.currentUser;
        user.updateProfile({
          displayName: userName,
        });
      }).catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/weak-password') {
          errorTerms.innerHTML = 'La contraseña es débil, ingrese de 6 a más caracteres';
        } else if (errorCode === 'auth/email-already-in-use') {
          errorTerms.innerHTML = ' El correo ingresado ya se encuentra registrado';
        } else if (errorCode === 'auth/invalid-email') {
          errorTerms.innerHTML = 'el correo ingresado no es valido';
        }
      });
  } else {
    errorTerms.innerHTML = 'Acepte los Términos y condiciones(*)';
  }
};

export const passwordShow = () => {
  const tipo = document.querySelector('#signUp-password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};
