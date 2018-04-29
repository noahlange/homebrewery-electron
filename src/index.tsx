import * as React from 'react';
import { render } from 'react-dom';
import App from './app';
import Preview from './preview';

document.querySelector('#mw-root')
  ? render(<Preview />, document.getElementById('mw-root'))
  : render(<App />, document.getElementById('react-root'));
