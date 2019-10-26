import services from "../services/services";
import categioryRender from "../templates/category.hbs";

const nextPage = document.querySelector(".next");
const container = document.querySelector(".cotainer_allCategory");

const userData = JSON.parse(localStorage.getItem('userData'));

const userFavoritesIds = [];

if (userData) {
  userData.favorites.map(el => {
  userFavoritesIds.push(el._id);
});
}

export const allAd = (idsList) => {
  services.getAdLimit().then(data => {
    const all = data.ads.docs.map(elem => {
      container.insertAdjacentHTML("beforeend", categioryRender(elem));
      if(idsList.includes(elem._id)) {
        container.querySelector(`[data-id="${elem._id}"]`)
                .querySelector('.svg__colorchange').classList
                .replace("svg__colorchange", "svg__colorchange-active");
      }
    });
    console.log('hello');
  });
};

allAd(userFavoritesIds);

const next = (idsList) => {
  services.nextPage();
  allAd(idsList);
};



nextPage.addEventListener("click", () => {next(userFavoritesIds)});
