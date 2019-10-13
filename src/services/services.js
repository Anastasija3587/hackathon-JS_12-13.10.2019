import axios from "axios";

axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

export default {
  isLoggedIn: false,

  async getAd() {
    try {
      const getAd = await axios.get("/ads/all");
      return getAd.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  // registration/authorization

  createNewUser(name, email, password) {
    const newUser = { name: name, email: email, password: password };

    return newUser;
  },

  createLoggedInUser(email, password) {
    const loggedInUser = { email: email, password: password };

    return loggedInUser;
  },

  createLoggedOutUser(email, password) {
    const loggedOutUser = { email: email, password: password };

    return loggedOutUser;
  },

  async setRegisterUser(user) {
    try {
      const registeredUser = await axios.post(`https://dash-ads.goit.co.ua/api/v1/auth/register`, user);
      return registeredUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async setLoggedInUser(user) {
    try {
      const loggedInUser = await axios.post(`https://dash-ads.goit.co.ua/api/v1/auth/login`, user);

      return loggedInUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async setLoggedOutUser(user, token) {

    try {
      const opt = { headers: { Authorization: token }};
      const loggedOutUser = await axios.post(`https://dash-ads.goit.co.ua/api/v1/auth/logout`, user, opt);
      return loggedOutUser.data;
    } catch (error) {
      throw new Error(error);
    }
  }
};
