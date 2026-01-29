import icons from 'url:../../img/icons.svg';

// exporting immediately because
//  we are not creating instances
// of the view , we just want to use
//  it as parent class of views
export default class View {
  _data;

  render(data) {
    this._data = data;

    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;

    const newMarkup = this._generateMarkup();

    // new dom living in the memory
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value),
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
           <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
                <div>
                  <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
               <div class="message">
                <div>
                  <svg>
                    <use href="${icons}#icon-smile"></use>
                  </svg>
                </div>
                <p>${message}</p>
              </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
