import React, {PropTypes} from 'react';
import {Link} from 'react-router';

/////////////////////////////
// NavBarUserBlock!!! //
/////////////////////////////
export const NavBarUserBlock = React.createClass({

  render() {
    return (
      <ul className="inline-list">
        <Link to="/articles" className='btn btn-default'>
          {"Link to articles"}
        </Link>
      </ul>
    )
  }
})
