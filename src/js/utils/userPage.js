import refs from "./refs";
import MicroModal from 'micromodal';
import userFavorite from '../../hbs/userFavorite.hbs';
import userPosts from '../../hbs/userPosts.hbs';



export const common = () => {

    const userObject = JSON.parse(localStorage.getItem("userData"));

    const openUserModal = () => {
        MicroModal.show('user-postiki');
    }


    const createFavoriteCard = (Obj) => {
        const render = Obj.map(obj => userFavorite(obj)).join('');
        return render
    }
    const createPostsCard = (Obj) => {
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