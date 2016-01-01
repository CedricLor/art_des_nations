window._ = require('lodash');

import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'

import { Provider } from 'react-redux'
import configureStore from './reactredux/stores/configureStore'

import { initialDataReceived } from './reactredux/actions/articlesActions'

import App from './reactredux/containers/App'

import { createInitialState } from './reactredux/stores/storeCreationHelpers'

const initialState = { isFetching: {initialData: true } }
const store = configureStore(initialState);



$.ajax({
  method: "GET",
  url: "/articles",
  dataType: 'JSON'
})
  .success(function( data ) {
    // renderCallback(data);
    store.dispatch(initialDataReceived(data));
  });

$( document ).ready(function() {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('react-target')
  )
});


