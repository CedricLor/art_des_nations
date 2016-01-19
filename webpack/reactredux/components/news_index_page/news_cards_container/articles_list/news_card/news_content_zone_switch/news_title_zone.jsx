import React, {PropTypes} from 'react';
import {NewsEditButtonEditableZoneSwitch} from './commons/news_edit_button_editable_zone_switch';
// import GenericContentEditable from 'dumb_components/generic_content_editable';
import { inlineBlockStyleForReadOnly } from '../../../../component_helpers/news_forms_helpers';

import {InternationalizedLink} from 'dumb_components/internationalized_link';

export const NewsTitleZone = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    sourceId:                  PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,
    siteEditMode:              PropTypes.object.isRequired,
    viewType:                  PropTypes.string.isRequired,
    cardImageSource:           PropTypes.string.isRequired,
    routeParams:               PropTypes.object.isRequired,
    children:                  PropTypes.element
  },

  // handleChange(e) {
  //   const fieldValue = e.target.value;
  //   // this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue)  ;
  //   this.props.articlesFieldsActions.changeFieldOfArticle(this.props.sourceId, this.props.value, fieldValue, this.props.siteCurrentLocale);
  // },

  renderWrappedTitle() {
    let styleForH3 = {}
    if (this.props.cardImageSource == "") {
      styleForH3["marginTop"] = 0;
    }
    styleForH3 = inlineBlockStyleForReadOnly(styleForH3, this.props.siteEditMode.mode)

    return(
      <h3
        style= { styleForH3 }>
          {this.props.value}
      </h3>
    )
  },

  articleTitleForIndex() {

    return (
      <span>
        <InternationalizedLink
          key=         'title_read_only'
          routeParams= {this.props.routeParams}
          to=          {`article/${this.props.sourceId}`}
          children=    {this.renderWrappedTitle()}
        />
        {this.props.children}
      </span>
    )
  },

  // articleTitleForSinglePage() {
  //   let styleForH1 = {};
  //   styleForH1 = inlineBlockStyleForReadOnly(styleForH1, this.props.siteEditMode.mode)
  //   // if (this.props.siteEditMode.mode && this.props.articlesEditStates.article) {
  //   if (this.props.siteEditMode.mode) {
  //     return (
  //       <ContentEditable
  //         eltType=  "h1"
  //         name=     {this.props.name}
  //         style=    {styleForH1}
  //         html=     {this.props.value}
  //         disabled= {false}
  //         onChange= {this.handleChange}
  //         />
  //     )
  //   } else {
  //     return (
  //       <h1
  //         style= {styleForH1} >
  //         {this.props.value}
  //       </h1>
  //     )
  //   }
  // },

  switchTitleType() {
    switch (this.props.viewType) {
      case "indexView":
        return this.articleTitleForIndex()
      // case "articleView":
      //   return this.articleTitleForSinglePage()
      default:
        return this.articleTitleForIndex()
    }
  },

  render() {

    return (
      <div>
        {this.switchTitleType()}
      </div>
    )
  }
})
