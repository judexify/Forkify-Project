import View from './View';
import PreviewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it ;)';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmarks => PreviewView.render(bookmarks, false))
      .join('');
  }
}

export default new BookmarksView();

// SubClass.prototype.__proto__ === Parent.proto
// why export this?
// You only ever need one results view
