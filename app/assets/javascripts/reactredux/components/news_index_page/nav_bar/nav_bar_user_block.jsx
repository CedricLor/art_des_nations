import React, {PropTypes} from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';
import { InternationalizedLink } from '../../dumb_components/internationalized_link';

const messages = defineMessages({
  backToArticlesBtn: {
    id:             'site.user.toolbar.backToArticles',
    description:    'Back to articles button',
    defaultMessage: 'Back to articles'
  }
});
/////////////////////////////
// NavBarUserBlock!!! //
/////////////////////////////
const NavBarUserBlock = React.createClass({
  PropTypes: {
    routeParams: PropTypes.object.isRequired,
    intl:        intlShape.isRequired
  },

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <ul className="inline-list">
        <InternationalizedLink
          routeParams=      {this.props.routeParams}
          to=               "articles"
          text=             {formatMessage(messages.backToArticlesBtn)}
          className=        "btn btn-default"
        />
      </ul>
    )
  }
})

export default injectIntl(NavBarUserBlock);
