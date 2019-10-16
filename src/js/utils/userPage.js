import refs from "./refs";
import MicroModal from "micromodal";
import userFavorite from "../../hbs/userFavorite.hbs";
import userPosts from "../../hbs/userPosts.hbs";
import service from "../../services/services";

export const common = () => {
  const userObject = JSON.parse(localStorage.getItem("userData"));

  const createFavoriteCard = Obj => {
    const render = Obj.map(obj => userFavorite(obj)).join("");
    return render;
  };
  const createPostsCard = Obj => {
    const render = Obj.map(obj => userPosts(obj)).join("");
    return render;
  };

  const TEST = createFavoriteCard(userObject.favorites);
  const TEST1 = createPostsCard(userObject.ads);
  refs.favorites.innerHTML = "<h2>Your Favorites</h2>";
  refs.posts.innerHTML = "<h2>Your Posts</h2>";

  refs.favorites.insertAdjacentHTML("beforeend", TEST);
  refs.posts.insertAdjacentHTML("beforeend", TEST1);
};

const openUserModal = () => {
  MicroModal.show("user-postiki");
  common();
};

if (localStorage.getItem("userData")) {
  refs.user.addEventListener("click", openUserModal);
} else {
  null;
}

// remove posts

const removePost = event => {
  if (event.target.className !== "del") return;
  const idDel = event.target.dataset.id;
  service.deleteAd(idDel);
  const userObject = JSON.parse(localStorage.getItem("userData"));
  userObject.ads = userObject.ads.filter(ad => ad._id !== idDel);
  localStorage.setItem("userData", JSON.stringify(userObject));

  const createPostsCard = Obj => {
    const render = Obj.map(obj => userPosts(obj)).join("");
    return render;
  };

  const delPost = createPostsCard(userObject.ads);
  refs.posts.innerHTML = "<h2>Your Posts</h2>";
  refs.posts.insertAdjacentHTML("beforeend", delPost);
};

refs.posts.addEventListener("click", removePost);
