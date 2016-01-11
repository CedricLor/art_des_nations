import React, {PropTypes} from 'react';
import {NewsEditButtonEditableZoneSwitch} from './commons/news_edit_button_editable_zone_switch';
import ContentEditable from './news_title_zone/content_editable';
import { inlineBlockStyleForReadOnly } from '../../../component_helpers/news_forms_helpers';

import {Link} from 'react-router';

export const NewsTitleZone = React.createClass({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    sourceId:                  PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,
    siteEditMode:              PropTypes.object.isRequired,
    viewType:                  PropTypes.string.isRequired,
    cardImageSource:           PropTypes.string.isRequired,
    children:                  PropTypes.element
  },

  handleChange(e) {
    const fieldValue = e.target.value;
    // this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue)  ;
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.sourceId, this.props.value, fieldValue);
  },

  articleTitleForIndex() {
    let styleForH3 = {}
    if (this.props.cardImageSource == "") {
      styleForH3["marginTop"] = 0;
    }
    styleForH3 = inlineBlockStyleForReadOnly(styleForH3, this.props.siteEditMode.mode)

    return (
      <span>
        <Link
          key= 'title_read_only'
          to=  {`/article/${this.props.sourceId}`}>
          <h3
            style= { styleForH3 }>
              {this.props.value}
          </h3>
        </Link>
        {this.props.children}
      </span>
    )
  },

  articleTitleForSinglePage() {
    let styleForH1 = {};
    styleForH1 = inlineBlockStyleForReadOnly(styleForH1, this.props.siteEditMode.mode)
    // if (this.props.siteEditMode.mode && this.props.articlesEditStates.article) {
    if (this.props.siteEditMode.mode) {
      return (
        <ContentEditable
          eltType=  "h1"
          name=     {this.props.name}
          style=    {styleForH1}
          html=     {this.props.value}
          disabled= {false}
          onChange= {this.handleChange}
          />
      )
    } else {
      return (
        <h1
          style= {styleForH1} >
          {this.props.value}
        </h1>
      )
    }
  },

  switchTitleType() {
    switch (this.props.viewType) {
      case "indexView":
        return this.articleTitleForIndex()
      case "articleView":
        return this.articleTitleForSinglePage()
      default:
        return this.articleTitleForIndex()
    }
  },

  render() {
    return (
      this.switchTitleType()
    )
  }
})