import React, {PropTypes} from 'react';
import {Link} from 'react-router';

export const InternationalizedLink = React.createClass({
  PropTypes: {
    routeParams:      PropTypes.object.isRequired,
    to:               PropTypes.string.isRequired,
    text:             PropTypes.string.isRequired,
    className:        PropTypes.string.isRequired
  },

  render() {
    let path = this.props.to;
    if (this.props.routeParams.locale !== undefined) {
      path = `${this.props.routeParams.locale}/${path}`;
    }

    return (
      <Link to={`/${path}`} className={this.props.className}>
        {this.props.text}
      </Link>
    )
  }
})
