// eslint-disable-next-line import/no-cycle
import { ingresandoConEmail, passwordShow, recoverPassword } from '../firebase-controller/login-controller.js';
import { loginFacebook, loginGoogle } from '../firebase/auth.js';

export default () => {
  const div = document.createElement('div');
  div.id = 'login';
  div.className = 'view';
  const loginView = `
    <div class="cover-container" alt="logo">
      <div alt="logo"></div>
    </div>
    <div class="form-container">
      <div class="modals">
        <header class="logo-container">
          <img src="images/logo.png" alt="logo" class="logo">
          <h1 class="title">BUNKER</h1>
          <h2 class="slogan">Share your knowledgement!</h2>
        </header>
        <main class="access-container">
          <p class="welcome">WELCOME !</p>
          <form class="login">
            <input type="email"  id="login-email" placeholder="Email" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <i class="fas fa-eye" id='showContraseña'></i>
            <div class="container-errors">
                <span class="errors" id="error-terms"></span>
            </div> 
            <p class="text-12 change-password">Forgot Password?</p>
            <button class="button-access" id="btn-login">LOG IN</button>  
            
          </form>
          <p class="text-13">or login with</p>
          <div class="rrss">
            <p id="google"><i class="fab fa-google"></i></p>
            <p id="facebook"><i class="fab fa-facebook-f"></i></p>
          </div>
          <div class="question-container">
            <p class="question">Don't have an account?</p>
            <a href="#/signup" class="click-signUp">SIGN UP HERE</a>
          </div>
        </main>
      </div>
    </div>`;
  div.innerHTML = loginView;
  // GOOGLE LOG IN

  const signinGoogle = div.querySelector('#google');
  signinGoogle.addEventListener('click', loginGoogle);

  // FACEBOOK LOG IN
  const signinFacebook = div.querySelector('#facebook');
  signinFacebook.addEventListener('click', loginFacebook);
  // LOG IN

  const formLogin = div.querySelector('.login');
  formLogin.addEventListener('submit', ingresandoConEmail);

  const showContraseña = div.querySelector('#showContraseña');
  showContraseña.addEventListener('click', passwordShow);

  const changePassword = div.querySelector('.change-password');
  changePassword.addEventListener('click', recoverPassword);

  return div;
};

export const modalForVerifiedEmail = () => {
  const pantalla = () => {
    const mensaje = document.createElement('div');
    mensaje.setAttribute('class', 'contenidoModal');
    const info = `
        <section class="fondo fondo-close">
          <div class="franja">
            <i class="fas fa-times" id="exit"></i>
          </div>
          <img src="../src/images/pleaseConfirm.png" alt="pleaseConfirm" class="imageModal">
          <div class="descripcion">
              <p class="negrita">Oh no! You have not yet accepted the link to verify your email address.</br><b>Check your email inbox</b></p>
          </div>
        </section>
        `;
    mensaje.innerHTML = info;
    return mensaje;
  };

  const pantallaModal = document.getElementById('pantallaModal');
  pantallaModal.appendChild(pantalla());
  pantallaModal.querySelector('#exit').addEventListener('click', () => {
    pantallaModal.innerHTML = '';
  });
};

export const modalForRecoverPassword = () => {
  const pantalla2 = () => {
    const mensaje = document.createElement('div');
    mensaje.setAttribute('class', 'contenidoModal');
    const info = `
        <section class="fondo fondo-close">
          <div class="franja">
            <i class="fas fa-times" id="exit"></i>
          </div>
          <img src="../src/images/forgotPassword.png" alt="forgotPassword" class="imageModal">
          <div class="descripcion">
              <p class="negrita">A link was sent to your email to reset your password</br><b>Check your email inbox</b></p>
          </div>
        </section>
        `;
    mensaje.innerHTML = info;
    return mensaje;
  };

  const pantallaModal = document.getElementById('pantallaModal');
  pantallaModal.appendChild(pantalla2());
  pantallaModal.querySelector('#exit').addEventListener('click', () => {
    pantallaModal.innerHTML = '';
  });
};
