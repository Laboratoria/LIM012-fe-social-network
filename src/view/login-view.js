export default () => {
    const div = document.createElement('div');
    div.id = 'login';
    div.className = 'view';
    const loginView = `
    <div class="cover-container">
      <img src="images/cover.png" alt="cover" class="cover">
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
          <form action="" class="login">
            <input type="email" class="field" id="login-email" placeholder="Email">
            <input type="password" class="field" id="login-password" placeholder="Contraseña">
            <p class="change-password">Forgot Password?</p>
            <button class="button-access" id="btn-login"><a href="#/home">LOG IN</a></button>   
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
    </div>`
    div.innerHTML = loginView;
    return div;
}