import refs from "./refs";
import MicroModal from 'micromodal';


export const openAddCard = () => {
    MicroModal.show('open-addpost');
}

refs.addCard.addEventListener('click', openAddCard);