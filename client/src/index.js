import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from "./redux/store";

// let modal = false;

// function reducer(state = modal, action) {
//   if (action.type === "open") {
//     return true;
//   } else {
//     return state;
//   }
// }

// let store = createStore(reducer);
=======
import { Provider } from 'react-redux';
import store from './redux/store';
>>>>>>> aaa54e1746e97686b1e2fcfa9b719b63021607c9

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
<<<<<<< HEAD
      <Provider store={store}>
=======
      <Provider store={store} >
>>>>>>> aaa54e1746e97686b1e2fcfa9b719b63021607c9
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
