import services from "../../../services/services.js";
import ref from "../refs";
import userFavorite from "../../../hbs/userFavorite.hbs";
import * as render from "../Filter-by-category/api_category";
import { Notyf } from 'notyf';

const notyf = new Notyf();

const refs = {
  wrapp: document.querySelector(".cotainer_allCategory"),
  userData: JSON.parse(localStorage.getItem("userData"))
};

const updateLocalStorage = newAd => {
  const fav = refs.userData;
  fav.favorites.push(newAd);
  localStorage.setItem("userData", JSON.stringify(fav));
};
const deleteLocalFavAd = id => {
  const fav = refs.userData;
  const adToRemove = fav.favorites.find(el => el._id === id);
  const removeId = fav.favorites.indexOf(adToRemove);
  fav.favorites.splice(removeId, 1);
  localStorage.setItem("userData", JSON.stringify(fav));
};

const handleAddFavorite = evt => {
  if (evt.target.nodeName !== "path") return;
  const token = localStorage.getItem("token");
  if (!token) {
    return notyf.error('Щоб додати до обраних увійдіть в кабінет');
  }
  const adId =
    evt.target.farthestViewportElement.parentElement.offsetParent.dataset.id;
  const svgClass = evt.path[1].children["0"];
  if (svgClass.classList.contains("svg__colorchange")) {
    svgClass.classList.replace("svg__colorchange", "svg__colorchange-active");
    services.adFavorite(adId, token);
    services.getAdId(adId).then(ad => {
      updateLocalStorage(ad.goal);
    });
  } else {
    svgClass.classList.replace("svg__colorchange-active", "svg__colorchange");
    services.deleteFavorite(adId, token);
    deleteLocalFavAd(adId);
  }
};

const handleDelFavor = event => {
  const token = localStorage.getItem("token");

  if (event.target.className !== "delFavor") return;
  const idDelFav = event.target.dataset.id;
  services.deleteFavorite(idDelFav, token);
  deleteLocalFavAd(idDelFav);
  const svgClass = event.path[1].children["0"];
  svgClass.classList.replace("svg__colorchange-active", "svg__colorchange");
  const userObject = JSON.parse(localStorage.getItem("userData"));
  userObject.favorites = userObject.favorites.filter(ad => ad._id !== idDelFav);
  localStorage.setItem("userData", JSON.stringify(userObject));
  const createFavoriteCard = Obj => {
    const render = Obj.map(obj => userFavorite(obj)).join("");
    return render;
  };
  const updateFavor = createFavoriteCard(userObject.favorites);
  ref.favorites.innerHTML = "<h2>Your Favorites</h2>";
  ref.favorites.insertAdjacentHTML("beforeend", updateFavor);

  render.renderCards("all");
};

refs.wrapp.addEventListener("click", handleAddFavorite);
ref.favorites.addEventListener("click", handleDelFavor);

export default handleAddFavorite;
