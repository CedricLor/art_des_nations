import React, {PropTypes} from 'react';
import { EditSwitchButton } from './nav_bar_admin_block/edit_switch_button';
import ArticlesStatusVisibilityFilterSwitch from './nav_bar_admin_block/articles_status_visiblity_filter_switch';

/////////////////////////////
// NavBarAdminBlock!!! //
/////////////////////////////
export const NavBarAdminBlock = React.createClass({
  propTypes: {
    siteEditModePassedInProps:        PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    siteEditMode:                     PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    onToggleSiteEditMode:             PropTypes.func.isRequired,
    articlesVisibilityFilter:         PropTypes.string.isRequired,
    articlesVisibilityFilterActions:  PropTypes.objectOf(PropTypes.func.isRequired)
  },

  renderArticlesVisibilityFilterSwitch() {
    if (this.props.siteEditMode.mode === true) {
      return (
        <ArticlesStatusVisibilityFilterSwitch
          articlesVisibilityFilter= {this.props.articlesVisibilityFilter}
          onFilterChange=           {this.props.articlesVisibilityFilterActions.setArticlesVisibilityFilter}
        />
      )
    }
  },

  render() {
    return (
      <ul className="inline-list">
        <EditSwitchButton
          siteEditModePassedInProps=       {this.props.siteEditModePassedInProps}
          siteEditMode=                    {this.props.siteEditMode}
          onToggleSiteEditMode=            {this.props.onToggleSiteEditMode}
          articlesVisibilityFilter=        {this.props.articlesVisibilityFilter}
          articlesVisibilityFilterActions= {this.props.articlesVisibilityFilterActions} />
        { this.renderArticlesVisibilityFilterSwitch() }
      </ul>
    )
  }
})
