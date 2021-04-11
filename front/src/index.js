import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import App from './App'
import axios from 'axios';
import Root from "./Root";

import 'bootstrap/dist/css/bootstrap.min.css';



axios.defaults.baseURL = "http://localhost:8000/api/";

ReactDOM.render(
  <Root>
    <App />
  </Root>
,
  document.getElementById('root')
);