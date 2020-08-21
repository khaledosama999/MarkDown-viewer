import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, ColorModeProvider } from '@chakra-ui/core';
import { Provider } from 'react-redux';

import App from './app';
import Store from './redux';

ReactDOM.render(
  <ThemeProvider>
    <ColorModeProvider>
      <Provider store={Store}>
        <App />
      </Provider>
    </ColorModeProvider>
  </ThemeProvider>,
  document.getElementById('container'),
);
