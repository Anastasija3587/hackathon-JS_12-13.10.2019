import services from "../../../services/services";
import template from "../../../templates/category.hbs";

export const startFavorite = () => {
  const refForFav = document.querySelectorAll(".category-section");
  const arrFavD = Array.from(refForFav);
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (userData) {
    const fav = userData.favorites;
    const favId = fav.map(elm => elm._id);
    const arrWithFav = arrFavD.filter(el => favId.includes(el.dataset.id));
    arrWithFav.map(el =>
      el.childNodes[5].childNodes[3].childNodes[1].childNodes[3].children[
        "0"
      ].classList.replace("svg__colorchange", "svg__colorchange-active")
    );
  }
};
const refs = {
  container: document.querySelector(".categories__list")
};
services.getAdByCategory(1).then(data => {
  services.loaderOn();
  const onlyContentCategory = data.ads.categories
    .map(
      elem => `<li class="categories__list-item" data-id="${elem._id}">
        <button class="categories__list-btn">${elem.category}</button>
       </li> `
    )
    .join("");
  let htmlToRender = onlyContentCategory;

  services.loaderOf();
  refs.container.insertAdjacentHTML("beforeend", htmlToRender);
  services.loaderOf();
  const btn = document.querySelectorAll(".categories__list-btn");
  const clearFilterBtn = document.querySelector(
    ".categories__list-item_clear_filter"
  );
  const handleClickCategory = e => {
    services.loaderOn();
    //удаляем класc active и добавляем в активную кнопку
    btn.forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    services.chooseCategory(e.target.closest("li").dataset.id);

    services.getAdByCategory(services.giveCategory()).then(data => {
      let arrToRender = data.ads.docs.map(el => {
        return template(el);
      });

      let container = document.querySelector(".cotainer_allCategory");
      container.innerHTML = "";
      services.loaderOf();
      container.insertAdjacentHTML("beforeend", arrToRender.join(""));
      startFavorite();
    });
  };

  const clearFilter = () => {
    btn.forEach(el => el.classList.remove("active"));

    renderCards("all");
  };

  clearFilterBtn.addEventListener("click", clearFilter);
  btn.forEach(elem => elem.addEventListener("click", handleClickCategory));
});

//функция отрисовки карточек в контейнере

export function renderCards(id) {
  let container = document.querySelector(".cotainer_allCategory");
  services.loaderOn();
  container.innerHTML = "";
  services.getAdId(id).then(data => {
    let arrToRender = data.ads.docs.map(el => {
      return template(el);
    });
    services.loaderOf();
    container.insertAdjacentHTML("beforeend", arrToRender.join(""));
    startFavorite();
  });
}
