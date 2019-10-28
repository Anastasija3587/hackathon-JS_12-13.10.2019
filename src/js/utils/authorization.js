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
  refs.userName.innerHTML = userData.userData.name;
}

const authorizationSettings = (data, password) => {
  services.isLoggedIn = true;

  localStorage.setItem('isLoggedIn', services.isLoggedIn);
  localStorage.setItem('userData', JSON.stringify(data));
  localStorage.setItem('token', data.token);
  localStorage.setItem('userPassword', password.value.trim());

  refs.userBtn.classList.remove('hidden');
  refs.addPostBtn.classList.remove('hidden');
  refs.logoutBtn.classList.remove('hidden');
  refs.loginBtn.classList.add('hidden');

  refs.userName.innerHTML = data.userData.name;

  location.reload();
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
      return notyf.error('Заповніть усі поля!');
    }

    const user = services.createNewUser(name.value.trim(), email.value.trim(), password.value.trim());

    services.setRegisterUser(user)
    .then((data) => {
      if (data.status === "error") {
        return notyf.error('Такий користувач вже існує!');
      }

      authorizationSettings(data, password);

      Micromodal.close('login-modal');
    })
    .catch((error) => {
      notyf.error('Помилка при реєстрації!');
    });
  };

  form.addEventListener('submit', handleRegistrationSubmit);
};

// login
const handleLoginFormOpening = () => {
  Micromodal.show('login-modal');
  refs.openLoginFormBtn.classList.add('active');
  refs.openRegistrationFormBtn.classList.remove('active');

  refs.formDisplay.innerHTML = authorizationTemplate();
  const form = refs.formDisplay.querySelector('.login_form');

  const handleAuthorizationSubmit = (evt) => {
    evt.preventDefault();
    const [email, password] = evt.currentTarget.elements;

    if (email.value.trim() === '' || password.value.trim() === '') {
      return notyf.error('Заповніть усі поля!');
    }

    const user = services.createUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then((data) => {
      authorizationSettings(data, password);

      Micromodal.close('login-modal');
    })
    .catch((error) => notyf.error('Невірний логін або пароль!'));
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

//logOut
const handleLogoutFormOpening = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = localStorage.getItem('token');
  const password = localStorage.getItem('userPassword');

  const user = services.createUser(userData.userData.email, password);
  services.setLoggedOutUser(user, token).catch((error) => notyf.error('Помилка при виході зі свого акаунту!'));

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

  location.reload();
};

refs.loginBtn.addEventListener('click', handleLoginFormOpening);
refs.openLoginFormBtn.addEventListener('click', handleLoginFormOpening);
refs.openRegistrationFormBtn.addEventListener('click', handleRegistrationFormOpening);
refs.logoutBtn.addEventListener('click', handleLogoutFormOpening);
