import services from "../../../services/services";
// import renderFunc from './renderCards'
import template from "../../../templates/category.hbs";
const refs = {
  container: document.querySelector(".categories__list")
};
renderCards("all");
services.getAdByCategory(1).then(data => {
  const onlyContentCategory = data.ads.categories
    .map(
      elem =>
        `<li class="categories__list-item" data-id="${elem._id}">   
        <button class="categories__list-btn">"${elem.category}"</button>
       </li> `
    )
    .join("");
  let clearBtn = `<button class="categories__list-item_clear_filter">Очистить фильтр</button>`;
  let htmlToRender = onlyContentCategory + clearBtn;
  refs.container.insertAdjacentHTML("beforeend", htmlToRender);

  const btn = document.querySelectorAll(".categories__list-btn");
  const clearFilterBtn = document.querySelector(
    ".categories__list-item_clear_filter"
  );
  const handleClickCategory = e => {
    //удаляем клас active и добавляем в активную кнопку
    btn.forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    services.chooseCategory(e.target.closest("li").dataset.id);

    services.getAdByCategory(services.giveCategory()).then(data => {
      let arrToRender = data.ads.docs.map(el => {
        return template(el);
      });

      let container = document.querySelector(".cotainer_allCategory");
      container.innerHTML = "";
      container.insertAdjacentHTML("beforeend", arrToRender);
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

function renderCards(id) {
  let container = document.querySelector(".cotainer_allCategory");
  container.innerHTML = "";
  services.getAdId(id).then(data => {
    let arrToRender = data.ads.docs.map(el => {
      return template(el);
    });

    container.insertAdjacentHTML("beforeend", arrToRender);
  });
}
