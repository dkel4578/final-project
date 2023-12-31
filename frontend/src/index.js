// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Provider } from "react-redux"
import store from "./store/configureStore.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <BrowserRouter basename='/230724_practice'>
  <CookiesProvider>
    {/* eslint-disable-next-line no-undef */}
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    {/* <BrowserRouter> */}
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
