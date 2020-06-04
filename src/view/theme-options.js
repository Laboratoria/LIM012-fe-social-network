
export default () => {
  const div = document.createElement('div');
  div.className = 'themes-options';
  const divcontent = `
    <button class="light-mode">LIGHT MODE <i class="far fa-sun"></i></button>
    <button class="dark-mode">DARK MODE <i class="far fa-moon"></i></button>`;
  div.innerHTML = divcontent;
  return div;
};
