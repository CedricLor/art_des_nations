import React, {PropTypes} from 'react';

// #############################
// ## Generic Toolbar Button
// #############################
export const GenericGlyphiconButton = React.createClass({
  PropTypes: {
    additionalClassNames: PropTypes.string,
    style:                PropTypes.object,
    onClick:              PropTypes.func.isRequired,
    glyphiconName:        PropTypes.string.isRequired
  },

  getDefaultProps() {
    return {
      additionalClassNames: '',
      style: {}
    }
  },

  renderGlyphicon() {
    return (
      <span
        className=  { `glyphicon ${this.props.glyphiconName}` }
        ariaHidden= 'true'
        style=      { this.props.style }>
      </span>
    )
  },

  render() {
    return (

      <GenericToolbarButton
        additionalClassNames= { this.props.additionalClassNames }
        style=                { this.props.style }
        onClick=              { this.props.onClick }
        children=             { this.renderGlyphicon() }/>
    )
  }
})

// #############################
// ## Generic Toolbar Button
// #############################
export const GenericToolbarButton = React.createClass({
  PropTypes: {
    additionalClassNames: PropTypes.string,
    style:                PropTypes.object,
    onClick:              PropTypes.func,
    children:             PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
  },

  getDefaultProps() {
    return {
      children: ' ',
      additionalClassNames: 'btn-default ',
      style: {}
    }
  },

  render() {
    return (
      <button
        type=      'button'
        className= { `btn ${this.props.additionalClassNames}` }
        onClick=   { this.props.onClick }
        style=     { this.props.style }
        >
        { this.props.children }
      </button>
    )
  }
})

// ##############################################
// ## Generic Carret Button For Dropdown Menu
// ##############################################
export const GenericToolbarCaretDropdownButton = React.createClass({
  PropTypes: {
    additionalClassNames: PropTypes.string
  },

  getDefaultProps() {
    return {
      additionalClassNames: 'btn-default '
    }
  },

  render() {
    return (
      <button
        type=          'button'
        className=     {`btn dropdown-toggle ${this.props.additionalClassNames}`}
        data-toggle=   'dropdown'
        aria-haspopup= 'true'
        aria-expanded= 'false'>
        <span className= 'caret'></span>
        <span className= 'sr-only'>Toggle Dropdown</span>
      </button>
    )
  }
})
