import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import DistrictFinder from './components/DistrictFinder.jsx'
import configureStore from './store/configureStore.jsx'

const SPRINGFIELD_POSITION = {
  lat: 39.7817,
  lng: -89.6501
};

const store = configureStore();

render(
  <Provider store={store}>
    <DistrictFinder />
  </Provider>,
  document.getElementById('app')
)