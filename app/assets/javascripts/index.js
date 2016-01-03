window._ = require('lodash');

import "babel-polyfill"

import React from 'react'
import { render } from 'react-dom'

import configureStore from './reactredux/stores/configureStore'
import { Provider } from 'react-redux'

import { initialDataReceived } from './reactredux/actions/articlesActions'

import App from './reactredux/containers/App'
import { NewsIndexPage } from './reactredux/components/NewsIndexPage'
import { NewsCardsContainer } from './reactredux/components/news_cards_container'
import { IndividualNewsContainer } from './reactredux/components/individual_news_container'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'

const initialState = { isFetching: {initialData: true } }
const store = configureStore(initialState);
const history = createHistory();
history.__v2_compatible__ = true;

syncReduxAndRouter(history, store)


$.ajax({
  method: "GET",
  url: "/articles",
  dataType: 'JSON'
  })
  .success(function( data ) {
    store.dispatch(initialDataReceived(data));
});


$( document ).ready(function() {
  render(
    <Provider store={store}>
      <Router history={ history }>
        <Route path="/" component={App}>
        <IndexRoute component={ NewsCardsContainer }/>
        <Route path="/articles" component={ NewsCardsContainer }/>
        <Route path="/article/:id" component={IndividualNewsContainer}/>
        </Route>
      </Router>
    </Provider>,
    document.getElementById('react-target')
  )
});
