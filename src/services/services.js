import axios from "axios";


axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

export default {

  pageNumber: 1,

  isLoggedIn: false,


  category: null,

  image: [],

  chooseCategory(value) {
    this.category = value;
  },


  giveCategory() {
    return this.category;
  },

  async getAd() {
    // this.loaderOn();
    try {
      const getAd = await axios.get("/ads/all");
      return getAd.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  // registration/authorization

  createNewUser(name, email, password) {
    const newUser = {
      name: name,
      email: email,
      password: password
    };

    return newUser;
  },

  createLoggedInUser(email, password) {
    const loggedInUser = {
      email: email,
      password: password
    };

    return loggedInUser;
  },

  createLoggedOutUser(email, password) {
    const loggedOutUser = {
      email: email,
      password: password
    };

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
      const opt = {
        headers: {
          Authorization: token
        }
      };
      const loggedOutUser = await axios.post(`https://dash-ads.goit.co.ua/api/v1/auth/logout`, user, opt);
      return loggedOutUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },


  async getAdId(id) {
    // this.loaderOn();
    try {
      const AdId = await axios.get(`/ads/${id}`);
      return AdId.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async getAdLimit(limit, pageNumber = 1) {
    // this.loaderOn();
    try {
      const adLimit = await axios.get(
        `/ads/all?limit=${limit}&page=${pageNumber}`
      );
      return adLimit.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async getAdByCategory(category) {
    // this.loaderOn();
    try {
      const AdByCategory = await axios.get(`/ads/all?category=${category}&page=${this.pageNumber}`);
      return AdByCategory.data;
    } catch (error) {
      throw new Error("Error");
    }
  },


  async userCreate(userData) {
    try {
      const addUser = await axios.post(`/auth/register`, {
        email: userData.email,
        password: userData.password,
        name: userData.name
      });
      return addUser.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async userLogin(userData) {
    try {
      const user = await axios.post(`/auth/login`, {
        email: userData.email,
        password: userData.password
      });
      return user.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async userLogout(userData, token) {
    try {
      const user = await axios({
        method: "post",
        url: `/auth/logout`,
        headers: {
          Authorization: token
        },
        data: userData
      });
      return user.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async submitUserAd(userAd, token) {
    try {
      const user = await axios({
        method: "post",
        url: `/ads`,
        headers: {
          Authorization: token
        },
        data: userAd
      });
      return user.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async deleteUserAd(adId, token) {
    try {
      const user = await axios({
        method: "delete",
        url: `/ads/${adId}`,
        headers: {
          Authorization: token
        }
      });
      return user.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  loaderOn() {
    const target = document.querySelector(".spinnerContainer");
    target.classList.add("lds-spinner");
  },
  loaderOf() {
    const target = document.querySelector(".spinnerContainer");
    target.classList.remove("lds-spinner");
  },

  async adFavorite(Id, token) {
    try {
      const getUserFavourites = await axios({
        method: 'put',
        url: `/user/favorite/${Id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {}
      });
      return getUserFavourites;
    } catch (error) {
      throw new Error("Error");
    
    }
  },
  async deleteFavorite(Id, token) {
    try {
      const getUserFavourites = await axios({
        method: 'delete',
        url: `/user/favorite/${Id}`,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        data: {}
      });
      return getUserFavourites;
    } catch (error) {
      throw new Error("Error");
    
    }
  },
  addItemFn(title, category, price, description, phone) {
    const newItem = {
      images: [this.image],
      title: title,
      category: Number(category),
      price: Number(price),
      phone: phone,
      description: description,
    };
    console.log("Service-newItem", newItem);
    return newItem
  },
  



};