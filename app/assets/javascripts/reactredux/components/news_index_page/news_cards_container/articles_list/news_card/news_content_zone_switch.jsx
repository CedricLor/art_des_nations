import React, { PropTypes } from 'react';

import { NewsTitleZone } from './news_content_zone_switch/news_title_zone';
import { NewsTeaserZone } from './news_content_zone_switch/news_teaser_zone';
import { NewsBodyZone } from './news_content_zone_switch/news_body_zone';
import { NewsPostedAtZone } from './news_content_zone_switch/news_posted_at_zone';

import { NewsEditButtonEditableZoneSwitch } from './news_content_zone_switch/commons/news_edit_button_editable_zone_switch';

export const NewsContentZoneSwitch = React.createClass ({
  PropTypes: {
    name:                      PropTypes.string.isRequired,
    value:                     PropTypes.string.isRequired,
    sourceId:                  PropTypes.string.isRequired,
    cardImageSource:           PropTypes.string.isRequired,

    siteEditMode:              PropTypes.object.isRequired,
    viewType:                  PropTypes.string.isRequired,

    articlesPassedInUiProps:   PropTypes.object.isRequired,
    currArtWIPStateCurrField:  PropTypes.string.isRequired,
    currArtEditStateCurrField: PropTypes.string.isRequired,

    handleUpdate:              PropTypes.func.isRequired
  },

  handleEditField(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.sourceId, this.props.name, true);
  },

  handleExitEditField(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.sourceId, this.props.name, false)
  },

  handleDeleteText(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.sourceId, this.props.name, '');
  },

  handleRestoreText(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.handleRestoreText(this.props.sourceId, this.props.name);
  },

  renderEditButtonEditableZoneSwitch(childRessourceType) {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsEditButtonEditableZoneSwitch
          name=                        {this.props.name}
          type=                        {childRessourceType}
          value=                       {this.props.value}
          sourceId=                    {this.props.sourceId}

          articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
          currArtWIPStateCurrField=    {this.props.currArtWIPStateCurrField}
          currArtEditStateCurrField=   {this.props.currArtEditStateCurrField}

          handleChange=                {this.props.handleChange}
          handleUpdate=                {this.props.handleUpdate}
          handleEditField=             {this.handleEditField}
          handleExitEditField=         {this.handleExitEditField}
          handleDeleteText=            {this.handleDeleteText}
          handleRestoreText=           {this.handleRestoreText}/>
      )
    }
  },

  renderChildRessource(childRessourceName, childRessourceType) {
    return (
      React.createElement(
        childRessourceName,
        {
          name:                        this.props.name,
          sourceId:                    this.props.sourceId,
          value:                       this.props.value,
          siteEditMode:                this.props.siteEditMode,
          viewType:                    this.props.viewType,
          cardImageSource:             this.props.cardImageSource,
          children:                    this.renderEditButtonEditableZoneSwitch(childRessourceType),
        }
      )
    )
  },

  switchTextZones() {
    switch (this.props.name) {
      case "title":
        return this.renderChildRessource(NewsTitleZone, "text");
      case "teaser":
        return this.renderChildRessource(NewsTeaserZone, "textarea");
      case "body":
        return this.renderChildRessource(NewsBodyZone, "ckeditor");
      case "author":
        return this.renderChildRessource(NewsAuthorZone, "text");
      case "tags":
        return this.renderChildRessource(NewsTagsZone, "text");
      case "posted_at":
        return this.renderChildRessource(NewsPostedAtZone, "date");
      default:
        return this.renderChildRessource(NewsTeaserZone, "textarea");
    }
  },

  render() {
    return this.switchTextZones();
  }
})

