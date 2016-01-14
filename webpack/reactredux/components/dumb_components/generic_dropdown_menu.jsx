import React, {PropTypes} from 'react';

// ##############################################
// ## Generic Dropdown Menu
// ##############################################
export const GenericDropDownMenu = React.createClass({
  PropTypes: {
    arrayOfItems: PropTypes.array.required
  },

  getDefaultProps() {
    return {
      arrayOfItems: ['Item 1', 'Item 2']
    }
  },

  buildMenuItems() {
    return this.props.arrayOfItems.map( (item, index) => { return ( <li key={index}>{ item }</li>)})
  },

  render() {
    const menuItems = this.buildMenuItems();

    return (
      <ul className="dropdown-menu">
        { menuItems }
      </ul>
    )
  }
})


// ########################################
// ## GenericMenuItemForDropDownMenu Component
// ########################################
export const GenericMenuItemForDropDownMenu = React.createClass({
  PropTypes: {
    onClick: PropTypes.func,
    text: PropTypes.string
  },

  getDefaultProps() {
    return {
      text: "Unset item"
    }
  },

  render() {
    return (
      <a
        href=    '#'
        onClick= {this.props.onClick}
        >
        {this.props.text}
      </a>
    )
  }
})

// ########################################
// ## GenericMenuItemInactiveForDropDownMenu Component
// ########################################
export const GenericMenuItemInactiveForDropDownMenu = React.createClass({
  PropTypes: {
    style: PropTypes.object,
    text:  PropTypes.string
  },

  getDefaultProps() {
    return {
      style: {
        display: "block",
        padding: "3px 20px",
        clear: "both",
        FontWeight: "normal",
        LineHeight: "1.4",
        color: "#333333",
        WhiteSpace: "nowrap"
      }
    }
  },

  render() {
    return (
      <div style= { this.props.style }>
        { this.props.text }
      </div>
    )
  }
})
