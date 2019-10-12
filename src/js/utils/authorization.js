import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import Micromodal from 'micromodal';
import services from '../../services/services';
import registrationTemplate from '../../../templates/registration.hbs';
import authorizationTemplate from '../../../templates/authorization.hbs';
import * as basicLighbox from 'basiclightbox'
const notyf = new Notyf();

const createRegistrationForm = basicLighbox.create(registrationTemplate());
const createAuthorizationForm = basicLighbox.create(authorizationTemplate());

const refs = {
  loginBtn: document.querySelector('.login_button'),
  formDisplay: document.querySelector('.form_display'),
  openLoginFormBtn: document.querySelector('.open_login_form_btn'),
  openRegistrationFormBtn: document.querySelector('.open_registration_form_btn'),
  registrationForm: document.querySelector('.registration_form'),
  loginForm: document.querySelector('.login_form'),
}

const handleFormOpening = () => {
  Micromodal.show('login-modal');
  refs.formDisplay.innerHTML = authorizationTemplate();
};

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
    console.log(user)

    services.setRegisterUser(user)
    .then(data => {
      console.log(data)
      if(data.status === "error") {
        notyf.error('Такой пользователь уже существует!');

        return;
      }

      console.log(data);

      services.isLoggedIn = true;
      localStorage.setItem('userData', JSON.stringify(data));
    })
    .catch(error => notyf.error('Ошибка при регистрации: ', error));

    Micromodal.close('login-modal');
  };

  form.addEventListener('submit', handleRegistrationSubmit);
};

const handleLoginFormOpening = (evt) => {
  evt.currentTarget.classList.add('active');
  refs.openRegistrationFormBtn.classList.remove('active');
  refs.formDisplay.innerHTML = authorizationTemplate();

  const form = refs.formDisplay.querySelector('.login_form');
  console.log(form);

  const handleAuthorizationSubmit = (evt) => {
    evt.preventDefault();

    const [email, password] = evt.currentTarget.elements;

    console.log(evt.currentTarget.elements);


    if (email.value.trim() === '' || password.value.trim() === '') {
      return notyf.error('Ошибка при логанизации: ', error);
    }

    console.log(email);

    const user = services.createLoggedInUser(email.value.trim(), password.value.trim());
    services.setLoggedInUser(user).then(data => {
      console.log(data);

      services.isLoggedIn = true;
      console.log(JSON.stringify(data));
      localStorage.setItem('userData', JSON.stringify(data));
    })
    .catch(error => console.error(error));

    Micromodal.close('login-modal');
  };

  form.addEventListener('submit', handleAuthorizationSubmit);
};

refs.loginBtn.addEventListener('click', handleFormOpening);
refs.openLoginFormBtn.addEventListener('click', handleLoginFormOpening);
refs.openRegistrationFormBtn.addEventListener('click', handleRegistrationFormOpening);
