import React, {PropTypes} from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';
import { InternationalizedLink } from 'dumb_components/internationalized_link';
import { SiteWideLanguageSwitcher } from 'dumb_components/site_wide_language_switcher';

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
    localesTranslations: PropTypes.shape({
      en: PropTypes.string.isRequired,
      fr: PropTypes.string.isRequired,
      ru: PropTypes.string.isRequired,
      zh: PropTypes.string.isRequired
    }).isRequired,
    siteAvailableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routing: PropTypes.object.isRequired,

    routeParams: PropTypes.object.isRequired,
    intl:        intlShape.isRequired
  },

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <ul className="inline-list">
        <InternationalizedLink
          routeParams={this.props.routeParams}
          to=         "articles"
          children=   {formatMessage(messages.backToArticlesBtn)}
          className=  "btn btn-default"
        />
        <SiteWideLanguageSwitcher
          localesTranslations= {this.props.localesTranslations}
          availableLocales=    {this.props.siteAvailableLocales}
          routing=             {this.props.routing}
          routeParams=         {this.props.routeParams}
        />
      </ul>
    )
  }
})

export default injectIntl(NavBarUserBlock);

