import React, { PropTypes } from 'react';
import {Link} from 'react-router';
const IntlMixin       = ReactIntl.IntlMixin;

export const ReadMoreBtn = React.createClass({
  mixins: [IntlMixin],

  propTypes: {
    articlesPassedInUiProps: PropTypes.object.isRequired,
    sourceId:                PropTypes.number.isRequired
  },

  render() {
    return (
      <p className= "btn-container read-more-news-btn-container">
        <Link
          to=        {`/article/${this.props.sourceId}`}
          className= "btn btn-lg black-square-btn news-read-more-btn"
          >
          { this.props.articlesPassedInUiProps.localizedReadMore }
        </Link>
      </p>
    )
  },
})
