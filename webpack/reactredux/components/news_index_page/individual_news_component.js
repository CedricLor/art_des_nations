import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import NewsToolbarSwitch from './news_cards_container/articles_list/news_card/news_toolbar_switch';

import GenericContentEditable from 'dumb_components/generic_content_editable';

import {NewsSliderController} from 'news_shared_components/news_slider_controller'
import NewsPostedAtOnZone from 'news_shared_components/news_posted_at_on_zone';
import { NewsContentZoneSwitch } from 'news_shared_components/news_content_zone_switch';

import { inlineBlockStyleForReadOnly } from 'news_shared_components/news_forms_helpers';

export const IndividualNewsComponent = React.createClass({
  propTypes: {
    siteCurrentLocale:          PropTypes.string,
    siteEditMode:               PropTypes.object,

    currentArticle:             PropTypes.object.isRequired,
    articlesWIPStatesOfFields:  PropTypes.object.isRequired,
    articlesEditStates:         PropTypes.object.isRequired,
    articlesDOMProps:           PropTypes.object.isRequired,

    articlePictures:            PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    mediaContainers:            PropTypes.objectOf(PropTypes.object.isRequired).isRequired,

  // currentArticleTags
  // article.author.full_name

    articlesActions:            PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:      PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  },

  getDefaultProps() {
    mediaContainers: [
      {media: "", title: ""}
    ]
  },

  handleDelete(e) {
    e.preventDefault();
    this.props.articlesActions.handleDeleteArticle(this.props.currentArticle.id);
  },

  handleEdit(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.currentArticle.id, 'article', true, this.props.siteCurrentLocale);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.articlesActions.handleCancelEditArticle(this.props.currentArticle.id, this.props.siteCurrentLocale);
  },

  handleUpdate(fieldName) {
    this.props.articlesActions.handleUpdateArticle(this.props.currentArticle.id, fieldName, this.props.siteCurrentLocale)
  },

  handleChange(fieldName, fieldValue) {
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.currentArticle.id, fieldName, fieldValue, this.props.siteCurrentLocale);
  },


  renderImage() {
    // QUICK FIX ON IMAGES -
    // SHOULD TURN INTO A CAROUSEL WITH DEFAULT PICTURE BEING THE PICTURE PROVIDED AS FEATURE PICTURE -
    // FIX ALSO CREATION PROCESS OF NEW IMAGES: SHOULD BE STORED AS BOTH CARD PICTURE AND CAROUSEL PICTURE, WITH AN OPTION
    // TO REMOVE THEM AS CAROUSEL PICTURES
    return (
      <span>
        <NewsSliderController
          siteEditMode=     {this.props.siteEditMode}
          articlePictures=  {this.props.articlePictures}
          mediaContainers=  {this.props.mediaContainers}
          sourceId=         {this.props.currentArticle.id}
        />
      </span>
    )
  },

  renderTitle() {
    let styleForH1 = {};
    styleForH1 = inlineBlockStyleForReadOnly(styleForH1, this.props.siteEditMode.mode)
    // Two conditions for the content editable to be on: (i) the site must be in site edit mode == on
    // (ii) the article must be in edit mode (otherwise, there is no way to save the changes made by the user)
    if (this.props.siteEditMode.mode && this.props.articlesEditStates.article) {
      return (
        <GenericContentEditable
          eltType=  "h1"
          style=    {styleForH1}
          html=     {this.props.currentArticle["title"]}
          disabled= {false}
          onChange= {this.handleChange.bind(this, "title")}
          />
      )
    } else {
      return (
        <h1
          style= {styleForH1} >
          {this.props.currentArticle["title"]}
        </h1>
      )
    }
  },

  createFieldZone(fieldName) {
    return (
      <NewsContentZoneSwitch
        key=                         {`${this.props.currentArticle.id}_${fieldName}`}
        viewType=                    "articleView"
        name=                        {fieldName}
        value=                       {this.props.currentArticle[fieldName]}
        sourceId=                    {this.props.currentArticle.id}

        siteEditMode=                {this.props.siteEditMode}
        currArtWIPStateCurrField=    {this.props.articlesWIPStatesOfFields[fieldName]}
        currArtEditStateCurrField=   {this.props.articlesEditStates[fieldName]}

        articlesFieldsActions=       {this.props.articlesFieldsActions}
        handleUpdate=                {this.handleUpdate.bind(this, fieldName)}
        handleChange=                {this.handleChange.bind(this, fieldName)}

        routeParams=                 {this.props.routeParams}
        siteCurrentLocale=           {this.props.siteCurrentLocale}
        />
    )
  },

  newsToolbarSwitch() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsToolbarSwitch
          status=                  {this.props.currentArticle.status}
          articlesEditStates=      {this.props.articlesEditStates}

          handleUpdate=            {this.handleUpdate.bind(this, "article")}
          handleEdit=              {this.handleEdit}
          handleCancel=            {this.handleCancel}
          handleDelete=            {this.handleDelete}
          handleStatusChange=      {this.handleChange.bind(this, "status")}/>
      )
    }
  },

  renderCreatedAtZone() {

    return(
      <h3>
        <NewsPostedAtOnZone
          siteEditMode= {this.props.siteEditMode.mode}
          onChange=     {this.handleChange.bind(this, "posted_at")}
          value=        {this.props.currentArticle["posted_at"]}
        />
      </h3>
    )
  },

  renderTags() {
    if ( this.props.currentArticleTags ) {
          tagElementsArray = this.props.currentArticleTags.map( (tag) => {
            return (
              <Link to="#">
                <span className="label label-primary">{ tag + " " }</span>
              </Link>
            )
          })
      return (
        <p class="tags">
          <i class="glyphicon glyphicon-tags"></i>
            {tagElementsArray}
        </p>
      )
    }
  },

  renderAuthor() {
    return (
      <div className="news-author">
        <Link to="#">
          { "by" }&#8239;{ this.props.article.author.full_name }
        </Link>
      </div>
    )
  },

  render() {

    return (
      <ReactCSSTransitionGroup
        transitionName="react-news-container"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={2000}>


        <article className="news">
          <div className="row">
            <div className="col-xs-12 col-sm-offset-2 col-sm-8 col-md-offset-3 col-md-6">

              {this.newsToolbarSwitch()}

              {this.renderImage()}

              {this.renderTitle()}

              {this.renderCreatedAtZone()}

              {/*this.renderTags()*/}

              <div className="news-teaser">
                {this.createFieldZone("teaser")}
              </div>

              <hr/>

              <div className="news-body">
                {this.createFieldZone("body")}
              </div>

              {/*this.renderAuthor()*/}

            </div>
          </div>
        </article>


      </ReactCSSTransitionGroup>
    )
  }
})

