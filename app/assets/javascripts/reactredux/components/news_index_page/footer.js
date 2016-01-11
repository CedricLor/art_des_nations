import React, { PropTypes } from 'react';
import { SiteWideLanguageSwitcher } from '../dumb_components/site_wide_language_switcher';

export const Footer = React.createClass({
  PropTypes: {
    localesTranslations: PropTypes.shape({
      en: PropTypes.string.isRequired,
      fr: PropTypes.string.isRequired
    }).isRequired,
    availableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routing: PropTypes.object.isRequired,
    routeParams: PropTypes.object.isRequired
  },

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <SiteWideLanguageSwitcher
              localesTranslations= {this.props.localesTranslations}
              availableLocales=    {this.props.availableLocales}
              routing=             {this.props.routing}
              routeParams=         {this.props.routeParams}
            />
          </div>
        </div>
      </div>
    )
  }
})

