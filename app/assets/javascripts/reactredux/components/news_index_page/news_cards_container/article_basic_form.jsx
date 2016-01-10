import React from 'react';
import {Link} from 'react-router';

import { NewsToolbarReusable } from './articles_list/news_card/news_toolbar_switch/news_toolbar_reusable';
import ContentEditable from './articles_list/news_card/news_content_zone_switch/news_title_zone/content_editable';
import { NewsImage } from './articles_list/news_card/image';
import { NewsInput } from './articles_list/news_card/news_content_zone_switch/commons/news_edit_button_editable_zone_switch//news_input';

import { inlineBlockStyleForReadOnly } from './component_helpers/news_forms_helpers';

// ########################################
// ## ArticleBasicForm Component
// ########################################

export const ArticleBasicForm = React.createClass({

  // # Card equalization
  // NO NEED FOR THAT IN THE FORM
  // componentDidMount() {
  //   const callback = () =>
  //     this.props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle(
  //       this.props.card.id,
  //       this.refs["new_article_main_div"+parseInt(this.props.card.id)].getBoundingClientRect().top,
  //       this.refs[parseInt(this.props.cardNumber)].clientHeight,
  //       this.props.cardNumber)
  //   setTimeout(callback, 0)
  // },

  // componentDidUpdate: (nextProps) ->
  //   # callback = ( ->
  //   #   @props.articlesSizingPositionningActions.assignRealDomValuesToDOMPropsOfArticle @props.card.id,
  //   #     @refs["new_article_main_div#{@props.card.id}"].getBoundingClientRect().top,
  //   #     @refs["#{@props.cardNumber}"].clientHeight,
  //   #     @props.cardNumber
  //   # ).bind(@)
  //   # setTimeout callback, 0 if nextProps.passedInStates.needs_resizing == true

  // WHAT IS REQUIRED
  // Reset all the fields in the new article
  handleReset(e) {
    e.preventDefault();
    this.props.newArticleActions.resetNewArticleFields();
  },

  // Save the article
  handleSubmit(e) {
    e.preventDefault();
    this.props.newArticleActions.handleSubmitNewArticle();
  },

  // handle changes in the fields
  handleChange(e) {
    this.props.newArticleActions.changeNewArticleFields(e.target.name, e.target.value);
  },

  valid() {
    this.props.newArticleFields.title && this.props.newArticleFields.teaser
  },

  renderNewArticleToolbar() {
    return (
      <NewsToolbarReusable
        parentIdentification=    "new_article"
        functionForFirstButton=  {this.handleReset}
        textForFirstButton=      "Reset"
        disabledForFirstButton=  {!this.valid}
        classNameForFirstBtn=    "btn-danger"
        functionForSecondButton= {this.handleSubmit}
        textForSecondButton=     "Save new article"
        classNameForSecondBtn=   "btn-default"
        disabledForSecondButton= {!this.valid}
      />
    )
  },

  renderNewArticleTitle() {
    return (
      <ContentEditable
        eltType=  "h3"
        name=     "title"
        html=     {this.props.newArticleFields.title}
        disabled= {false}
        onChange= {this.handleChange}
        />
    )
  },

  renderNewArticleTeaser() {
    return (
      <ContentEditable
        eltType=  "div"
        name=     "teaser"
        html=     {this.props.newArticleFields.teaser}
        disabled= {false}
        onChange= {this.handleChange}
        />
    )
  },

  renderNewArticlePostedAt(fieldName) {
    var moment = require('moment');
    // const timeFormatArray = _.map(
    //   ['YYYY', 'MM', 'DD', 'HH', 'mm'],
    //   (dateTimeFormat) => { moment((this.props.newArticleFields.posted_at).toString()).format(dateTimeFormat) }
    // );

    const dateValue = moment((this.props.newArticleFields.posted_at).toString()).format('YYYY-MM-DD');
    const timeValue = moment((this.props.newArticleFields.posted_at).toString()).format('HH:mm');

    return (
      <div>
        { `Posted at ${timeValue} on ${dateValue} ` }
        <div
          className="form-inline">
          <NewsInput
            type=         "date"
            onChange=     {this.handleChange}
            defaultValue= {dateValue}
            value=        {dateValue}
            name=         "newArticleDate_posted_at"/>
          <NewsInput
            type=         "time"
            onChange=     {this.handleChange}
            defaultValue= {timeValue}
            value=        {timeValue}
            name=         "newArticleTime_posted_at"/>
        </div>
      </div>
    )
  },

  renderNewsTeaserWrapper() {
    return (
      <div className= "news-teaser-wrapper">
        {this.renderNewArticleTitle()}
        {this.renderNewArticleTeaser()}
        {this.renderNewArticlePostedAt("posted_at")}
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

  renderReadMoreButton() {
    return (
      <p className= "btn-container read-more-news-btn-container">
        <Link
          to=        "#"
          className= "btn btn-lg black-square-btn news-read-more-btn"
          >
          { this.props.articlesPassedInUiProps.localizedReadMore }
        </Link>
      </p>
    )
  },


  render() {
    let styleForOuterWrapperDiv = { minHeight: "0px" }

    // Making reference to this.props.articlesDOMProps.reqDivHeight property is problematic.
    // New article does not have any entry in the this.props.articlesDOMProps object (articles are referenced by their
    // id numbers).
    // let styleForInnerWrapperDiv = { minHeight: this.props.articlesDOMProps.reqDivHeight }

    return(
      <div
        ref=       "new_article_form"
        className= "row">

        {/* changed
          ref=       {`main_article_div_${this.props.card.id}`}
          to
          ref=       "new_article_main_div"
        */}
        <div
          ref=       "new_article_main_div"
          className= {`news-listing ${this.props.articlesPassedInUiProps.colClasses}`}>

          <hr/>
          <div
            className= "thumbnail outer-wrapper-news-div"
            style=     { styleForOuterWrapperDiv }
            >
            {this.renderNewArticleToolbar()}

            <div
              className= "inner-wrapper-news-div"
              ref=       "new_article_inner_div"
              >
            {/* changed
              ref=       { this.props.cardNumber }
              to
              ref=       "new_article_inner_div" */}
            {/*
              See comment above
              style=     { styleForInnerWrapperDiv }
            */}

              {/*
                // //////////////////////
                // No linked images in new articles at this stage of the creation process of a new article.
                // {this.imageLinkedToArticle()}
              */}
              {this.renderNewsTeaserWrapper()}

              {this.renderReadMoreButton()}
            </div>
          </div>
          <hr/>

        </div>

      </div>
    )
  }
})
