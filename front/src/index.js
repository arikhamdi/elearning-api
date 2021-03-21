import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import axios from 'axios';
import Subjects from './secure/subjects/Subjects';



axios.defaults.baseURL = "http://localhost:8000/api/";

ReactDOM.render(
  <Subjects />,
  document.getElementById('root')
);