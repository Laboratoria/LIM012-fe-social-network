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
            <input type="name" class="field" id="signUp-name" placeholder="Name">
            <input type="email" class="field" id="signUp-email" placeholder="Email">
            <input type="password" class="field" id="signUp-password" placeholder="Contraseña">
            <div class="terms">
              <input type="checkbox" class="checkbox">
              <p class="confirm-terms box-confirm">I agree to the Terms of Service and Privacy Statement</p>
            </div>
            <button class="button-access" id="btn-signUp">SIGN UP</button>   
          </form>
          <div class="question-accountSignUp">
            <p class="question">Already have an account?</p>
            <a href="#/login" class="click-login">LOG IN</a>
          </div>
        </main>
      </div>
    </div>`;
  div.innerHTML = signupView;
  return div;
};
