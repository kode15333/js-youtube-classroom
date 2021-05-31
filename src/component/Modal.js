import {$} from '../util/Dom.js'
import { search } from '../util/API'

class Modal {
  constructor ({parent, store}) {
    this.$modal = $('.modal', parent);
    this._store = store;
    this._store.on('searchList', (prev, next) => {
      // API 요청
      console.log(prev, next, 111)
    })
    this.$modalOpen = $('#search-button');
    this.$modalClose = $('.modal-close', this.$modal);
    this.$searchForm = $('form', this.$modal);
    this._addDomEvent();
  }
  _addDomEvent = () => {
    this.$modalOpen.addEventListener("click", this._open);
    this.$modalClose.addEventListener("click", this._close);
    this.$searchForm.addEventListener('submit', this._search);
  }


  _open = () => {
    this.$modal.classList.add("open");
  }

  _close = () => {
    this.$modal.classList.remove("open")
    const {searchList} = this._store.get();
    console.log(searchList)
  }


  _search = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const searchTitle = formData.get('search');
    console.log(search(searchTitle));
    const {searchList} = this._store.get();
    this._store.set({
      searchList: [searchTitle, ...searchList].filter((v,i) => i < 3)
    })


  }



}

export default Modal;

// const $searchButton = document.querySelector("#search-button");
// const $modalClose = document.querySelector(".modal-close");
// const $modal = document.querySelector(".modal");
//
// const onModalShow = () => {
//   $modal.classList.add("open");
// };
//
// const onModalClose = () => {
//   $modal.classList.remove("open");
// };
//
// $searchButton.addEventListener("click", onModalShow);
// $modalClose.addEventListener("click", onModalClose);
