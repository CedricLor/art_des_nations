import React, { PropTypes } from 'react';
import {Link} from 'react-router';
// const IntlMixin = ReactIntl.IntlMixin;


export const ReadMoreBtnForNewArticleForm = React.createClass({
  // mixins: [IntlMixin],

  propTypes: {
    articlesPassedInUiProps: PropTypes.object.isRequired
  },

  render() {

    return (
      <ReadMoreBtn
        text= {this.props.articlesPassedInUiProps.localizedReadMore}
        url=  "#"
      />
    )
  },
})

export const ReadMoreBtnForExistingNewsCard = React.createClass({
  // mixins: [IntlMixin],

  propTypes: {
    articlesPassedInUiProps: PropTypes.object.isRequired,
    sourceId:                PropTypes.number.isRequired
  },

  render() {

    return (
      <ReadMoreBtn
        text= {this.props.articlesPassedInUiProps.localizedReadMore}
        url=  {`/article/${this.props.sourceId}`}
      />
    )
  },
})

const ReadMoreBtn = React.createClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    url:  PropTypes.string.isRequired
  },

  render() {
    return (
      <p className= "btn-container read-more-news-btn-container">
        <Link
          to=        {this.props.url}
          className= "btn btn-lg black-square-btn news-read-more-btn"
          >
          { this.props.text }
        </Link>
      </p>
    )
  },
})
