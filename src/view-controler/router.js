import { components } from '../view/index.js'
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
            return actualView.appendChild(components.signup());
        }
        case '#/home': {
            return actualView.appendChild(components.home());
        }
        case '#/profile': {
            actualView.appendChild(components.home());
            const mainHome = actualView.querySelector('.main-home');
            mainHome.innerHTML= '';
            return mainHome.appendChild(components.profile());
        }
        default:
            return actualView.innerHTML = '';
    }
}

export { changeView }