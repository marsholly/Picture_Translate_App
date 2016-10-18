import API from '../API';
import ServerActions from './ServerActions';
import RouteActions from './RouteActions';

const ImageActions = {
  getAllImages: API.getAllImages,
  loadAllImages: API.loadAllImages,
  createImage(file, origLang, transLang, name) {
    API.createImage(file, origLang, transLang, name);
  },
  createImageFromUrl(url, origLang, transLang, name) {
    API.getImgTranslation(url, origLang, transLang, name);
  },
  deleteImage(id){
    API.deleteImage(id);
  },
  changeCurrentTranslation(id) {
    ServerActions.changeCurrentTranslation(id);
  },
  updateTranslation:API.updateTranslation
}

export default ImageActions;
