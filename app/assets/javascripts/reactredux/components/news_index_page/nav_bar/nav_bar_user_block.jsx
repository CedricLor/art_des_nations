import React, {PropTypes} from 'react';
import { InternationalizedLink } from '../../dumb_components/internationalized_link';

/////////////////////////////
// NavBarUserBlock!!! //
/////////////////////////////
export const NavBarUserBlock = React.createClass({
  PropTypes: {
    availableLocales: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    routeParams:      PropTypes.object.isRequired
  },

  render() {
    return (
      <ul className="inline-list">
        <InternationalizedLink
          availableLocales= {this.props.availableLocales}
          routeParams=      {this.props.routeParams}
          to=               "articles"
          text=             "Link to articles"
          className=        "btn btn-default"
        />
      </ul>
    )
  }
})
