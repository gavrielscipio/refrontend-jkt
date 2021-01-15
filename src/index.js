import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

import {createStore} from 'redux'

import {Provider} from 'react-redux'

import allreducers from './reducer'

const globalState = createStore(allreducers)

globalState.subscribe(() => console.log('Global State : ', globalState.getState()))

ReactDOM.render(
  <Provider store={globalState}>
    <App />
  </Provider>,
  document.getElementById('root')
);


