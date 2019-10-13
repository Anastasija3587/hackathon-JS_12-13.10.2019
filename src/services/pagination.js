import services from '../services/services'

console.log('fjfh')
const nextPage = document.querySelector('.next')
const container = document.querySelector('.container')
// const search = document.querySelector('.search')

const allAd = () => {
    services.getAdLimit().then(data => {
        const all = data.ads.docs.map(elem => `<p>${elem.description}</p>`)
        container.insertAdjacentHTML('beforeend', all)
    })
}

allAd()

const next = () => {
    services.nextPage()
    services.getAdLimit().then(data =>  {
        const all = data.ads.docs.map(elem => `<p>${elem.description}</p>`)
        container.insertAdjacentHTML('beforeend', all)
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


