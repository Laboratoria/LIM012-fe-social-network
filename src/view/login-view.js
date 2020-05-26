export default () => {
  const div = document.createElement('div');
  div.id = 'login';
  div.className = 'view';
  const loginView = `
    <div class="cover-container">
      <div class="image"></div>
    </div>
    <div id="login-container">
      <div class="modals">
        <header class="logo-container">
          <img src="images/logo.png" alt="logo" class="logo">
          <h1 class="title">BUNKER</h1>
          <h2 class="slogan">Share your knowledgement!</h2>
        </header>
        <main class="access-container">
          <p class="welcome">WELCOME !</p>
          <form class="login">
            <input type="email" class="field" id="login-email" placeholder="Email" required>
            <input type="password" class="field" id="login-password" placeholder="Password" required>
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
            <a href="#/signup" class="click-signUp">SIGN UP HERE</a>
          </div>
        </main>
      </div>
    </div>`;
  div.innerHTML = loginView;
  // GOOGLE LOG IN
  const signinGoogle = div.querySelector('#google');
  signinGoogle.addEventListener('click', () => {
    firebase.auth().signInWithPopup(provider).then((result) => {
      console.log(result.user);
    }).catch((error) => {
      console.log(error.message);
    });
  });

  // LOG IN
  const formlogin = div.querySelector('.login');
  formlogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = formlogin['login-email'].value;
    const password = formlogin['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred.user);
      formlogin.reset();
    }).catch((err) => console.log(err));
  });
  return div;
};
