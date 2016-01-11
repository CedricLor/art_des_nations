import React, {PropTypes} from 'react';
import { NavBarAdminBlock } from './nav_bar/nav_bar_admin_block';
import { NavBarUserBlock } from './nav_bar/nav_bar_user_block';

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
    availableLocales:                 PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routeParams:                      PropTypes.object.isRequired
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
          availableLocales=                {this.props.availableLocales}
          routeParams=                     {this.props.routeParams}
        />
      </div>
    )
  }
})
