import React, {PropTypes} from 'react';
import {intlShape, injectIntl, defineMessages} from 'react-intl';

import { GenericStatusSwitcherToolbar } from '../../../dumb_components/generic_toolbars';

const messages = defineMessages({
  mainBtnTxt: {
    id:             'site.edit.mainStatusSwitchBtn',
    description:    'Main button of status switcher of the dropdown menu in edit mode',
    defaultMessage: 'Filter articles'
  },
  viewAllMenuItem: {
    id:             'site.edit.statusSwitcher.menuItems.viewAll',
    description:    'First menu item of the articles status switcher button in edit mode: view all the articles, whatever their status',
    defaultMessage: 'View all'
  },
  viewDraftOnlyMenuItem: {
    id:             'site.edit.statusSwitcher.menuItems.viewDraftOnly',
    description:    'Second menu item of the articles status switcher button in edit mode: view only the articles in draft status',
    defaultMessage: 'View draft only'
  },
  viewPublishedOnlyMenuItem: {
    id:             'site.edit.statusSwitcher.menuItems.viewPublishedOnly',
    description:    'Third menu item of the articles status switcher button in edit mode: view only the published articles',
    defaultMessage: 'View published only'
  },
  viewFeaturedOnlyMenuItem: {
    id:             'site.edit.statusSwitcher.menuItems.viewFeaturedOnly',
    description:    'Fourth menu item of the articles status switcher button in edit mode: view all the featured articles',
    defaultMessage: 'View featured only'
  },
  viewArchivedOnlyMenuItem: {
    id:             'site.edit.statusSwitcher.menuItems.viewArchivedOnly',
    description:    'Fifth menu item of the articles status switcher button in edit mode: view all the archived articles',
    defaultMessage: 'View archived only'
  },
});

/////////////////////////////
// Visiblity Filter Switch //
/////////////////////////////
const ArticlesStatusVisibilityFilterSwitch = React.createClass({
  propTypes: {
    articlesVisibilityFilter: PropTypes.string.isRequired,
    onFilterChange:           PropTypes.func.isRequired,
    intl:                     intlShape.isRequired
  },

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <GenericStatusSwitcherToolbar
        arrayOfStatus=  { [
          {
            'text': formatMessage(messages.viewAllMenuItem),
            'action': 'SHOW_ALL'
          },
          {
            'text': formatMessage(messages.viewDraftOnlyMenuItem),
            'action': 'SHOW_DRAFT'
          },
          {
            'text': formatMessage(messages.viewPublishedOnlyMenuItem),
            'action': 'SHOW_PUBLISHED'
          },
          {
            'text': formatMessage(messages.viewFeaturedOnlyMenuItem),
            'action': 'SHOW_FEATURED'
          },
          {
            'text': formatMessage(messages.viewArchivedOnlyMenuItem),
            'action': 'SHOW_ARCHIVED'
          }
          ] }
        activeStatus=   { this.props.articlesVisibilityFilter }
        onStatusChange= { this.props.onFilterChange }
        mainBtnText=    {formatMessage(messages.mainBtnTxt)}
      />
    )
  }
})

export default injectIntl(ArticlesStatusVisibilityFilterSwitch);
