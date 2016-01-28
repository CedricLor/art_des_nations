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
import NewsCardsContainer from './reactredux/containers/NewsCardsContainer'
import IndividualNewsContainer from './reactredux/containers/IndividualNewsContainer'
// ********************************************


// ********************************************
// Import the translated files
import * as i18n from './reactredux/i18n'
// ********************************************

import { fetchInitialArticles, fetchAdditionalLocaleArticles } from './reactredux/actions/articlesActions'

// ********************************************
// Set the store's initial state and configure it
const initialState = { isFetching: {initialData: true } }
export const store = configureStore(initialState);
// Start fetching the data from Rails and load it to the store
store.dispatch(fetchInitialArticles(store.getState().siteCurrentLocale));
// ********************************************

// ********************************************
// Set the history for the router and connect the the history to the store
const history = createHistory();
history.__v2_compatible__ = true;

syncReduxAndRouter(history, store);
// ********************************************

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

// ++++++++++++++++++++++++++++++++++++++++++++

const Root = React.createClass({
  PropTypes: {
    siteCurrentLocale: PropTypes.string.isRequired,
    isFetching:        PropTypes.object.isRequired
  },

  getInitialState() {
    return {
      timeOut: false
    }
  },

  componentWillReceiveProps(nextProps) {
    // If the current locale has changed and the next locale is not in the articles tree, then timeout and dispatch fetch actions
    if ( (this.props.siteCurrentLocale !== nextProps.siteCurrentLocale) &&  !(nextProps.siteCurrentLocale in nextProps.articles) ) {
      this.setState({ timeOut: true })
      store.dispatch(fetchAdditionalLocaleArticles(nextProps.siteCurrentLocale))
    } else {
      this.setState({ timeOut: false })
    }
  },

  render () {

    if (this.props.isFetching.initialData === true ) {
      return <div>Currently fetching initial data</div>
    }
    if (this.props.isFetching.additionalLocaleArticle === true) {
      return <div>Currently fetching articles in your local language</div>
    }
    if (this.state.timeOut === true ) {
      return <div>Please wait</div>
    }

    return <div>{getRootChildren(this.props)}</div>
  }
})

export default connect(({ siteCurrentLocale, isFetching, articles }) => ({ siteCurrentLocale, isFetching, articles }))(Root)

