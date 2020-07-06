import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StylesProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import Root from './views/Root/Root';
import * as serviceWorker from './serviceWorker';
import store from './store';

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <SnackbarProvider maxSnack="3">
        <Provider store={store}>
          <Root />
        </Provider>
      </SnackbarProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
