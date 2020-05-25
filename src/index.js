import { example } from './example.js';

const vista1 = `
<section id="login-view">
    <div class="cover-container">
        <p class="image"></p>
    </div>
    <div id="login-container">
      <div class="modals">
        <header>
          <img src="images/logo.png" alt="logo" class="logo">
          <h1 class="title">BUNKER</h1>
          <h2 class="slogan">Share your knowledgement!</h2>
        </header>
        <main>
          <p class="welcome">WELCOME !</p>
          <form action="" class="login">
            <input type="email" class="field" id="login-email" placeholder="Email">
            <input type="password" class="field" id="login-password" placeholder="Password">
            <p class="change-password">Forgot Password?</p>
            <button class="button-access" id="btn-login">LOG IN</button>   
          </form>
          <p class="options-login">or login with</p>
          <div class="rrss">
            <p id="google"><i class="fab fa-google"></i></p>
            <p id="facebook"><i class="fab fa-facebook-f"></i></p>
          </div>
          <div class="question-account">
            <p class="question">Don't have an account?</p>
            <a href="#" class="click-signUp">SIGN UP HERE</a>
          </div>
        </main>
      </div>
    </div>
  </section>
`;
document.getElementById('container').innerHTML = vista1;

const vista2 = `
<section id="signUp-view">
    <div class="cover-container">
        <p class="image"></p>
    </div>
    <div id="signUp-container">
      <div class="modals">
        <header>
          <img src="images/logo.png" alt="logo" class="logo">
          <h1 class="title">BUNKER</h1>
          <h2 class="slogan">Share your knowledgement!</h2>
        </header>
        <main>
          <form action="" class="signUp">
          <input type="name" class="field" id="signUp-name" placeholder="Name">
          <input type="email" class="field" id="signUp-email" placeholder="Email">
          <input type="password" class="field" id="signUp-password" placeholder="Password">
          <div class="terms">
            <input type="checkbox" class="checkbox">
            <p class="confirm-terms">I agree to the Terms of Service and Privacy Statement</p>
          </div>
            <button class="button-access" id="btn-login">LOG IN</button>   
          </form>
          <div class="question-accountSignUp">
          <p class="question">Already have an account?</p>
          <a href="#" class="click-login">LOG IN</a>
          </div>
        </main>
      </div>
    </div>
  </section>

`;

document.getElementById('container2').innerHTML = vista2;
example();
