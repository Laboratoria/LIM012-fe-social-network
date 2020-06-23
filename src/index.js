import { logout } from './firebase/auth.js';
import { changeView } from './router.js';

const init = () => {
  changeView(window.location.hash);
  window.addEventListener('hashchange', () => {
    changeView(window.location.hash);
  });
};

window.addEventListener('load', () => {
  document.getElementById('loader').classList.add('loader2');
  init();
});


// DISPLAY MENU
const settingsButton = document.querySelector('.fa-bars');
const menu = document.querySelector('.menu-nav');
settingsButton.addEventListener('click', () => {
  menu.classList.toggle('display-flex');
});

// DISPLAY THEMES
const themes = document.querySelector('.theme-options');
themes.addEventListener('click', () => {
  window.location.hash = '#/theme-options';
});
// LOG OUT
const logOutButton = document.querySelector('#log-out');
logOutButton.addEventListener('click', () => {
  logout();
  window.location.hash = '#/log-in';
});
