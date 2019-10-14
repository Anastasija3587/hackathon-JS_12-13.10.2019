import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Micromodal from 'micromodal';
import services from '../../services/services';
import registrationTemplate from '../../../templates/registration.hbs';
import authorizationTemplate from '../../../templates/authorization.hbs';
const notyf = new Notyf();

const refs = {
  userBtn: document.querySelector('.user-button'),
  addPostBtn: document.querySelector('.add-post'),
  loginBtn: document.querySelector('.login_button'),
  logoutBtn: document.querySelector('.logout_button'),
  formDisplay: document.querySelector('.form_display'),
  openLoginFormBtn: document.querySelector('.open_login_form_btn'),
  openRegistrationFormBtn: document.querySelector('.open_registration_form_btn'),
  registrationForm: document.querySelector('.registration_form'),
  loginForm: document.querySelector('.login_form'),
}

const token = localStorage.getItem('token');

if (token) {
  refs.userBtn.classList.remove('hidden');
  refs.addPostBtn.classList.remove('hidden');
  refs.logoutBtn.classList.remove('hidden');
  refs.loginBtn.classList.add('hidden');
}

// login
const handleFormOpening = () => {
  Micromodal.show('login-modal');

  refs.openLoginFormBtn.classList.add('active');
  refs.openRegistrationFormBtn.classList.remove('active');

  refs.formDisplay.innerHTML = authorizationTemplate();
  const form = refs.formDisplay.querySelector('.login_form');

  const handleAuthorizationSubmit = (evt) => {
    evt.preventDefault();

    const [email, password] = evt.currentTarget.elements;

    if (email.value.trim() === '' || password.value.trim() === '') {
      return notyf.error('Заполните все поля!');
    }

    const user = services.createLoggedInUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then(data => {
      console.log(data);
      services.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', services.isLoggedIn);
      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('userPassword', password.value.trim());

      refs.userBtn.classList.remove('hidden');
      refs.addPostBtn.classList.remove('hidden');
      refs.logoutBtn.classList.remove('hidden');
      refs.loginBtn.classList.add('hidden');
    })
    .catch(error => notyf.error('Ошибка при логанизации: ', error));

    Micromodal.close('login-modal');
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

// registration
const handleRegistrationFormOpening = (evt) => {
  evt.currentTarget.classList.add('active');
  refs.openLoginFormBtn.classList.remove('active')
  refs.formDisplay.innerHTML = registrationTemplate();

  const form = refs.formDisplay.querySelector('.registration_form');

  const handleRegistrationSubmit = (evt) => {
    evt.preventDefault();

    const [name, email, password] = evt.currentTarget.elements;

    if (name.value.trim() === '' || email.value.trim() === '' || password.value.trim() === '') {
      return notyf.error('Заполните все поля!');
    }

    const user = services.createNewUser(name.value.trim(), email.value.trim(), password.value.trim());

    services.setRegisterUser(user)
    .then(data => {

      if(data.status === "error")
      {
        notyf.error('Такой пользователь уже существует!');
        return;
      }

      services.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', services.isLoggedIn);
      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('userPassword', password.value.trim());

      refs.userBtn.classList.remove('hidden');
      refs.addPostBtn.classList.remove('hidden');
      refs.logoutBtn.classList.remove('hidden');
      refs.loginBtn.classList.add('hidden');
    })
    .catch((error)=> {
      notyf.error('Такой пользователь уже существует!')
    });

    Micromodal.close('login-modal');
  };

  form.addEventListener('submit', handleRegistrationSubmit);
};

//login

const handleLoginFormOpening = (evt) => {
  evt.currentTarget.classList.add('active');
  refs.openRegistrationFormBtn.classList.remove('active');
  refs.formDisplay.innerHTML = authorizationTemplate();

  const form = refs.formDisplay.querySelector('.login_form');

  const handleAuthorizationSubmit = (evt) => {
    evt.preventDefault();

    const [email, password] = evt.currentTarget.elements;

    if (email.value.trim() === '' || password.value.trim() === '') {
      return notyf.error('Заполните все поля!');
    }

    const user = services.createLoggedInUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then(data => {
      services.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', services.isLoggedIn);
      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('userPassword', password.value.trim());

      refs.userBtn.classList.remove('hidden');
      refs.addPostBtn.classList.remove('hidden');
      refs.logoutBtn.classList.remove('hidden');
      refs.loginBtn.classList.add('hidden');
    })
    .catch(error => notyf.error('Ошибка при логанизации: ', error));

    Micromodal.close('login-modal');
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

//logOut
const handleLogoutFormOpening = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  const password = localStorage.getItem('userPassword');

  if (!userData) return;

  const user = services.createLoggedOutUser(userData.userData.email, password);
  services.setLoggedOutUser(user, token).catch(error => notyf.error('Ошибка при выходе из аккаунта: ', error));

  services.isLoggedIn = false;
  localStorage.setItem('isLoggedIn', services.isLoggedIn);
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  localStorage.removeItem('userPassword');

  refs.userBtn.classList.add('hidden');
  refs.addPostBtn.classList.add('hidden');
  refs.logoutBtn.classList.add('hidden');
  refs.loginBtn.classList.remove('hidden');
};

refs.loginBtn.addEventListener('click', handleFormOpening);
refs.logoutBtn.addEventListener('click', handleLogoutFormOpening);
refs.openLoginFormBtn.addEventListener('click', handleLoginFormOpening);
refs.openRegistrationFormBtn.addEventListener('click', handleRegistrationFormOpening);
