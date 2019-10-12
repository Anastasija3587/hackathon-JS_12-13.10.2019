import template from "../../../templates/category.hbs";

import services from "../../../services/services";

console.log("hello");

 export default services.getAd().then(data => {
  console.log(data);
  let arrToRender = data.ads.docs.map(el => {

    return template(el);
  });
  let container = document.querySelector(".cotainer_allCategory");
  container.insertAdjacentHTML("beforeend", arrToRender);
});
