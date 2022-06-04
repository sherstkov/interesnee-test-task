import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/index';
import { Provider } from 'react-redux';
import store from './store/index';
import { MantineProvider } from '@mantine/core';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MantineProvider
    theme={{ colorScheme: 'dark' }}
    withGlobalStyles
    withNormalizeCSS
  >
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </MantineProvider>
);
