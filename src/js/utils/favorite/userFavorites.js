// import services from '../../../services/services.js';

const refs = {
    wrapp : document.querySelector('.cotainer_allCategory'),
    
};




// const fav = JSON.parse(localStorage.getItem('userData')).favorites;
// const favId = fav.map(elm => elm._id);


const handleAddFavorite = (evt) => {
    if (evt.target.nodeName !== 'path') return;
    const token = localStorage.getItem('token');
    const adId = evt.target.farthestViewportElement.parentElement.offsetParent.dataset.id;
    const svgClass = evt.path[1].children["0"];
    if (svgClass.classList.contains('svg__colorchange')) {
        svgClass.classList.replace('svg__colorchange', 'svg__colorchange-active');
        services.adFavorite(adId, token);
        }
    else {
        svgClass.classList.replace('svg__colorchange-active', 'svg__colorchange');
        services.deleteFavorite(adId, token);
    }
    
}
refs.wrapp.addEventListener('click', handleAddFavorite);

export default handleAddFavorite;