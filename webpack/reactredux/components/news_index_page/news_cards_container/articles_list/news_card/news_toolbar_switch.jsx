import React, { PropTypes } from 'react';
import { NewsToolbarReusable } from './news_toolbar_switch/news_toolbar_reusable';
import ArticleStatusSwitch from './news_toolbar_switch/article_status_switch';

import {intlShape, injectIntl, defineMessages} from 'react-intl';


const messages = defineMessages({
  saveBtn: {
    id:             'article.edit.saveBtn',
    description:    'Save button for each article on the articles index page',
    defaultMessage: 'Save'
  },
  cancelBtn: {
    id:             'article.edit.cancelBtn',
    description:    'Cancel button for each article on the articles index page; allows the editor to cancel its edits and exit the edit mode for the given article',
    defaultMessage: 'Reset'
  },
  deleteBtn: {
    id:             'article.edit.deleteBtn',
    description:    'Delete button for each article on the articles index page; allows the editor to permanently delete a given article',
    defaultMessage: 'Save'
  },
  editBtn: {
    id:             'article.edit.editBtn',
    description:    'Edit button for each article on the articles index page; allows the editor to enter edit mode for a given article',
    defaultMessage: 'Reset'
  },
});

// ########################################
// ## NewsToolbarSwitch Component
// ########################################
const NewsToolbarSwitch = React.createClass({

  propTypes: {
    status:                  PropTypes.string,
    articlesEditStates:      PropTypes.object,
    handleDelete:            PropTypes.func,
    handleEdit:              PropTypes.func,
    handleCancel:            PropTypes.func,
    handleUpdate:            PropTypes.func,
    handleStatusChange:      PropTypes.func,
    intl:                    intlShape.isRequired
  },

  toolbarOnReadOnly() {
    const {formatMessage} = this.props.intl;

    const firstButton =
      <a
        key=        "1"
        className= {`btn btn-danger`}
        onClick=   {this.props.handleDelete}>
        {formatMessage(messages.deleteBtn)}
      </a>
    const secondButton =
      <a
        key=       "2"
        className= {`btn btn-default`}
        onClick=   {this.props.handleEdit}>
        {formatMessage(messages.editBtn)}
      </a>

    return [ firstButton, secondButton ]
  },

  toolbarOnEdit() {
    const {formatMessage} = this.props.intl;

    const firstButton =
      <a
        key=       "1"
        className= {`btn btn-default`}
        onClick=   {this.props.handleCancel}>
        {formatMessage(messages.cancelBtn)}
      </a>
    const secondButton =
      <a
        key=       "2"
        className= {`btn btn-danger`}
        onClick=   {this.props.handleUpdate}>
        {formatMessage(messages.saveBtn)}
      </a>
    const thirdButton = <ArticleStatusSwitch
      key=            "3"
      articleStatus=  {this.props.status}
      onStatusChange= {this.props.handleStatusChange}
    />
    return [ firstButton, secondButton, thirdButton ]
  },

  toolbarSwitch() {
    if (this.props.articlesEditStates.article) {
      return this.toolbarOnEdit()
    }
    else {
      return this.toolbarOnReadOnly()
    }
  },

  render() {
    return (
      <NewsToolbarReusable
        newsBarContent=          {this.toolbarSwitch()}
      />
    )
  }
})

export default injectIntl(NewsToolbarSwitch);
