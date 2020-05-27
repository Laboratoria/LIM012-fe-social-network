export default () => {
  const div = document.createElement('div');
  div.id = 'signUp';
  div.className = 'view';
  const signupView = `
    <div class="cover-container">
    <div class="image"></div>
    </div>
    <div id="signUp-container">
      <div class="modals">
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
            <div class="terms">
              <input type="checkbox" class="checkbox">
              <p class="confirm-terms box-confirm">I agree to the Terms of Service and Privacy Statement</p>
            </div>
            <button class="button-access" id="btn-signUp">SIGN UP</button>   
          </form>
          <div class="question-accountSignUp">
            <p class="question">Already have an account?</p>
            <a href="#/login" class="click-login">LOG IN HERE</a>
          </div>
        </main>
      </div>
    </div>`;
  div.innerHTML = signupView;
  // CREATE USER
  const formSignup = div.querySelector('.signUp');
  formSignup.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = formSignup['signUp-email'].value;
    const password = formSignup['signUp-password'].value;
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred.user);
      formSignup.reset();
  }).catch((err) => console.log(err));
  });
  return div;
};
