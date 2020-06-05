import { components } from '../view/index.js';

// eslint-disable-next-line consistent-return
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
      const coreRail = actualView.querySelector('.core-rail');
      const profileSection = actualView.querySelector('#profile-section');
      profileSection.classList.add('show-element-flex');
      coreRail.innerHTML = '';
      return coreRail.appendChild(components.profile());
    }
    case '#/post-content': {
      actualView.appendChild(components.home());
      const appContent = actualView.querySelector('#route-change-content');
      appContent.innerHTML = '';
      return appContent.appendChild(components.postform());
    }
    case '#/edit-profile': {
      actualView.appendChild(components.home());
      const appContent = actualView.querySelector('#route-change-content');
      appContent.innerHTML = '';
      appContent.appendChild(components.postform());
      const settingsSection = actualView.querySelector('.settings-section');
      settingsSection.innerHTML = '';
      return settingsSection.appendChild(components.editProfile());
    }
    case '#/theme-options': {
      actualView.appendChild(components.home());
      const appContent = actualView.querySelector('#route-change-content');
      appContent.innerHTML = '';
      appContent.appendChild(components.postform());
      const settingsSection = actualView.querySelector('.settings-section');
      settingsSection.innerHTML = '';
      return settingsSection.appendChild(components.themes());
    }
    default: {
      actualView.innerHTML = '';
    }
  }
};

export { changeView };
