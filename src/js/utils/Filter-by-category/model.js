import * as api from './api';

export default class Advertisement {
  constructor() {
    this._ads = [];
  }

  get() {
      return api.getAdsByCategory().then(posts => {
        this._ads = ads;
        return this._ads;
      })
    }

    filterNotesByQuery(query = '') {
      return this._notes.filter(el => el.title.toLowerCase().includes(query.toLowerCase()) || el.body.toLowerCase().includes(query.toLowerCase()));
    };

};