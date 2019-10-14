import services from '../services/services';
import categioryRender from '../templates/category.hbs'

const nextPage = document.querySelector('.next')
const container = document.querySelector('.cotainer_allCategory')
// const search = document.querySelector('.search')

const allAd = () => {
    services.getAdLimit().then(data => {
  const all = data.ads.docs.map(elem => {
  //  console.log( categioryRender(elem))
    container.insertAdjacentHTML('beforeend', categioryRender(elem))
  })
    })
}

allAd()

const next = () => {
    services.nextPage()
    services.getAdLimit().then(data =>  {
        const all = data.ads.docs.map(elem =>{
          console.log(elem)
          container.insertAdjacentHTML('beforeend', categioryRender(elem))
        })
    }
    )
}

// const getQurty = evt => {
//     services.defaultPage();
//     console.log(evt.target.value);
//     services.refs.container.innerHTML = "";
//     services.getValue(evt.target.value);
//     services.fetchNews(evt.target.value).then(data => {
//       console.log(data.data);
//       const renderToHtml = data.data.articles
//         .map(elem => `<img width='300' src='${elem.urlToImage}'/>`)
//         .join("");
  
//       services.refs.container.insertAdjacentHTML("beforeend", renderToHtml);
//     });
//   };




nextPage.addEventListener('click', next);


