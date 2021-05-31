import "./css/index.css";
import Store from "./util/Store.js";
import App from "./component/App.js";

window.addEventListener('DOMContentLoaded', () =>{
    const store = new Store({
      videoList: [],
      searchList: []
    });
    new App(document, store)
})
