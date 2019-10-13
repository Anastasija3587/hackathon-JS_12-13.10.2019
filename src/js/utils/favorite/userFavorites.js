import services from '../../../services/services.js';

const refs = {
    wrapp : document.querySelector('.categogories-wrapper'),
};

const handleAddFavorite = (evt) => {
    if (evt.target.nodeName !== 'path') return;
    const adId = evt.target.farthestViewportElement.parentElement.offsetParent.dataset.id;
    const svgClass = evt.path[1].children["0"];
    if (svgClass.classList.contains('svg__colorchange')) {
        svgClass.classList.replace('svg__colorchange', 'svg__colorchange-active');
        const userID = JSON.parse(localStorage.getItem('userData'));
        const token = JSON.parse(localStorage.getItem('token'));
        services.getAdId(adId).then(ad => {
           services.adFavorite(userID, token, ad);
        })
    }
    else {
        svgClass.classList.replace('svg__colorchange-active', 'svg__colorchange')
    }
    
}
refs.wrapp.addEventListener('click', handleAddFavorite);