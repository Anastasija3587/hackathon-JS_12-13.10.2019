import services from "../../../services/services";

const refs = {
  container: document.querySelector(".categories__list")
};

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

  // console.log(data.ads.categories);

  const btn = document.querySelectorAll(".categories__list-btn");
  const clearFilterBtn = document.querySelector(
    ".categories__list-item_clear_filter"
  );
  const handleClickCategory = e => {
    btn.forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    services.chooseCategory(e.target.id);
    services
      .getAdByCategory(services.giveCategory())
      .then(data => console.log(data));
  };

  const clearFilter = () => {
    btn.forEach(el => el.classList.remove("active"));
    return services.getAd().then(data => console.log(data));
  };
  clearFilterBtn.addEventListener("click", clearFilter);
  btn.forEach(elem => elem.addEventListener("click", handleClickCategory));
});
