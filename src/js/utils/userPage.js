import refs from "./refs";
import MicroModal from 'micromodal';
import userFavorite from '../../hbs/userFavorite.hbs';
import userPosts from '../../hbs/userPosts.hbs';
// import services from "../../services/services";



export const common = () => {

    const userObject = JSON.parse(localStorage.getItem("userData"));

    const openUserModal = () => {
        // console.log('ddd')
        MicroModal.show('user-postiki');
    }


    const createFavoriteCard = (Obj) => {
        // console.log("Obj1",Obj);
        const render = Obj.map(obj => userFavorite(obj)).join('');
        return render
    }
    const createPostsCard = (Obj) => {
        // console.log("Obj2", Obj);
        const render = Obj.map(obj => userPosts(obj)).join('');
        return render
    }

    const TEST = createFavoriteCard(userObject.favorites);
    const TEST1 = createPostsCard(userObject.ads);


    refs.user.addEventListener('click', openUserModal);

    refs.favorites.insertAdjacentHTML('beforeend', TEST);
    refs.posts.insertAdjacentHTML('beforeend', TEST1);



}


if (localStorage.getItem("userData")) {
    common();
} else {
    null
}