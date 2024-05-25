import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

export default class SimpleGallery {
  #galleryRef = null;
  #items = [];
  #lightboxInstance = null;
  /**
   *
   * @param {string} wrapperId - css selector, gallery container
   * @param {GalleryItem[]} items - array of objects
   *
   * @typedef {Object} GalleryItem
   * @property {string} preview
   * @property {string} original
   * @property {string} description
   */
  constructor(wrapperId = '', items = [], options = {}) {
    if (!wrapperId) {
      throw new Error('gallery wrapper element is required');
    }

    this.#galleryRef = document.querySelector(wrapperId);
    if (!this.#galleryRef) {
      throw new Error(`Element with selector ${wrapperId} not found`);
    }

    this.#items = Array.isArray(items) ? items : [];
    this.renderItems();
    this.#lightboxInstance = new SimpleLightbox(`.gallery .gallery__link`, {
      ...options,
    });
  }

  renderItems = () => {
    const elStr = this.#items.map(item => this.templateItem(item)).join('');
    this.#galleryRef.insertAdjacentHTML('afterBegin', elStr);
  };

  templateItem = ({ preview, original, description }) => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
  };

  destroy = () => {
    this.#lightboxInstance?.destroy();
    this.#galleryRef.innerHTML = '';
    this.#items = [];
    this.#lightboxInstance = null;
  };
}
