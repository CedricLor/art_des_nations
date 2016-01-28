import React, { PropTypes } from 'react';

import { InternationalizedLink } from 'dumb_components/internationalized_link';

import NewsFormToolbarController from './article_basic_form/news_form_toolbar_controller';
import NewsFormContentEditableController from './article_basic_form/news_form_content_editable_controller';
import NewsFormDropZoneController from './article_basic_form/news_form_drop_zone_controller';

import NewsPostedAtOnZone from 'news_shared_components/news_posted_at_on_zone';
import {NewsImage} from './articles_list/news_card/image';
import ReadMoreBtn from './dumb_components/read_more_button';

import { inlineBlockStyleForReadOnly } from '../component_helpers/news_forms_helpers';

import {intlShape, injectIntl, defineMessages} from 'react-intl';

const messages = defineMessages({
  titleMeta: {
    id:             'newArticle.edit.newsForm.titleMeta',
    description:    'Translation of the word "title" of an article',
    defaultMessage: 'the title'
  },
  teaserMeta: {
    id:             'newArticle.edit.newsForm.teaserMeta',
    description:    'Translation of the word "teaser" of an article',
    defaultMessage: 'the teaser'
  },
});

// ########################################
// ## ArticleBasicForm Component
// ########################################

const ArticleBasicForm = React.createClass({
  propTypes: {
    newArticleActions:        PropTypes.object.isRequired,
    newArticleFields:         PropTypes.object.isRequired,
    articlesPassedInUiProps:  PropTypes.object.isRequired,
    routeParams:              PropTypes.object.isRequired,
    siteCurrentLocale:        PropTypes.string.isRequired,
    intl:                     intlShape.isRequired
  },

  // Reset all the fields in the new article
  handleReset(e) {
    e.preventDefault();
    this.props.newArticleActions.resetNewArticleFields();
  },

  // Save the article
  handleSubmit(e) {
    e.preventDefault();
    this.props.newArticleActions.handleSubmitNewArticle(this.props.siteCurrentLocale);
  },

  // handle changes in the fields
  handleChange(fieldName, newValue) {
    this.props.newArticleActions.changeNewArticleFields(fieldName, newValue);
  },

  renderNewArticleToolbar() {
    return (
      <NewsFormToolbarController
        isToolbarActive=         {!this.props.newArticleFields.hasReceivedUserInput}

        functionForFirstButton=  {this.handleReset}
        classNameForFirstBtn=    "btn btn-danger"

        functionForSecondButton= {this.handleSubmit}
        classNameForSecondBtn=   "btn btn-default"
      />
    )
  },

  renderNewsTeaserWrapper() {
    const {formatMessage} = this.props.intl;

    return (
      <div className= "news-teaser-wrapper">
        <NewsFormContentEditableController
          fieldName={formatMessage(messages.titleMeta)}
          eltType=  "h3"
          html=     {this.props.newArticleFields.title}
          disabled= {false}
          onChange= {this.handleChange.bind(this, "title")}
        />
        <NewsFormContentEditableController
          fieldName={formatMessage(messages.teaserMeta)}
          eltType=  "div"
          html=     {this.props.newArticleFields.teaser}
          disabled= {false}
          onChange= {this.handleChange.bind(this, "teaser")}
        />
        <NewsPostedAtOnZone
          siteEditMode= {true}
          onChange=     {this.handleChange.bind(this, "posted_at")}
          value=        {this.props.newArticleFields.posted_at}
        />
      </div>
    )
  },

  imageLinkedToArticle() {
    return (
      <span
        className=  "news-anchor-link-wrapper"
        style=      {{cursor: "pointer"}}
      >
        <NewsFormDropZoneController
          onPictureChange=            {this.handleChange.bind(this, "card_picture")}
          newArticleCardPictureField= {this.props.newArticleFields.card_picture}
        />
        <div className= "news-picture-overlay">
        </div>
      </span>
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
              {this.imageLinkedToArticle()}
              {this.renderNewsTeaserWrapper()}
              <ReadMoreBtn
                routeParams=             {this.props.routeParams}
              />
            </div>
          </div>
          <hr/>

        </div>

      </div>
    )
  }
})

export default injectIntl(ArticleBasicForm);
