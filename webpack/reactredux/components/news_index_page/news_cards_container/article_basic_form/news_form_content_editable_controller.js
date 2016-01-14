import React, { PropTypes } from 'react';
import { NewsToolbarReusable } from '../articles_list/news_card/news_toolbar_switch/news_toolbar_reusable';

import {intlShape, injectIntl, defineMessages} from 'react-intl';

import GenericContentEditable from '../../../dumb_components/generic_content_editable';

const messages = defineMessages({
  defaultHtml: {
    id:             'newArticle.edit.newsForm.defaultHtmlForTitle',
    description:    'Default text provided to the user in the title editable zone on the form for the creation of a new article',
    defaultMessage: 'Enter {fieldName} of your article here'
  }
});

const NewsFormContentEditableController = React.createClass({
  propTypes: {
    fieldName:    PropTypes.string.isRequired,
    eltType:      PropTypes.string.isRequired,
    html:         PropTypes.string.isRequired,
    disabled:     PropTypes.bool.isRequired,
    onChange:     PropTypes.func.isRequired,
    intl:         intlShape.isRequired
  },

  render() {
    const {formatMessage} = this.props.intl;

    const html =
      this.props.html === '' ?
      formatMessage(messages.defaultHtml, {fieldName: this.props.fieldName} ) :
      this.props.html;

    return (
      <GenericContentEditable
        eltType=  {this.props.eltType}
        html=     {html}
        disabled= {this.props.disabled}
        onChange= {this.props.onChange}
      />
    )
  }
})

export default injectIntl(NewsFormContentEditableController);
