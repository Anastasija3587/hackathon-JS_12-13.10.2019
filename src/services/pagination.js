import services from "../services/services";
import categioryRender from "../templates/category.hbs";

const nextPage = document.querySelector(".next");
const container = document.querySelector(".cotainer_allCategory");

const allAd = () => {
  services.getAdLimit().then(data => {
    const all = data.ads.docs.map(elem => {
      container.insertAdjacentHTML("beforeend", categioryRender(elem));
    });
  });
};

allAd();

const next = () => {
  services.nextPage();
  services.getAdLimit().then(data => {
    const all = data.ads.docs.map(elem => {
      container.insertAdjacentHTML("beforeend", categioryRender(elem));
    });
  });
};

nextPage.addEventListener("click", next);
