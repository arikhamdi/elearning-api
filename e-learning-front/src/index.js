import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { API } from './config';
import axios from 'axios';

import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux';
import store, {history} from './store';


import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.baseURL = API;



ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
  <Routes />
  </ConnectedRouter>
      
  </Provider>,
  document.getElementById('root')
);

