import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import { AksaraProvider, GlobalStyles } from '@aksara-ui/core';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);


ReactDOM.render(
  // <React.StrictMode>



  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router>
      <AksaraProvider>
        <GlobalStyles />
        <App />
      </AksaraProvider>
    </Router>
  </Provider>
  // </React.StrictMode>,
  , document.getElementById('root')
);

reportWebVitals();
