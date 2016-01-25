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
// Import the Root element and the store to pass it to the ReactDOM render function
import Root, { store } from './Root'


// ********************************************
// add the i18n polyfills for Safari and older browsers
loadI18nPolyfills();
// addLocaleData to the ReactIntl data store
addLocaleData(en);
addLocaleData(fr);
addLocaleData(ru);
addLocaleData(zh);

// ********************************************
// Render the redux provider (with the store) and the Root component (which now manages almost everything)
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
