import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@components/index';
import { Provider } from 'react-redux';
// import store from '@store/index';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
