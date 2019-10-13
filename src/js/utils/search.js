const search = document.querySelector('#search')
const searchForm = document.querySelector('#searchForm')

const searchFormSubmit = (e) => {
    e.preventDefault()
}
const searchFormChange = (e) => {
    const inputValue = e.target.value;
    const pageNumber = 1;
    const pageLimit = 10;

    fetch(
      `https://dash-ads.goit.co.ua/api/v1/ads/all?search=${inputValue}&limit=${pageLimit}&page=${pageNumber}`
      )
      .then(res => res.json())
      .then(result => console.log(result))
  };


searchForm.addEventListener('submit',searchFormSubmit )
search.addEventListener('change',searchFormChange )

