import React, { PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router';
import NewsToolbarSwitch from './news_cards_container/articles_list/news_card/news_toolbar_switch';
import { NewsContentZoneSwitch } from './news_cards_container/articles_list/news_card/news_content_zone_switch';
import GenericContentEditable from '../dumb_components/generic_content_editable';

import { inlineBlockStyleForReadOnly } from './component_helpers/news_forms_helpers';

export const IndividualNewsContainer = React.createClass({
  // propTypes: {
  //   articlesActions:            PropTypes.object,
  //   articlesFieldsActions:      PropTypes.object,

  //   siteEditMode:               PropTypes.object,
  //   currentArticle:             PropTypes.object.isRequired,
  //   // # redux passed in Edit and Wip States
  //   articlesWIPStatesOfFields:  PropTypes.object.isRequired,
  //   articlesEditStates:         PropTypes.object.isRequired,
  //   // # redux passedInDomProps
  //   articlesDOMProps:           PropTypes.object.isRequired,
  //   articlesPassedInUiProps:    PropTypes.object.isRequired
  // },

  handleDelete(e) {
    e.preventDefault();
    this.props.articlesActions.handleDeleteArticle(this.props.currentArticle.id);
  },

  handleEdit(e) {
    e.preventDefault();
    this.props.articlesFieldsActions.changeArticleEditStateOfField(this.props.currentArticle.id, 'article', true);
  },

  handleCancel(e) {
    e.preventDefault();
    this.props.articlesActions.handleCancelEditArticle(this.props.currentArticle.id);
  },

  handleUpdate(fieldName) {
    this.props.articlesActions.handleUpdateArticle(this.props.currentArticle.id, fieldName)
  },

  handleChange(fieldName, fieldValue) {
    this.props.articlesFieldsActions.changeFieldOfArticle(this.props.currentArticle.id, fieldName, fieldValue);
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
        articlesPassedInUiProps=     {this.props.articlesPassedInUiProps}
        currArtWIPStateCurrField=    {this.props.articlesWIPStatesOfFields[fieldName]}
        currArtEditStateCurrField=   {this.props.articlesEditStates[fieldName]}

        cardImageSource=             {this.props.cardImageSource}

        handleUpdate=                {this.handleUpdate.bind(this, fieldName)}
        handleChange=                {this.handleChange.bind(this, fieldName)}
        />
    )
  },

  newsToolbarSwitch() {
    if (this.props.siteEditMode.mode) {
      return (
        <NewsToolbarSwitch
          status=                  {this.props.currentArticle.status}
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

  renderTags() {
    if ( this.props.currentArticleTags ) {
          tagElementsArray = this.props.articleTags.map( (tag) => {
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
    console.log(this.props)
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

              {this.renderTitle()}

              {this.createFieldZone("posted_at")}

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

