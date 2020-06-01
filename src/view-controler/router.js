import { components } from '../view/index.js';

const changeView = (route) => {
  const actualView = document.getElementById('actual-view');
  actualView.innerHTML = '';
  switch (route) {
    case '':
    case '#':
    case '#/login':
    case '#/': {
      return actualView.appendChild(components.login());
    }
    case '#/signup': {
      actualView.appendChild(components.login());
      const mainForm = actualView.querySelector('.form-container');
      mainForm.innerHTML = '';
      return mainForm.appendChild(components.signup());
    }
    case '#/home': {
      return actualView.appendChild(components.home());
    }
    case '#/profile': {
      actualView.appendChild(components.home());
      const mainHome = actualView.querySelector('.app-content');
      mainHome.innerHTML = '';
      return mainHome.appendChild(components.profile());
    }
    default: {
      actualView.innerHTML = '';
    }
  }
};

export { changeView };
