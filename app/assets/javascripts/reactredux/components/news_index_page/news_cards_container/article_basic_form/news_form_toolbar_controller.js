import React, { PropTypes } from 'react';
import { NewsToolbarReusable } from '../articles_list/news_card/news_toolbar_switch/news_toolbar_reusable';

import {intlShape, injectIntl, defineMessages} from 'react-intl';


const messages = defineMessages({
  resetBtn: {
    id:             'newArticle.edit.newsForm.resetBtn',
    description:    'Reset button for the new article basic form (the one which does not allow the creation of a body)',
    defaultMessage: 'Reset'
  },
  saveBtn: {
    id:             'newArticle.edit.newsForm.saveBtn',
    description:    'Save button for the new article basic form (the one which does not allow the creation of a body)',
    defaultMessage: 'Save new article'
  },
});

// ########################################
// ## NewsToolbarSwitch Component
// ########################################
const NewsFormToolbarController = React.createClass({
  propTypes: {
    isToolbarActive:         PropTypes.bool.isRequired,
    functionForFirstButton:  PropTypes.func.isRequired,
    classNameForFirstBtn:    PropTypes.string.isRequired,
    functionForSecondButton: PropTypes.func.isRequired,
    classNameForSecondBtn:   PropTypes.string.isRequired,
    intl:                    intlShape.isRequired
  },

  newsBarContent() {
    const {formatMessage} = this.props.intl;

    let disabledClassForButtons = ""
    if (this.props.isToolbarActive) {
      disabledClassForButtons = "disabled"
    }

    const firstButton =
      <a
        key=       "1"
        className= {`${this.props.classNameForFirstBtn} ${disabledClassForButtons}`}
        onClick=   {this.props.functionForFirstButton}
      >
        {formatMessage(messages.resetBtn)}
      </a>
    const secondButton =
      <a
        key=       "2"
        className= {`${this.props.classNameForSecondBtn} ${disabledClassForButtons}`}
        onClick=   {this.props.functionForSecondButton}
      >
        {formatMessage(messages.saveBtn)}
      </a>
    return [ firstButton, secondButton ]
  },

  render() {

    return (
      <NewsToolbarReusable
        newsBarContent=          {this.newsBarContent()}
      />
    )
  }
})

export default injectIntl(NewsFormToolbarController);
