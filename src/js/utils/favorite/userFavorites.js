// import services from '../../../services/services.js';

const refs = {
    wrapp : document.querySelector('.cotainer_allCategory'),
    userData : JSON.parse(localStorage.getItem('userData')),
};
<<<<<<< HEAD
=======




// const fav = JSON.parse(localStorage.getItem('userData')).favorites;
// const favId = fav.map(elm => elm._id);
>>>>>>> 31e400abb8212facfc59a6f9fc4d42e1969cca65


const updateLocalStorage = newAd => {
    const fav = refs.userData;
    fav.favorites.push(newAd);
    localStorage.setItem('userData', JSON.stringify(fav));

};
const deleteLocalFavAd = id => {
    const fav = refs.userData;
    const adToRemove = fav.favorites.find(el => el._id === id);
    const removeId = fav.favorites.indexOf(adToRemove);
    fav.favorites.splice(removeId, 1);
    localStorage.setItem('userData', JSON.stringify(fav));


}

const handleAddFavorite = (evt) => {
    if (evt.target.nodeName !== 'path') return;
    const token = localStorage.getItem('token');
    const adId = evt.target.farthestViewportElement.parentElement.offsetParent.dataset.id;
    const svgClass = evt.path[1].children["0"];
    if (svgClass.classList.contains('svg__colorchange')) {
        svgClass.classList.replace('svg__colorchange', 'svg__colorchange-active');
        services.adFavorite(adId, token);
        services.getAdId(adId).then(ad => {
            updateLocalStorage(ad.goal);
         })
        }
    else {
        svgClass.classList.replace('svg__colorchange-active', 'svg__colorchange');
        services.deleteFavorite(adId, token);
        deleteLocalFavAd(adId);
        
    }
    
}
refs.wrapp.addEventListener('click', handleAddFavorite);

export default handleAddFavorite;