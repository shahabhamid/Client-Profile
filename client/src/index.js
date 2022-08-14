import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'jquery'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import 'dropify/dist/css/dropify.min.css'
import 'dropify/dist/js/dropify.min.js'

import "datatables.net-dt/css/jquery.dataTables.min.css"

import './css/basic.css'
import './css/dashboard.css'
import './css/App.css'
import './css/mainStyle.css'

import './css/font-awesome.min.css'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
