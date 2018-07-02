import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

import './static/scss/style.scss';

render(
  <App />,
  document.querySelector('#app')
);