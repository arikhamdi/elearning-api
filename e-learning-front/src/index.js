import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { API } from './config';
import axios from 'axios';

import { Provider } from 'react-redux';
import store from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL = API;

ReactDOM.render(
  <Provider store={store}>
      <Routes />
  </Provider>,
  document.getElementById('root')
);

