// Imported by ArticleBasicForm
// Imported by NewsToolbar

import React, { PropTypes } from 'react';

// ########################################
// ## NewsToolbarReusable Component
// ########################################
export const NewsToolbarReusable = React.createClass({
  // propTypes: {
  //   articleVisibilityFilter: PropTypes.string,
  //   onFilterChange:          PropTypes.func
  // },

  render() {
    return (
      <div
        className= "news-toolbar"
        name=      {`buttons_${this.props.parentIdentification}_for_article`}>
        { this.props.newsBarContent }
      </div>
    )
  }
})
