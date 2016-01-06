import React from 'react';
import {Link} from 'react-router';

/////////////////////////////
// Visiblity Filter Switch //
/////////////////////////////
const ArticlesVisibilityFilterSwitch = React.createClass({

  onFilterChange(filter) {
    console.log(this.props.articlesVisibilityFilter);
    this.props.onFilterChange(filter);
  },

  renderFilter(filter, name) {
    if (filter === this.props.articlesVisibilityFilter) {
      // FIXME: Push this into a CSS
      const style = {
        display: "block",
        padding: "3px 20px",
        clear: "both",
        FontWeight: "normal",
        LineHeight: "1.4",
        color: "#333333",
        WhiteSpace: "nowrap"
      }
      return (
        <div style= { style }>
            { name }
        </div>
      )
    }

    return (
      <a href='#' onClick={this.onFilterChange.bind(this, filter)}>
        {name}
      </a>
    )
  },

  render() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default">Filter articles:</button>
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          <li>{this.renderFilter('SHOW_ALL', 'View all')}</li>
          <li>{this.renderFilter('SHOW_DRAFT', 'View draft only')}</li>
          <li>{this.renderFilter('SHOW_PUBLISHED', 'View published only')}</li>
          <li>{this.renderFilter('SHOW_FEATURED', 'View featured only')}</li>
          <li>{this.renderFilter('SHOW_ARCHIVED', 'View archived only')}</li>
        </ul>
      </div>
    )
  }
})

/////////////////////////////
// AdminSwitchButton(s)!!! //
/////////////////////////////
export const AdminSwitchButton = React.createClass({

  handleToggleSiteEditMode(e) {
    e.preventDefault();
    this.props.onToggleSiteEditMode();
  },

  renderArticlesVisibilityFilterSwitch() {
    if (this.props.siteEditMode.mode === true) {
      return (
        <ArticlesVisibilityFilterSwitch
          siteEditMode=             {this.props.siteEditMode}
          articlesVisibilityFilter= {this.props.articlesVisibilityFilter}
          onFilterChange=           {this.props.articlesVisibilityFilterActions.setArticlesVisibilityFilter}
        />
      )
    }
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
        { this.renderArticlesVisibilityFilterSwitch() }
      </span>
    );
  }
})

