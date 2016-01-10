import React from 'react';
import {Link} from 'react-router';

import { NewsContentZoneSwitch } from './news_card/news_content_zone_switch';
import { NewsToolbarSwitch } from './news_card/news_toolbar_switch';
import { NewsImage } from './news_card/image';
import { ReadMoreBtn } from '../dumb_components/read_more_button';

// ########################################
// ## Card Component
// ########################################

export const NewsCard = React.createClass({
  // # Card equalization
  componentDidMount() {
    const callback = () =>
      this.props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle(
        this.props.card.id,
        this.refs["main_article_div_"+parseInt(this.props.card.id)].getBoundingClientRect().top,
        this.refs[parseInt(this.props.cardNumber)].clientHeight,
        this.props.cardNumber)
    setTimeout(callback, 0)
  },

  // componentDidUpdate: (nextProps) ->
  //   # callback = ( ->
  //   #   @props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle @props.card.id,
  //   #     @refs["main_article_div_#{@props.card.id}"].getBoundingClientRect().top,
  //   #     @refs["#{@props.cardNumber}"].clientHeight,
  //   #     @props.cardNumber
  //   # ).bind(@)
  //   # setTimeout callback, 0 if nextProps.passedInStates.needs_resizing == true

  handleDelete(e) {
    e.preventDefault();
    this.props.articlesActions.handleDeleteArticle(this.props.card.id);
  },

  handleEdit(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.card.id, 'article', true);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.articlesActions.handleCancelEditArticle(this.props.card.id);
  },

  handleUpdate(fieldName) {
    this.props.articlesActions.handleUpdateArticle(this.props.card.id, fieldName)
  },

  handleChange(fieldName, fieldValue) {
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue);
  },

  newsToolbarSwitch() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsToolbarSwitch
          status=                  {this.props.card.status}
          articlesPassedInUiProps= {this.props.articlesPassedInUiProps}
          parentIdentification=    {this.props.cardNumber}
          articlesEditStates=      {this.props.articlesEditStates}

          handleUpdate=            {this.handleUpdate.bind(this, "article")}
          handleEdit=              {this.handleEdit}
          handleCancel=            {this.handleCancel}
          handleDelete=            {this.handleDelete}
          handleStatusChange=      {this.handleChange.bind(this, "status")}/>
      )
    }
  },

  createFieldZone(fieldName) {
    return (
      <NewsContentZoneSwitch
        key=                         {`${this.props.card.id}_${fieldName}`}
        viewType=                    "indexView"
        name=                        {fieldName}
        value=                       {this.props.card[fieldName]}
        sourceId=                    {this.props.card.id}

        siteEditMode=                {this.props.siteEditMode}
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
        currArtWIPStateCurrField=    {this.props.articlesWIPStatesOfFields[fieldName]}
        currArtEditStateCurrField=   {this.props.articlesEditStates[fieldName]}

        cardImageSource=             {this.props.cardImageSource}

        articlesFieldsActions=       {this.props.articlesFieldsActions}
        handleUpdate=                {this.handleUpdate.bind(this, fieldName)}
        handleChange=                {this.handleChange.bind(this, fieldName)}/>
    )
  },

  createNewsTeaserWrapper() {
    return (
      <div className= "news-teaser-wrapper">
        {this.createFieldZone("title")}
        {this.createFieldZone("teaser")}
        {this.createFieldZone("posted_at")}
      </div>
    )
  },

  imageLinkedToArticle() {
    return (
      <Link
        className= "news-anchor-link-wrapper"
        to=        {`/article/${this.props.card.id}`}>
        <NewsImage
          cardImageSource= {this.props.cardImageSource}
          newsTitle=       {this.props.newsTitle}
          />
        <div className= "news-picture-overlay">
        </div>
      </Link>
    )
  },

  render() {
    let styleForOuterWrapperDiv = { minHeight: "0px" }
    let styleForInnerWrapperDiv = { minHeight: this.props.articlesDOMProps.reqDivHeight }

    return(
      <div
        ref=       {`main_article_div_${this.props.card.id}`}
        className= {`news-listing ${this.props.articlesPassedInUiProps.colClasses}`}>
        <div
          className= "thumbnail outer-wrapper-news-div"
          style=     { styleForOuterWrapperDiv }
          >
          {this.newsToolbarSwitch()}
          <div
            className= "inner-wrapper-news-div"
            ref=       { this.props.cardNumber }
            style=     { styleForInnerWrapperDiv }>
            {this.imageLinkedToArticle()}
            {this.createNewsTeaserWrapper()}
            <ReadMoreBtn
              articlesPassedInUiProps= {this.props.articlesPassedInUiProps}
              sourceId=                {this.props.card.id}
            />
          </div>
        </div>
      </div>
    )
  }
})
