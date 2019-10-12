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
};

const handleLoginFormOpening = (evt) => {
  evt.currentTarget.classList.add('active');
  refs.openRegistrationFormBtn.classList.remove('active');
  refs.formDisplay.innerHTML = authorizationTemplate();
};

const handleRegistrationSubmit = (evt) => {
  evt.preventDefault();
  console.log("submit")
  const elem = createRegistrationForm.element();
  const [name, email, password] = form;
  console.log(name);

  const user = services.createNewUser(name, email, password);

  services.setRegisterUser(user).then(data => console.log(data)).catch(error => console.error(error));

  if(registeredUser.data.status === "error") {
    notyf.error('Такой пользователь уже существует!');
    console.log('Такой пользователь уже существует!');

    return;
  }

  services.isLoggedIn = true;
  localStorage.setItem('token', token);

  // Micromodal.close('login-modal');
};

const handleAuthorizationSubmit = (evt) => {
  evt.preventDefault();
  const user = services.createLoggedInUser(email, password);
  services.setLoggedInUser(user).then(data => console.log(data)).catch(error => console.error(error));
  services.isLoggedIn = true;
  localStorage.setItem('token', token);
  // Micromodal.close('note-editor-modal');
};

refs.loginBtn.addEventListener('click', handleFormOpening);
refs.openLoginFormBtn.addEventListener('click', handleLoginFormOpening);
refs.openRegistrationFormBtn.addEventListener('click', handleRegistrationFormOpening);

// refs.registrationForm.addEventListener('submit', handleRegistrationSubmit);