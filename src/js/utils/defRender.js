import services from "../../services/services";
let categoriesWrapper = document.querySelector(".categories_wrapper");




function defaultCategories() {
  services.getUserCategories().then(data => console.log(data));
}

function getFilteredAds({ target }) {
  if (target.dataset.id) {
    services.getByCategories(target.dataset.id).then(console.log);
  }
}

// categoriesWrapper.addEventListener("click", getFilteredAds);
