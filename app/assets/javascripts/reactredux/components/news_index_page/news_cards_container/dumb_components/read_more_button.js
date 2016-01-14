import React, { PropTypes } from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';
import {InternationalizedLink} from '../../../dumb_components/internationalized_link';

const messages = defineMessages({
  readMoreBtn: {
    id:             'article.user.btn.readMore',
    description:    'Read more button for articles or other cards on an index page (ex. authors)',
    defaultMessage: 'Read more'
  }
})

const ReadMoreBtn = React.createClass({
  propTypes: {
    sourceId:     PropTypes.oneOfType([
                    PropTypes.number,
                    PropTypes.string
                  ]).isRequired,
    routeParams:  PropTypes.object.isRequired,
    intl:         intlShape.isRequired
  },

  getDefaultProps() {
    return { sourceId: "#"}
  },

  renderUrl() {
    if ( this.props.sourceId === "#" ) {
      return "#"
    } else {
      return `article/${this.props.sourceId}`
    }
  },

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <p className= "btn-container read-more-news-btn-container">
        <InternationalizedLink
          routeParams= {this.props.routeParams}
          to=          {this.renderUrl()}
          text=        {formatMessage(messages.readMoreBtn)}
          className=   "btn btn-lg black-square-btn news-read-more-btn"
        />
      </p>
    )
  },
})

export default injectIntl(ReadMoreBtn);
