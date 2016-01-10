import React, { PropTypes } from 'react';
import { NewsToolbarReusable } from './news_toolbar_switch/news_toolbar_reusable';
import { ArticleStatusSwitch } from './news_toolbar_switch/article_status_switch';

// ########################################
// ## NewsToolbarSwitch Component
// ########################################
export const NewsToolbarSwitch = React.createClass({

  propTypes: {
    status:                  PropTypes.string,
    articlesEditStates:      PropTypes.object,
    articlesPassedInUiProps: PropTypes.object,
    handleDelete:            PropTypes.func,
    handleEdit:              PropTypes.func,
    handleCancel:            PropTypes.func,
    handleUpdate:            PropTypes.func,
    handleStatusChange:      PropTypes.func
  },

  toolbarOnReadOnly() {
    const firstButton =
      <a
        key=        "1"
        className= {`btn btn-danger`}
        onClick=   {this.props.handleDelete}>
        {this.props.articlesPassedInUiProps.destroy.text}
      </a>
    const secondButton =
      <a
        key=       "2"
        className= {`btn btn-default`}
        onClick=   {this.props.handleEdit}>
        {this.props.articlesPassedInUiProps.editArticle.text}
      </a>

    return [ firstButton, secondButton ]
  },

  toolbarOnEdit() {
    const firstButton =
      <a
        key=       "1"
        className= {`btn btn-default`}
        onClick=   {this.props.handleCancel}>
        {this.props.articlesPassedInUiProps.cancelEditArticle.text}
      </a>
    const secondButton =
      <a
        key=       "2"
        name=      {`save_button_${this.props.parentIdentification}_for_article`}
        className= {`btn btn-danger`}
        onClick=   {this.props.handleUpdate}>
        {this.props.articlesPassedInUiProps.update.text}
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
        parentIdentification=    {this.props.parentIdentification}
        newsBarContent=          {this.toolbarSwitch()}
      />
    )
  }
})
