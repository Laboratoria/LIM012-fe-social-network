
export default () => {
    const div = document.createElement('div');
    div.className = 'post-container';
    const divcontent = `<div class="themes-options">
    <button class="light-mode">LIGHT MODE <i class="far fa-sun"></i></button>
    <button class="dark-mode">DARK MODE <i class="far fa-moon"></i></button>
    </div>`;
    div.innerHTML = divcontent;
    return div;
};