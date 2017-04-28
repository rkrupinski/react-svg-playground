import React from 'react';
import ReactDOM from 'react-dom';
import styles from 'normalize.css';
import { AppContainer } from 'react-hot-loader';

import './declarations';
import { Root, IRootProps } from './components/root';

styles.use();

const rootProps = {
  blur: 15,
  count: 12,
  frequency: 1000,
  range: 30,
  size: 400,
};

render(Root, rootProps);

if (module.hot) {
  module.hot.accept('./components/root', () => {
    render(Root, rootProps);
  });
}

function render(RootComponent: typeof Root, props: IRootProps): void {
  ReactDOM.render(
    (
      <AppContainer>
        <RootComponent {...props} />
      </AppContainer>
    ),
    document.querySelector('#app'),
  );
}
