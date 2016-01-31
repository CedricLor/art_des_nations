import React, {PropTypes} from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';

import { GenericStatusSwitcherToolbar } from 'dumb_components/generic_toolbars';

const messages = defineMessages({
  mainBtnTxt: {
    id:             'article.edit.mainStatusSwitchBtn',
    description:    'Main button of status switcher of the dropdown menu in edit mode for individual article',
    defaultMessage: 'Set the status of this article:'
  },
  setAsDraft: {
    id:             'article.edit.statusSwitcher.menuItems.setAsDraft',
    description:    'First menu item of the article status switcher button in edit mode: set the status of the current article as draft',
    defaultMessage: 'draft'
  },
  setAsPublished: {
    id:             'article.edit.statusSwitcher.menuItems.setAsPublished',
    description:    'Second menu item of the article status switcher button in edit mode: set the status of the current article as published',
    defaultMessage: 'published'
  },
  setAsFeatured: {
    id:             'article.edit.statusSwitcher.menuItems.setAsFeatured',
    description:    'Third menu item of the article status switcher button in edit mode: set the status of the current article as featured',
    defaultMessage: 'featured'
  },
  setAsArchived: {
    id:             'article.edit.statusSwitcher.menuItems.setAsArchived',
    description:    'Fourth menu item of the article status switcher button in edit mode: set the status of the current article as archived',
    defaultMessage: 'archived'
  },
});

/////////////////////////////////////////////
// Single article visibility filter switch //
////////////////////////////////////////////

const ArticleStatusSwitch = React.createClass({
  propTypes: {
    articleStatus:  PropTypes.string.isRequired,
    onStatusChange: PropTypes.func.isRequired,
    intl:           intlShape.isRequired
  },

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <GenericStatusSwitcherToolbar
        arrayOfStatus=  { [
          {
            'text': formatMessage(messages.setAsDraft),
            'action': 'draft'
          },
          {
            'text': formatMessage(messages.setAsPublished),
            'action': 'published'
          },
          {
            'text': formatMessage(messages.setAsFeatured),
            'action': 'featured'
          },
          {
            'text': formatMessage(messages.setAsArchived),
            'action': 'archived'
          }
          ] }
        activeStatus=   { this.props.articleStatus }
        onStatusChange= { this.props.onStatusChange }
        mainBtnText=    {formatMessage(messages.mainBtnTxt)}
      />
    )
  }
})

export default injectIntl(ArticleStatusSwitch);
