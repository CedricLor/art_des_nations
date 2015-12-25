
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Import actions
import { toggleEditMode, EditModes } from '../actions/actions'

// import (or require) components
window.NewsIndexPage = require('../components/news_index_page').NewsIndexPage



class App extends Component {
  render() {
    const { dispatch, articles, siteEditMode } = this.props

    return (
      <div>
        <NewsIndexPage
          articles={articles}
          siteEditMode={siteEditMode}
          // onToggleEditMode={onToggleEditMode}
          onToggleEditMode={ () =>
            dispatch(toggleEditMode())
          // }
          // onFilterChange={nextFilter =>
          //   dispatch(setVisibilityFilter(nextFilter))
          }  />
      </div>
    )
  }
}


function select(state) {
  console.log(state)
  return {
    siteEditMode: state.siteEditMode,
    articles: state.articles
  }
}


// Wrap the component to inject dispatch and state into it
export default connect(select)(App)
