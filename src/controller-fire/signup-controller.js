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

  console.log('mi modal')
  const pantallaModal = document.getElementById('pantallaModal');
  pantallaModal.appendChild(pantalla());
  pantallaModal.querySelector('#exit').addEventListener('click', () => {
    pantallaModal.classList.remove('visible', 'opacidad');
    pantallaModal.innerHTML = '';
  });
};
