import axios from "axios";

axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

export default {

  pageNumber : 1,

  category : null,

  image: "",

  chooseCategory(value) {
    this.category = value;
  },


  giveCategory() {
   return this.category
  },

  async getAd() {
    try {
      const getAd = await axios.get("/ads/all");
      return getAd.data;
    } catch (error) {
      throw new Error("Error");
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

  async getAdLimit(limit, pageNumber = 1) {
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

  addItemFn(title, category, price, description, phone) {
 
    const newItem = {
      image: this.image,
      title: title,
      category: category,
      price: price,
      phone: phone,
      description: description,
    };
   console.log("Service-newItem", newItem);
   
    // axios.post("https://dash-ads.goit.co.ua/ads", newItem).then(function (response) {
    //   console.log(response);
    // });
  },

};
