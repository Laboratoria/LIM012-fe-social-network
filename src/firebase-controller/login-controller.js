// eslint-disable-next-line import/no-cycle
import { modalForRecoverPassword, modalForVerifiedEmail } from '../view/login-view.js';
import { signInUserEmail, forgotPassword } from '../firebase/auth.js';

export const ingresandoConEmail = (event) => {
  event.preventDefault();
  const formLogin = event.target;
  const email = formLogin['login-email'].value;
  const password = formLogin['login-password'].value;
  const errorTerms = formLogin.querySelector('#error-terms');

  signInUserEmail(email, password)
    .then((result) => {
      if (result.user.emailVerified) {
        window.location.hash = '#/home';
      } else {
        modalForVerifiedEmail();
      }
    }).catch((error) => {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        errorTerms.innerHTML = 'La contraseña ingresada es incorrecta(*)';
      } else if (errorCode === 'auth/user-not-found') {
        errorTerms.innerHTML = 'el correo no se encuentra registrado(*)';
      }
    });
};


export const passwordShow = () => {
  const tipo = document.querySelector('#login-password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};

export const recoverPassword = () => {
  const email = document.querySelector('#login-email').value;
  forgotPassword(email)
    .then(() => {
      modalForRecoverPassword();
    // eslint-disable-next-line no-console
    }).catch(error => console.log(error));
};
