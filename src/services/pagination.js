import services from "../services/services";
import categioryRender from "../templates/category.hbs";
import refs from '../js/utils/refs';

const userData = JSON.parse(localStorage.getItem('userData'));

let userFavoritesIds = [];

if (userData) {
  userFavoritesIds = userData.favorites.map(el => el._id);
}

export const allAd = () => {
  services.getAdLimit().then(data => {
    data.ads.docs.map(elem => {
      refs.adsContainer.insertAdjacentHTML("beforeend", categioryRender(elem));
      if(userFavoritesIds.includes(elem._id)) {
        refs.adsContainer.querySelector(`[data-id="${elem._id}"]`)
                         .querySelector('.svg__colorchange').classList
                         .replace("svg__colorchange", "svg__colorchange-active");
      }
    });
  });
};

allAd();

const next = () => {
  services.nextPage();
  allAd();
};

refs.nextPage.addEventListener("click", next);
