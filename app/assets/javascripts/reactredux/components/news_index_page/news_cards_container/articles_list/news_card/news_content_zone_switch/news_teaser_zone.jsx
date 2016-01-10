import React, {PropTypes} from 'react';
import {NewsEditButtonEditableZoneSwitch} from './commons/news_edit_button_editable_zone_switch';
import { inlineBlockStyleForReadOnly, rawMarkup } from '../../../component_helpers/news_forms_helpers';

export const NewsTeaserZone = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,
    siteEditMode:              PropTypes.object.isRequired,
    viewType:                  PropTypes.string.isRequired,
    children:                  PropTypes.element
  },

  // editButtonEditableZoneSwitch() {
  //   if (this.props.siteEditMode.mode) {
  //     return (
  //       <NewsEditButtonEditableZoneSwitch
  //         name=                        {this.props.name}
  //         type=                        {this.props.type}
  //         sourceId=                    {this.props.sourceId}
  //         value=                       {this.props.value}

  //         articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}

  //         currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
  //         currArtEditStateCurrField=   {this.props.currArtEditStateCurrField}

  //         handleChange=                {this.props.handleChange}
  //         handleUpdate=                {this.props.handleUpdate}
  //         handleEditField=             {this.props.handleEditField}
  //         handleExitEditField=         {this.props.handleExitEditField}
  //         handleDeleteText=            {this.props.handleDeleteText}
  //         handleRestoreText=           {this.props.handleRestoreText}/>
  //     )
  //   }
  // },

  articleTeaserForIndex() {
    let styleForTeaser = {}
    styleForTeaser = inlineBlockStyleForReadOnly(styleForTeaser, this.props.siteEditMode.mode)

    return (
      <div key= {this.props.name}>
        <div
          className=               {this.props.name}
          style=                   {styleForTeaser}
          dangerouslySetInnerHTML= {rawMarkup(this.props.value)}
          >
        </div>
        {/*this.editButtonEditableZoneSwitch()*/}
        {this.props.children}
      </div>
    )
  },

  articleTeaserForSinglePage() {
    return this.articleTeaserForIndex()
  },

  switchTeaserType() {
    switch (this.props.viewType) {
      case "indexView":
        return this.articleTeaserForIndex()
      case "articleView":
        return this.articleTeaserForSinglePage()
      default:
        return this.articleTitleForIndex()
    }
  },

  render() {
    return (
      this.switchTeaserType()
    )
  }
})
