import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import './style.css';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://127.0.0.1:8000';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
  </>,
);
