window._ = require('lodash');

import "babel-polyfill"

// ********************************************
// React basics
import React from 'react'
import ReactDOM, { render } from 'react-dom'
// ********************************************


// ********************************************
// Internationalization features
import { loadI18nPolyfills } from './i18n_init'

import { addLocaleData } from 'react-intl'
import en from 'react-intl/lib/locale-data/en'
import fr from 'react-intl/lib/locale-data/fr'
import ru from 'react-intl/lib/locale-data/ru'
import zh from 'react-intl/lib/locale-data/zh'
// ********************************************


// ********************************************
// Redux configuration
// import configureStore from './reactredux/stores/configureStore'
import { Provider } from 'react-redux'


// ********************************************
// Redux action for loading data received from Rails into the store
import { initialDataReceived } from './reactredux/actions/articlesActions'
// ********************************************


// // ********************************************
import Root, { store } from './Root'

// // ********************************************
// // Import the react components to build the router
// import App from './reactredux/containers/App'
// import { NewsIndexPage } from './reactredux/components/NewsIndexPage'
// import { NewsCardsContainer } from './reactredux/components/news_index_page/news_cards_container'
// import { IndividualNewsContainer } from './reactredux/components/news_index_page/individual_news_container'
// // ********************************************


// // ********************************************
// // Import the Router shizzle
// import { Router, Route, IndexRoute, browserHistory } from 'react-router'
// import createHistory from 'history/lib/createBrowserHistory'
// import { syncReduxAndRouter } from 'redux-simple-router'
// // ********************************************


// // ********************************************
// // Set the store's initial state and configure it
// const initialState = { isFetching: {initialData: true } }
// const store = configureStore(initialState);
// // ********************************************


// ********************************************
// Start fetching the data from Rails
$.ajax({
  method: "GET",
  url: `/${store.getState().siteCurrentLocale}/articles`,
  dataType: 'JSON'
  })
  .success(function( data ) {
    store.dispatch(initialDataReceived(data));
});
// ********************************************


// // ********************************************
// // Set the history for the router and connect the router, the history and the store
// const history = createHistory();
// history.__v2_compatible__ = true;

// syncReduxAndRouter(history, store)
// // ********************************************


// ********************************************
// add the i18n polyfills for Safari and older browsers
loadI18nPolyfills();
// addLocaleData to the ReactIntl data store
addLocaleData(en);
addLocaleData(fr);
addLocaleData(ru);
addLocaleData(zh);

// ********************************************
// Render the redux provider (with the store), the IntlProvider (with the current locale) and
// the Router and Routes
$( document ).ready(function() {

  render(
    <Provider store={ store } >
      <Root />
    </Provider>,
    document.getElementById('react-target')
  )
});

  // render(
  //   <Provider store={ store } >
  //     <IntlProvider locale={'en'}>
  //       <Router history={ history } >
  //         <Route path="/(:locale/)" component={ App } >
  //           <IndexRoute component={ NewsCardsContainer }/>
  //           <Route path="/(:locale/)articles" component={ NewsCardsContainer }/>
  //           <Route path="/(:locale/)article/:id" component={ IndividualNewsContainer }/>
  //         </Route>
  //       </Router>
  //     </IntlProvider>
  //   </Provider>,
  //   document.getElementById('react-target')
  // )
