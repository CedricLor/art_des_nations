import React, { PropTypes } from 'react';
import { InternationalizedLink } from 'dumb_components/internationalized_link';

import NewsToolbarSwitch from './news_card/news_toolbar_switch';
import { NewsContentZoneSwitch } from 'news_shared_components/news_content_zone_switch';
import NewsPostedAtOnZone from 'news_shared_components/news_posted_at_on_zone';
import Image from 'dumb_components/image';
import ReadMoreBtn from '../dumb_components/read_more_button';

// ########################################
// ## Card Component
// ########################################

export const NewsCard = React.createClass({
  propTypes: {
    cardNumber:                        PropTypes.number.isRequired,
    card:                              PropTypes.object.isRequired,
    cardMediaContainer:                PropTypes.object,
    // cardImageSource:                   PropTypes.string,
    // cardImageTitle:                    PropTypes.string,
    articlesPassedInUiProps:           PropTypes.object.isRequired,

    articlesActions:                   PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:             PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesSizingPositionningActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    articlesWIPStatesOfFields:         PropTypes.object.isRequired,
    articlesEditStates:                PropTypes.object.isRequired,

    articlesDOMProps:                  PropTypes.object.isRequired,

    siteEditMode:                      PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    routeParams:                       PropTypes.object.isRequired,
    siteCurrentLocale:                 PropTypes.string.isRequired,
  },

  getDefaultProps() {
    return {
      cardMediaContainer: {
        media: undefined,
        title: undefined
      }
    }
  },

  // # Card equalization
  componentDidMount() {
    const callback = () =>
      this.props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle(
        this.props.card.id,
        this.refs["main_article_div_"+parseInt(this.props.card.id)].getBoundingClientRect().top,
        this.refs[parseInt(this.props.card.id)].clientHeight,
        this.props.cardNumber,
        this.props.siteCurrentLocale)
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
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.card.id, 'article', true, this.props.siteCurrentLocale);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.articlesActions.handleCancelEditArticle(this.props.card.id, this.props.siteCurrentLocale);
  },

  handleUpdate(fieldName) {
    this.props.articlesActions.handleUpdateArticle(this.props.card.id, fieldName, this.props.siteCurrentLocale)
  },

  handleChange(fieldName, fieldValue) {
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.card.id, fieldName, fieldValue, this.props.siteCurrentLocale);
  },

  newsToolbarSwitch() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsToolbarSwitch
          status=                  {this.props.card.status}
          articlesEditStates=      {this.props.articlesEditStates}

          handleUpdate=            {this.handleUpdate.bind(this, "article")}
          handleEdit=              {this.handleEdit}
          handleCancel=            {this.handleCancel}
          handleDelete=            {this.handleDelete}
          handleStatusChange=      {this.handleChange.bind(this, "status")}
        />
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
        currArtWIPStateCurrField=    {this.props.articlesWIPStatesOfFields[fieldName]}
        currArtEditStateCurrField=   {this.props.articlesEditStates[fieldName]}

        cardImageSource=             {this.props.cardMediaContainer.media}

        articlesFieldsActions=       {this.props.articlesFieldsActions}
        handleUpdate=                {this.handleUpdate.bind(this, fieldName)}
        handleChange=                {this.handleChange.bind(this, fieldName)}

        routeParams=                 {this.props.routeParams}
        siteCurrentLocale=           {this.props.siteCurrentLocale}
      />
    )
  },

  createNewsTeaserWrapper() {
    return (
      <div className= "news-teaser-wrapper">
        {this.createFieldZone("title")}
        {this.createFieldZone("teaser")}
        <NewsPostedAtOnZone
          siteEditMode= {this.props.siteEditMode.mode}
          onChange=     {this.handleChange.bind(this, "posted_at")}
          value=        {this.props.card["posted_at"]}
        />
      </div>
    )
  },

  imageLinkedToArticle() {
    const newsImage =
      <span>
        <Image
          cardImageSource= {this.props.cardMediaContainer.media}
          newsTitle=       {this.props.cardMediaContainer.title}
          className=       {`img-for-news-card-${this.props.card.id} my-news-card-img my-card-img`}
          />
        <div className= "news-picture-overlay">
        </div>
      </span>

    return (
      <InternationalizedLink
        routeParams= {this.props.routeParams}
        to=          {`article/${this.props.card.id}`}
        children=    {newsImage}
        className=   "news-anchor-link-wrapper"
      />
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
            ref=       {this.props.card.id}
            style=     {styleForInnerWrapperDiv}>
            {this.imageLinkedToArticle()}
            {this.createNewsTeaserWrapper()}
            <ReadMoreBtn
              routeParams=             {this.props.routeParams}
              sourceId=                {this.props.card.id}
            />
          </div>
        </div>
      </div>
    )
  }
})

