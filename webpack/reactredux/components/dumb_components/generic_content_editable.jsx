
import React, { PropTypes } from 'react';

export default class GenericContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return React.createElement(
      this.props.eltType,
      {
        ref:                     (e) => this.htmlEl = e,
        style:                   this.props.style,
        onInput:                 this.emitChange,
        onBlur:                  this.emitChange,
        contentEditable:         !this.props.disabled,
        dangerouslySetInnerHTML: { __html: this.props.html }
        }
    );
  }

  shouldComponentUpdate(nextProps) {
    // Order precedence: (i) if the nextProps.html is different than the this.htmlEl.innerHTML,
    // return true. (ii) If false, test whether !this.htmlEl will return true.
    // In normal conditions, both will return false.
    // The first one will return false because nextProps.html is set by redux on the basis of the emitChange message which sends
    // the content of this.htmlEl.innerHTML to the store.
    // Therefore, components will never update, unless nextProps has been set externally to something new.
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML;
  }

  componentDidUpdate() {
    // will execute only if shouldComponentUpdate has returned true.
    // In this case, then innerHTML should be updated to reflect the externally set html.
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
     this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange(html)
    }
    this.lastHtml = html;
  }
}

GenericContentEditable.propTypes = {
  eltType:      PropTypes.string.isRequired,
  style:        PropTypes.objectOf(PropTypes.string),
  html:         PropTypes.string,
  disabled:     PropTypes.bool.isRequired,
  onChange:     PropTypes.func.isRequired
};
