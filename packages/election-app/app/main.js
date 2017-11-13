// eslint-disable-next-line
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import { AppContainer } from 'react-hot-loader';
// eslint-disable-next-line
import Main from './app';

const render = () => {
  // NB: We have to re-require MyApp every time or else this won't work
  // We also need to wrap our app in the AppContainer class
  // eslint-disable-next-line
  const MyApp = require('./app').default;
  ReactDOM.render(
    <AppContainer>
      <Main />
    </AppContainer>,
    document.getElementById('app')
  );
};

render();
if (module.hot) {
  module.hot.accept(render);
}
