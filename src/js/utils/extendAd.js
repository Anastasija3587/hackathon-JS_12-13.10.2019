import services from '../../services/services';
import extendedAd from '../../hbs/extendedAd.hbs';
import axios from 'axios';
import dateformat from 'dateformat';

export const refs = {
extend: document.querySelector('.cotainer_allCategory'),
modalWindow: document.querySelector('.micromodal-ads'),
};

export const extendAdWindow = async evt => {
    const id = evt.target.closest('.category-section').dataset.id;
    const request = await axios.get(`https://dash-ads.goit.co.ua/api/v1/ads/${id}`);
    const getData = await request.data.goal;
    refs.modalWindow.innerHTML = '';
    const createdAt = new Date(getData.createdAt);
    const updatedAt = new Date(getData.updatedAt);
       const getDataParams = extendedAd({id: getData._id, type: getData.title, phone: getData.phone, createdAt: dateformat(createdAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT'), updatedAt: dateformat(updatedAt, 'dddd, mmmm dS, yyyy, h:MM:ss TT'), img: getData.images, description: getData.description, price: getData.price});
       refs.modalWindow.insertAdjacentHTML('beforeend', getDataParams);
       const closeButton = document.querySelector('.close-button');
      
    document.addEventListener('keydown', function(event) {
        if (event.code === 'Escape') {
            closeButton.closest('.category-modal').style.display = 'none';
        }
      });

       closeButton.addEventListener('click', ()=> {
           if(closeButton){
            closeButton.closest('.category-modal').style.display = 'none';
           }
       })
}

refs.extend.addEventListener('click', extendAdWindow);
