import Model from './model';


const model = new Model();

const refs = () => ({
    ????: document.querySelector('.???'),
});

const renderListItems = (listRef, notes) => {
    listRef.innerHTML = '';
    listRef.insertAdjacentHTML('beforeend', createNoteListMarkup(notes));
};

(async () => {
    try {
        const ads = await model.get();
        renderListItems(refs.list, notes);
        return ads;
    } catch (error) {
        throw error;
    }
})();

const handleSearch = event => {
    renderListItems(refs.list, model.filterNotesByQuery(event.target.value));
};


refs.???????.addEventListener('click', handleSearch);
