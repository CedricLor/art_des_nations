// imported by ArticleBasicForm

import React from 'react';

export default class ContentEditable extends React.Component {
  constructor() {
    super();
    this.emitChange = this.emitChange.bind(this);
  }

  render() {
    return React.createElement(
      this.props.eltType,
      {
        ref:                     (e) => this.htmlEl = e,
        name:                    this.props.name,
        style:                   this.props.style,
        onInput:                 this.emitChange,
        onBlur:                  this.emitChange,
        contentEditable:         !this.props.disabled,
        dangerouslySetInnerHTML: { __html: this.props.html }
        }
    );
  }

  shouldComponentUpdate(nextProps) {
    return !this.htmlEl || nextProps.html !== this.htmlEl.innerHTML;
  }

  componentDidUpdate() {
    if ( this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
     this.htmlEl.innerHTML = this.props.html;
    }
  }

  emitChange(evt) {
    if (!this.htmlEl) return;
    var html = this.htmlEl.innerHTML;
    var name = this.htmlEl.getAttribute("name");
    if (this.props.onChange && html !== this.lastHtml) {
      evt.target = { value: html, name: name };
      this.props.onChange(evt);
    }
    this.lastHtml = html;
  }
}
