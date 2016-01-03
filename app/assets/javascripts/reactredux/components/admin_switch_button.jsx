import {Link} from 'react-router';

export const AdminSwitchButton = React.createClass({

  handleToggleSiteEditMode(e) {
    e.preventDefault();
    this.props.onToggleSiteEditMode();
  },

  render() {
    return (
      <span>
        <a className='btn btn-danger' onClick={this.handleToggleSiteEditMode}>
          {this.props.siteEditModePassedInProps.site_edit_mode_button_props.button_text[this.props.siteEditMode.mode]}
        </a>
        <Link to="/articles" className='btn btn-default'>
          {"Link to articles"}
        </Link>
        <Link to="/article/87" className='btn btn-danger'>
          {"Link to article 87"}
        </Link>
      </span>
    );
  }
})

