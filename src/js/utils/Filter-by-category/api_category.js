import services from "../../../services/services";
import template from "../../../templates/category.hbs";

// var spinner = new Spinner().spin();
// container.appendChild(spinner.el);

const refs = {
  container: document.querySelector(".categories__list")
};
renderCards("all");
services.getAdByCategory(1).then(data => {
  services.loaderOn();
  console.log("lol");
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
  services.loaderOf();
  refs.container.insertAdjacentHTML("beforeend", htmlToRender);
  services.loaderOf();
  const btn = document.querySelectorAll(".categories__list-btn");
  const clearFilterBtn = document.querySelector(
    ".categories__list-item_clear_filter"
  );
  const handleClickCategory = e => {
    services.loaderOn();
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
      services.loaderOf();
      container.insertAdjacentHTML("beforeend", arrToRender.join(""));
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
  services.loaderOn();
  container.innerHTML = "";
  services.getAdId(id).then(data => {
    let arrToRender = data.ads.docs.map(el => {
      return template(el);
    });
    services.loaderOf();
    container.insertAdjacentHTML("beforeend", arrToRender.join(""));
    container.addEventListener("click", findCardId);
  });
}

export function findCardId({ target }) {
  return target.closest(".category-section").dataset.id;
}
