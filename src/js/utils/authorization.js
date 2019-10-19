import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Micromodal from 'micromodal';
import refs from './refs';
import services from '../../services/services';
import registrationTemplate from '../../templates/registration.hbs';
import authorizationTemplate from '../../templates/authorization.hbs';

const notyf = new Notyf();

const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
 refs.userBtn.classList.remove('hidden');
 refs.addPostBtn.classList.remove('hidden');
 refs.logoutBtn.classList.remove('hidden');
 refs.addCard.classList.remove('hidden');
 refs.loginBtn.classList.add('hidden');
 refs.userBtn.insertAdjacentText('beforeend', userData.userData.name);
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

    const user = services.createUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then((data) => {
      console.log(data);

      if(data.status === "error")
      {
        return notyf.error('Такой пользователь уже существует!');
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

      Micromodal.close('login-modal');
    })
    .catch((error) => notyf.error('Неверный логин или пароль!'));
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

// registration
const handleRegistrationFormOpening = (evt) => {
  evt.currentTarget.classList.add('active');
  refs.openLoginFormBtn.classList.remove('active');

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
    .then((data) => {
      if(data.status === "error")
      {
        return notyf.error('Такой пользователь уже существует!');
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

      notyf.success('Добавьте свое первое объявление!')

      Micromodal.close('login-modal');
    })
    .catch((error) => {
      notyf.error('Ошибка при регистрации!');
    });
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

    const user = services.createUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then((data) => {
      services.isLoggedIn = true;

      localStorage.setItem('isLoggedIn', services.isLoggedIn);
      localStorage.setItem('userData', JSON.stringify(data));
      localStorage.setItem('token', data.token);
      localStorage.setItem('userPassword', password.value.trim());

      refs.userBtn.classList.remove('hidden');
      refs.addPostBtn.classList.remove('hidden');
      refs.logoutBtn.classList.remove('hidden');
      refs.loginBtn.classList.add('hidden');

      Micromodal.close('login-modal');
    })
    .catch((error) => notyf.error('Неверный логин или пароль!'));
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

//logOut
const handleLogoutFormOpening = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  const password = localStorage.getItem('userPassword');

  if (!userData) return;

  const user = services.createUser(userData.userData.email, password);
  services.setLoggedOutUser(user, token).catch((error) => notyf.error('Ошибка при выходе из аккаунта!'));

  services.isLoggedIn = false;
  localStorage.setItem('isLoggedIn', services.isLoggedIn);
  localStorage.removeItem('token');
  localStorage.removeItem('userData');
  localStorage.removeItem('userPassword');

  refs.userBtn.classList.add('hidden');
  refs.addPostBtn.classList.add('hidden');
  refs.logoutBtn.classList.add('hidden');
  refs.addCard.classList.add('hidden');
  refs.loginBtn.classList.remove('hidden');
};

refs.loginBtn.addEventListener('click', handleFormOpening);
refs.logoutBtn.addEventListener('click', handleLogoutFormOpening);
refs.openLoginFormBtn.addEventListener('click', handleLoginFormOpening);
refs.openRegistrationFormBtn.addEventListener('click', handleRegistrationFormOpening);
