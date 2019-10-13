import services from '../../../services/services';

const refs = {
    container : document.querySelector('.container')
}

services.getAdByCategory(1).then(data => {
    const onlyContentCategory = data.ads.categories.map(elem => `<button class='btn-category' id=${elem._id}>${elem.category}</button>`).join('')
    refs.container.insertAdjacentHTML('afterend', onlyContentCategory)
    // console.log(data.ads.categories)

    const btn = document.querySelectorAll('.btn-category')
    

    const handleClickCategory = (e)=>{
        services.chooseCategory(e.target.id)
        services.getAdByCategory(services.giveCategory()).then(data => console.log(data))
    }

    btn.forEach(elem => elem.addEventListener('click', handleClickCategory))
});




