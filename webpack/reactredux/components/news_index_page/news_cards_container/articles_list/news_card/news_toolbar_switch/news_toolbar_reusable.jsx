// Imported by ArticleBasicForm
// Imported by NewsToolbar

import React, { PropTypes } from 'react';

// ########################################
// ## NewsToolbarReusable Component
// ########################################
export const NewsToolbarReusable = React.createClass({
  propTypes: {
    newsBarContent:       PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  },

  render() {
    return (
      <div
        className= "news-toolbar"
      >
        { this.props.newsBarContent }
      </div>
    )
  }
})
