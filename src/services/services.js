import axios from "axios";

axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

export default {
  pageNumber: 1,

  limit: 10,

  isLoggedIn: false,

  category: null,

  image: [],

  idUpdate: "",

  chooseCategory(value) {
    this.category = value;
  },

  giveCategory() {
    return this.category;
  },

  async getAd() {
    try {
      const getAd = await axios.get("/ads/all");
      return getAd.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  nextPage() {
    this.pageNumber += 1;
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

  createUser(email, password) {
    const user = {
      email: email,
      password: password
    };

    return user;
  },

  async setRegisterUser(user) {
    try {
      const registeredUser = await axios.post(
        `https://dash-ads.goit.co.ua/api/v1/auth/register`,
        user
      );
      return registeredUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async setLoggedInUser(user) {
    try {
      const loggedInUser = await axios.post(
        `https://dash-ads.goit.co.ua/api/v1/auth/login`,
        user
      );

      return loggedInUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async setLoggedOutUser(user, token) {
    localStorage.setItem("token", "");
    localStorage.setItem("userData", {});
    try {
      const opt = {
        headers: {
          Authorization: token
        }
      };
      const loggedOutUser = await axios.post(
        `https://dash-ads.goit.co.ua/api/v1/auth/logout`,
        user,
        opt
      );
      return loggedOutUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getAdId(id) {
    try {
      const AdId = await axios.get(`/ads/${id}`);
      return AdId.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async getAdLimit() {
    try {
      const adLimit = await axios.get(
        `/ads/all?limit=${this.limit}&page=${this.pageNumber}`
      );
      return adLimit.data;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async getAdByCategory(category) {
    try {
      const AdByCategory = await axios.get(
        `/ads/all?category=${category}&page=${this.pageNumber}`
      );
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
        method: "put",
        url: `/user/favorite/${Id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
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
        method: "delete",
        url: `/user/favorite/${Id}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        data: {}
      });
      return getUserFavourites;
    } catch (error) {
      throw new Error("Error");
    }
  },

  addItemFn(category, title, description, price, phone) {
    const newItem = {
      category: category,
      title: title,
      description: description,
      price: Number(price),
      phone: phone,
      images: [this.image]
    };
    return newItem;
  },

  async postNewPost(item) {
    const token = localStorage.getItem("token");

    if (token !== null) {
      const opt = {
        headers: {
          Authorization: token
        }
      };
      try {
        const newPost = await axios.post(
          "https://dash-ads.goit.co.ua/api/v1/ads",
          item,
          opt
        );
        return newPost.data;
      } catch (error) {
        throw new Error(error);
      }
    }
  },

  async deleteAd(adId) {
    try {
      let result = await axios.delete(`/ads/${adId}`, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async updateAd(id, updateValue) {
    try {
      const updateAd = await axios.patch(`/ads/${id}`, updateValue, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      });
      return updateAd.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getIdForUpdate(idUpdate) {
    this.idUpdate = idUpdate;
  },

  throwIdForUpdate() {
    return this.idUpdate;
  }
};
