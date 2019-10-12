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

//   async searchAds(inputValue , pageNumber = 1) {
//     try {
//       const serach = await axios.get(`/ads/all?page=${pageNumber}$query=${inputValue}`);
//       return serach.data;
//     } 
//     catch(error) {
//       throw new Error("Error");
//     }
//   }

};
