// Inspired by https://github.com/emmenko/redux-react-router-async-example/blob/master/lib/Root.js

import React, { PropTypes } from 'react'


// ********************************************
// Import the Router shizzle
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import createHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
// ********************************************


// ********************************************
// Import the connect function from react-redux
import { connect } from 'react-redux'
// ********************************************


// ********************************************
// Internationalization features
import { IntlProvider } from 'react-intl'
// ********************************************


// ********************************************
// Import the react components to build the router
import configureStore from './reactredux/stores/configureStore'
// ********************************************


// ********************************************
// Import the react components to build the router
// import * as components from './components'
import App from './reactredux/containers/App'
import { NewsIndexPage } from './reactredux/components/NewsIndexPage'
import { NewsCardsContainer } from './reactredux/components/news_index_page/news_cards_container'
import { IndividualNewsContainer } from './reactredux/components/news_index_page/individual_news_container'
// ********************************************


// ********************************************
// Import the translated files
import * as i18n from './reactredux/i18n'
// ********************************************

// const {
//   About,
//   Account,
//   AccountHome,
//   Application,
//   GithubStargazers,
//   GithubRepo,
//   GithubUser,
//   Home,
//   Login,
//   SuperSecretArea
// } = components

// const initialState = {
//   application: {
//     token: storage.get('token'),
//     locale: storage.get('locale') || 'en',
//     user: { permissions: [/*'manage_account'*/] }
//   }
// }

// export const store = configureStore(initialState)

// ********************************************
// Set the store's initial state and configure it
const initialState = { isFetching: {initialData: true } }
export const store = configureStore(initialState);
// ********************************************


// ********************************************
// Set the history for the router and connect the router, the history and the store
const history = createHistory();
history.__v2_compatible__ = true;

syncReduxAndRouter(history, store)
// ********************************************


function getRootChildren (props) {
  const intlData = {
    locale:   props.siteCurrentLocale,
    messages: i18n[props.siteCurrentLocale]
  }
  const rootChildren = [
    <IntlProvider key="intl" {...intlData}>
      {renderRoutes()}
    </IntlProvider>
  ]
  return rootChildren
}


const routeConfig = [
  <Route path="/(:locale/)" component={ App }>
    <IndexRoute component={ NewsCardsContainer }/>
    <Route path="/(:locale/)articles" component={ NewsCardsContainer }/>
    <Route path="/(:locale/)article/:id" component={ IndividualNewsContainer }/>
  </Route>
]

function renderRoutes () {
  return ( <Router history={ history } routes={routeConfig}/> )
}



const Root = React.createClass({
  PropTypes: {
    siteCurrentLocale: PropTypes.string.isRequired
  },

  render () {
    return (
      <div>{getRootChildren(this.props)}</div>
    )
  }
})

export default connect(({ siteCurrentLocale }) => ({ siteCurrentLocale }))(Root)
