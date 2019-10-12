import services from '../../../services/services';
import catTemplates from '../../../templates/mainCategrories.hbs';

const refs = {
    container : document.querySelector('.categories__list'),
    btn : document.querySelectorAll('.categories__list-btn')
}


services.getAdByCategory(1).then(data => {
    const onlyContentCategory = data.ads.categories.map(elem => catTemplates(elem)).join('')
    refs.container.insertAdjacentHTML('beforeend', onlyContentCategory)
    

    const handleClickCategory = (e)=>{
        services.chooseCategory(e.target.id)
        services.getAdByCategory(services.giveCategory()).then(data => console.log(data))
    }

    refs.btn.forEach(elem => elem.addEventListener('click', handleClickCategory))
});




