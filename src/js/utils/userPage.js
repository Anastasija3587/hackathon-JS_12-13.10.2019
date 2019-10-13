//  мне приходит OBJECT информации о юзере

import refs from "./refs";
import MicroModal from 'micromodal';
import userFavorite from '../../hbs/userFavorite.hbs';
import userPosts from '../../hbs/userPosts.hbs';


export const common = () => {
    if(localStorage.getItem("userData")) {
        const userObject = JSON.parse(localStorage.getItem("userData"));

        const openUserModal = () => {
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
        
        const TEST = createFavoriteCard(userObject.favorites); /*заменить testobject на то что ира отдаст */
        const TEST1 = createPostsCard(userObject.ads);  /*заменить testobject на то что ира отдаст */
        
        
        refs.user.addEventListener('click', openUserModal);
        
        refs.favorites.insertAdjacentHTML('beforeend', TEST);
        refs.posts.insertAdjacentHTML('beforeend', TEST1);
    }
}




