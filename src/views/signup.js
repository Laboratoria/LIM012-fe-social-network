import {
  registerUserEmail, updateUserProfile,
} from '../firebase/auth.js';
import { modalSendMessage } from '../controller-fire/signup-controller.js';

export const signup = () => {
  const div = document.createElement('div');
  div.id = 'signup-modal';
  const signupView = `
  <header class="headerSig">
    <h1 class="h1-style"><img src="images/logo.png" alt="app logo"> BUNKER</h1>
    <h2>Share your knowledgement!</h2>

  </header>
  <main>
    <form id="signup-form">
      <input type="text" id="signup-username" placeholder="Username" required>
      <input type="email" id="signup-email" placeholder="Email" required>
      <input type="password" id="signup-password" autocomplete="on" placeholder="Password" required>
      <i class="fas fa-eye" id='showContraseña'></i>
      <div class="terms">
        <input type="checkbox" id="agreement" required>
        <label for="agreement">I agree to the Terms of Service and Privacy Statement</label>
      </div>
      <p id="error-message"></p>
      <button>SIGN UP</button>
    </form>
    <p class="p-for space">Already have an account? <a href="#/log-in">LOG IN HERE</a></p>
  </main>`;
  div.innerHTML = signupView;

  const showContraseña = div.querySelector('#showContraseña');
  showContraseña.addEventListener('click', () => {
    const tipo = document.querySelector('#signup-password');
    if (tipo.type === 'password') {
      tipo.type = 'text';
    } else {
      tipo.type = 'password';
    }
  });

  // USER SIGN UP
  const signupForm = div.querySelector('#signup-form');
  const errorMessage = div.querySelector('#error-message');
  signupForm.addEventListener('submit', (e) => {
    const userEmail = signupForm['signup-email'].value;
    const userPassword = signupForm['signup-password'].value;
    const userName = signupForm['signup-username'].value;
    e.preventDefault();
    registerUserEmail(userEmail, userPassword)
      .then((result) => {
        result.user.sendEmailVerification()
          .then(() => {
            updateUserProfile(userName).then(() => {
              window.location.hash = '#/sign-up';
              modalSendMessage();
            });
          });
      })
      .catch((err) => { errorMessage.innerHTML = err.message; });
  });
  return div;
};
