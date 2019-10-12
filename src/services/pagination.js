import axios from "axios";


export default {refs = {
        next: document.querySelector(".next"),
        previous: document.querySelector(".previous"),
        container: document.querySelector(".container"),
        search: document.querySelector(".search")     
},
  image: [],
  searchQuery: "" ? "" : "javaScript",
  page: 1,  
  api: `https://dash-ads.goit.co.ua/api/v1`,
  fetchPost: function(value) {
    console.log("value", value);
    console.log("searchQuery", this.searchQuery);
    console.log(this.page);
    this.nextPage();
    return axios.get(
      `${this.api}q=${value}&page=${this.page}`
    );
},
nextPage() {
    this.page += 1;
  },
prevPage() {
    this.page -= 1;
  },
}
