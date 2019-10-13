//  мне приходит OBJECT информации о юзере

import refs from "./refs";
import MicroModal from 'micromodal';
import userFavorite from '../../hbs/userFavorite.hbs';
import userPosts from '../../hbs/userPosts.hbs';
// import testobject from './objecttest.json';   !!!! тут obj от Иры

export const openUserModal = () => {
    MicroModal.show('user-postiki');
}


export const createFavoriteCard = (Obj) => {
    console.log("Obj1",Obj);
    const render = Obj.map(obj => userFavorite(obj)).join('');
    return render
}
export const createPostsCard = (Obj) => {
    console.log("Obj2", Obj);
    const render = Obj.map(obj => userPosts(obj)).join('');
    return render
}

// const TEST = createFavoriteCard(testobject.favorites); /*заменить testobject на то что ира отдаст */
// const TEST1 = createPostsCard(testobject.ads);  /*заменить testobject на то что ира отдаст */


refs.user.addEventListener('click', openUserModal);

// refs.favorites.insertAdjacentHTML('beforeend', TEST);
// refs.posts.insertAdjacentHTML('beforeend', TEST1);
