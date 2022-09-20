import React from 'react';
import ReactDOM from 'react-dom/client';
import { Layout } from './comsponents/Layout/Layout';
import './BackendEmulator/fetch';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Layout/>
    </Provider>
  </React.StrictMode>
);
