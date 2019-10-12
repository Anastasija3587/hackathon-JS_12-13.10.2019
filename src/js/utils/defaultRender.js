import services from "../../services/services";
import categoryTemplate from "../../templates/category.hbs";

let categoriesWrapper = document.querySelector(".categories_wrapper");



function getFilteredAds({ target }) {
  if (target.dataset.id) {
    services.getByCategories(target.dataset.id).then(console.log);
  }
}

function addToFavorite({ target }) {
  if (target.classlist == "add_to_favorite") {
  }
}


