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

export const passwordShow = () => {
  const tipo = document.querySelector('#login-password');
  if (tipo.type === 'password') {
    tipo.type = 'text';
  } else {
    tipo.type = 'password';
  }
};
