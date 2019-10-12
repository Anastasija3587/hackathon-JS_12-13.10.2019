import services from "../../../services/services";

const refs = {
  container: document.querySelector(".container")
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
  refs.container.insertAdjacentHTML("afterend", onlyContentCategory);
  console.log(data.ads.categories);

  const btn = document.querySelectorAll(".btn-category");

  const handleClickCategory = e => {
    btn.forEach(el => el.classList.remove("active"));
    e.target.classList.add("active");
    services.chooseCategory(e.target.id);
    services
      .getAdByCategory(services.giveCategory())
      .then(data => console.log(data));
    e.target.classList.add("active");
  };

  btn.forEach(elem => elem.addEventListener("click", handleClickCategory));
});
