import React, {PropTypes} from 'react';
import { NavBarAdminBlock } from './nav_bar/nav_bar_admin_block';
import NavBarUserBlock from './nav_bar/nav_bar_user_block';

/////////////////////////////
// NavBar //
/////////////////////////////
export const NavBar = React.createClass({
  propTypes: {
    siteEditModePassedInProps:        PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    siteEditMode:                     PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    onToggleSiteEditMode:             PropTypes.func.isRequired,
    articlesVisibilityFilter:         PropTypes.string.isRequired,
    articlesVisibilityFilterActions:  PropTypes.objectOf(PropTypes.func.isRequired),
    routeParams:                      PropTypes.object.isRequired,

    localesTranslations: PropTypes.shape({
      en: PropTypes.string.isRequired,
      fr: PropTypes.string.isRequired,
      ru: PropTypes.string.isRequired,
      zh: PropTypes.string.isRequired
    }).isRequired,
    siteAvailableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routing: PropTypes.object.isRequired,
  },

  render() {
    return (
      <div className="col-xs-12">
        <NavBarAdminBlock
          siteEditModePassedInProps=       {this.props.siteEditModePassedInProps}
          siteEditMode=                    {this.props.siteEditMode}
          onToggleSiteEditMode=            {this.props.onToggleSiteEditMode}
          articlesVisibilityFilter=        {this.props.articlesVisibilityFilter}
          articlesVisibilityFilterActions= {this.props.articlesVisibilityFilterActions}
        />
        <NavBarUserBlock
          localesTranslations=             {this.props.localesTranslations}
          siteAvailableLocales=            {this.props.siteAvailableLocales}
          routing=                         {this.props.routing}
          routeParams=                     {this.props.routeParams}
        />
      </div>
    )
  }
})
