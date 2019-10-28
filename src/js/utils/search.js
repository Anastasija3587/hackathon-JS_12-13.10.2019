import template from "../../templates/category.hbs";
import refs from './refs';
import * as api_category from './Filter-by-category/api_category';

const searchFormSubmit = e => {
  e.preventDefault();
};
const searchFormChange = e => {
  const inputValue = e.target.value;
  const pageNumber = 1;
  const pageLimit = 10;

  fetch(
    `https://dash-ads.goit.co.ua/api/v1/ads/all?search=${inputValue}&limit=${pageLimit}&page=${pageNumber}`
  )
    .then(res => res.json())
    .then(result => {
      let arrToRender = result.ads.docs.map(el => {
        return template(el);
      });

      let container = document.querySelector(".cotainer_allCategory");
      container.innerHTML = "";
      container.insertAdjacentHTML("beforeend", arrToRender.join(""));
      api_category.startFavorite();
    });
};

refs.searchForm.addEventListener("submit", searchFormSubmit);
refs.search.addEventListener("change", searchFormChange);
