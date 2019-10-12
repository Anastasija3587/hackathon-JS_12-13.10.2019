import axios from "axios";

axios.defaults.baseURL = "https://dash-ads.goit.co.ua/api/v1";

export default {
  async getAd() {
    try {
      const getAd = await axios.get("/ads/all");
      return getAd.data;
    } catch (error) {
      throw new Error("Error");
    }
  },
  async getUserCategories() {
    try {
      const getCategories = await axios.post("/auth/login", {
        email: "test9@gmail.com",
        password: "qwerty"
      });

      return getCategories.data.categories;
    } catch (error) {
      throw new Error("Error");
    }
  },

  async getByCategories(inputCategory) {
    try {
      const categoriesQuery = axios.get(
        `/ads/all?category=${inputCategory}&page=1`
      );
      const filteredAds = categoriesQuery.then(data => data.data.ads.docs);
      return filteredAds;
    } catch (error) {
      throw new Error("Error");
    }
  }
};
