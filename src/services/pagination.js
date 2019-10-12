import services from '../services/services'

// export default {refs = {
//         next: document.querySelector(".next"),
//         previous: document.querySelector(".previous"),
//         container: document.querySelector(".container"),
//         search: document.querySelector(".search")     
// },
//   image: [],
//   searchQuery: "" ? "" : "javaScript",
//   page: 1,  
//   api: `https://dash-ads.goit.co.ua/api/v1`,
//   fetchPost: function(value) {
//     console.log("value", value);
//     console.log("searchQuery", this.searchQuery);
//     console.log(this.page);
//     this.nextPage();
//     return axios.get(
//       `${this.api}q=${value}&page=${this.page}`
//     );
// },
// nextPage() {
//     this.page += 1;
//   },
// prevPage() {
//     this.page -= 1;
//   },
// }

console.log('fjfh')
const nextPage = document.querySelector('.next')
const container = document.querySelector('.container')
const search = document.querySelector('.search')

const allAd = () => {
    services.getAdLimit().then(data => {
        const all = data.ads.docs.map(elem => `<p>${elem.description}</p>`)
        container.insertAdjacentHTML('beforeend', all)
    })
}

allAd()

const next = () => {
    services.nextPage()
    services.getAdLimit().then(data =>  {
        const all = data.ads.docs.map(elem => `<p>${elem.description}</p>`)
        container.insertAdjacentHTML('beforeend', all)
    }
    )
}

const getQurty = evt => {
    services.defaultPage();
    console.log(evt.target.value);
    services.refs.container.innerHTML = "";
    services.getValue(evt.target.value);
    services.fetchNews(evt.target.value).then(data => {
      console.log(data.data);
      const renderToHtml = data.data.articles
        .map(elem => `<img width='300' src='${elem.urlToImage}'/>`)
        .join("");
  
      services.refs.container.insertAdjacentHTML("beforeend", renderToHtml);
    });
  };




nextPage.addEventListener('click', next);

services.refs.qurty.addEventListener("change", getQurty);
