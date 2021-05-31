import { $ } from '../util/Dom'
import { search } from '../util/API'
import { ModalTemplate } from '../util/Template'

class Modal {
  constructor ({ parent, store }) {
    this.$modal = $('.modal', parent)
    this._store = store
    this._store.on('searchList', (prev, next) => {
      // API 요청
      console.log(prev, next, 111)
    })
    this.$modalOpen = $('#search-button')
    this.$modalClose = $('.modal-close', this.$modal)
    this.$searchForm = $('form', this.$modal)
    this.$videoSection = $('.video-wrapper', this.$modal)
    this._addDomEvent()
  }

  _addDomEvent = () => {
    this.$modalOpen.addEventListener('click', this._open)
    this.$modalClose.addEventListener('click', this._close)
    this.$searchForm.addEventListener('submit', this._search)
  }

  _open = () => {
    this.$modal.classList.add('open')
  }

  _close = () => {
    this.$modal.classList.remove('open')
    const { searchList } = this._store.get()
    console.log(searchList)
  }

  _dateFormat = (dateString) => {
    const d = new Date(dateString)
    const year = d.getFullYear()
    const month = d.getMonth()
    const date = d.getDate()

    return `${year}년 ${month}월 ${date}일`
  }

  _responseParser = (items) => {
    return items.reduce((acc, {
      id: { videoId },
      snippet: { title, channelTitle, publishTime }
    }) => {
      publishTime = this._dateFormat(publishTime)
      acc.push({ videoId, title, channelTitle, publishTime })
      return acc
    }, [])
  }

  _search = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const searchTitle = formData.get('search')
    const { nextPageToken = '', items } = await search(searchTitle)
    const searchData = this._responseParser(items)
    let html = searchData.reduce((acc, videoInfo) => {
      acc += ModalTemplate.video(videoInfo)
      return acc
    }, '')
    this.$videoSection.innerHTML = (html)
    const { searchList } = this._store.get()
    this._store.set({
      searchList: [searchTitle, ...searchList].filter((v, i) => i < 3)
    })

  }

}

export default Modal

