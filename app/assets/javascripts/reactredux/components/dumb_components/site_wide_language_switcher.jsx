import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export const SiteWideLanguageSwitcher = React.createClass({
  PropTypes: {
    localesTranslations: PropTypes.shape({
      en: PropTypes.string.isRequired,
      fr: PropTypes.string.isRequired
    }).isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routing: PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired
  },

  renderLinksToLocalizedCurrentPage() {
    let links = [];
    // path is defined as the current routing path (i.e. the path that is in the url of the browser)
    let path = this.props.routing.path;
    // if a locale params has been passed to the router, the user is browsing a localized version of the app, not the default one
    // in this case, the path needs to be re-written to get rid of the current locale.
    // Otherwise, the language switcher will keep on prepending the availableLocale to the path
    if (this.props.routeParams.locale !== undefined) {
      path = path.replace(/^\/../, '');
    }

    links = _.map(
      this.props.availableLocales,
      (targetLocale) => {
        return (
          <Link to={`/${targetLocale}${path}`} className='btn btn-default'>
            { this.props.localesTranslations[targetLocale] }
          </Link>
        )
      }
    )

    return links
  },


  render() {
    return (
      <span>
        { this.renderLinksToLocalizedCurrentPage() }
      </span>
    )
  }
})
