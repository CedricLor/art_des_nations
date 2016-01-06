import React from 'react';
import {Link} from 'react-router';

import { NewsContentZoneSwitch } from './lower_news_components/news_content_components/news_content_zone_switch';
import { NewsToolbar } from './lower_news_components/news_edit_tools/news_toolbar';
import { NewsImage } from './lower_news_components/news_content_components/image';


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

  handleUpdate(e) {
    e.preventDefault();
    const fieldName = e.target.parentNode.getAttribute("name").match(/(_for_)(\S+)/)[2];
    this.props.articlesActions.handleUpdateArticle(this.props.card.id, fieldName)
  },

  newsToolbar() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsToolbar
          articlesPassedInUiProps= {this.props.articlesPassedInUiProps}
          parentIdentification=    {this.props.cardNumber}
          articlesEditStates=      {this.props.articlesEditStates}

          handleUpdate=            {this.handleUpdate}
          handleEdit=              {this.handleEdit}
          handleCancel=            {this.handleCancel}
          handleDelete=            {this.handleDelete}/>
      )
    }
  },

  createFieldZone(fieldName) {
    return (
      <NewsContentZoneSwitch
        key=                         {`${this.props.card.id}_${fieldName}`}
        viewType=                    "indexView"
        name=                        {fieldName}
        card=                        {this.props.card}
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}

        siteEditMode=                {this.props.siteEditMode}
        articlesEditStates=          {this.props.articlesEditStates}
        articlesWIPStatesOfFields=   {this.props.articlesWIPStatesOfFields}

        cardImageSource=             {this.props.cardImageSource}

        articlesFieldsActions=       {this.props.articlesFieldsActions}

        handleUpdate=                {this.handleUpdate}/>
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

  createReadMoreButton() {
    return (
      <p className= "btn-container read-more-news-btn-container">
        <Link
          to=        {`/article/${this.props.card.id}`}
          className= "btn btn-lg black-square-btn news-read-more-btn"
          >
          { this.props.articlesPassedInUiProps.localizedReadMore }
        </Link>
      </p>
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
          {this.newsToolbar()}
          <div
            className= "inner-wrapper-news-div"
            ref=       { this.props.cardNumber }
            style=     { styleForInnerWrapperDiv }>
            {this.imageLinkedToArticle()}
            {this.createNewsTeaserWrapper()}
            {this.createReadMoreButton()}
          </div>
        </div>
      </div>
    )
  }
})
