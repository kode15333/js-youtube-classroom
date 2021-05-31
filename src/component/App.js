import Modal from './Modal'

class App {
    constructor(parent, store) {
      this._store = store;
      new Modal({parent, store})
    }

}

export default App;
