import AppDispatcher from '../AppDispatcher';
import { EventEmitter } from 'events';

let _translations = [];
let _currentTranslation = '580051edea250a05791a8b07';

class TranslatedStore extends EventEmitter {
  constructor() {
    super();

    AppDispatcher.register(action => {
      let { type, payload } = action;
      switch(type) {

        case 'RECEIVE_NEW_TRANSACTION':
          _translations.push(payload.newTranslation);
          console.log('_translations:', _translations)
          break;
        case 'RECEIVE_ALL_IMAGES':
          _translations = payload.transactions;
          break;
        case 'CHANGE_CURRENT_TRANSLATION':
          _currentTranslation = payload.translation;
          break;
      }
    })
  }

  startListening(cb) {
    this.on('CHANGE', cb);
  }

  stopListening(cb) {
    this.removeListener('CHANGE', cb);
  }

  getAllTranslations() {
    return _translations;
  }

  getTranslation(id) {
    return _translations.filter(t => t._id === id)[0];
  }

  getCurrentTranslation(id) {
    return _currentTranslation;
  }

}

export default new TranslatedStore();
