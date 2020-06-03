// eslint-disable-next-line import/no-cycle
import registerForEmail, { passwordShow } from '../firebase-controller/register-controller.js';

export default () => {
  const div = document.createElement('div');
  div.className = 'modals';
  const signupView = `
        <header class="logo-container">
          <img src="images/logo.png" alt="logo" class="logo">
          <h1 class="title">BUNKER</h1>
          <h2 class="slogan">Share your knowledgement!</h2>
        </header>
        <main class="access-container">
          <form action="" class="signUp">
            <input type="name" class="field" id="signUp-name" placeholder="Name" required>
            <input type="email" class="field" id="signUp-email" placeholder="Email" required>
            <input type="password" class="field" id="signUp-password" placeholder="Password" required>
            <i class="fas fa-eye" id='showContraseña'></i>
            <div class="terms">
              <input type="checkbox" class="checkbox">
              <p class="confirm-terms box-confirm">I agree to the Terms of Service and Privacy Statement</p>
            </div>
            <div class="container-errors">
              <span class="errors" id="error-terms"></span>
            </div> 
            <button class="button-access" id="btn-signUp">SIGN UP</button>
            
          </form>
          <div class="question-containerSingUp">
            <p class="question">Already have an account?</p>
            <a href="#/login" class="click-login">LOG IN HERE</a>
          </div>
        </main>
        `;
  div.innerHTML = signupView;
  // CREATE USER
  const formSignup = div.querySelector('.signUp');
  formSignup.addEventListener('submit', registerForEmail);

  const showContraseña = div.querySelector('#showContraseña');
  showContraseña.addEventListener('click', passwordShow);

  return div;
};

export const modalSendMessage = () => {
  const pantalla = () => {
    const mensaje = document.createElement('div');
    mensaje.setAttribute('class', 'contenidoModal');
    // mensaje.classList.add('visible', 'opacidad');
    const info = `
        <section class="fondo fondo-close">
          <div class="franja">
            <i class="fas fa-times" id="exit"></i>
          </div>
          <img src="../src/images/sendMessage.png" alt="sendMessage" class="imageModal">
          <div class="descripcion">
              <p class="negrita">A message was sent to verify the email address.</br><b>Check your email inbox</b></p>
          </div>
        </section>
        `;
    mensaje.innerHTML = info;
    return mensaje;
  };

  const pantallaModal = document.getElementById('pantallaModal');
  pantallaModal.appendChild(pantalla());
  pantallaModal.querySelector('#exit').addEventListener('click', () => {
    pantallaModal.classList.remove('visible', 'opacidad');
    pantallaModal.innerHTML = '';
  });
};
