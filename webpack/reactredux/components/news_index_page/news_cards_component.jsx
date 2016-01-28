import React, { PropTypes } from 'react';
import { ArticlesList } from './news_cards_container/articles_list';
import ArticleBasicForm from './news_cards_container/article_basic_form';

export const NewsCardsComponent = React.createClass({
  propTypes: {
    siteCurrentLocale:          PropTypes.string,
    siteEditMode:               PropTypes.object,

    articles:                   PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    articlesWIPStatesOfFields:  PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesEditStates:         PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesNeedResizingStates: PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    articlesDOMProps:           PropTypes.objectOf(PropTypes.object.isRequired).isRequired,

    articlesPassedInUiProps:    PropTypes.object.isRequired,

    articlePictures:            PropTypes.object.isRequired,
    mediaContainers:            PropTypes.object.isRequired,

    newArticleFields:           PropTypes.object.isRequired,

  // currentArticleTags
  // article.author.full_name

    articlesActions:                   PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:             PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesSizingPositionningActions: PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    newArticleActions:                 PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
  },

  renderNewArticleBasicForm() {
    if ( this.props.siteEditMode.mode === true) {
      return (
        <ArticleBasicForm
          siteEditMode=            {this.props.siteEditMode}
          newArticleActions=       {this.props.newArticleActions}
          newArticleFields=        {this.props.newArticleFields}
          articlesPassedInUiProps= {this.props.articlesPassedInUiProps}

          siteCurrentLocale=       {this.props.siteCurrentLocale}
          routeParams=             {this.props.routeParams}
        />
      )
    }
  },

  renderArticlesList() {
    return (
      <ArticlesList
        articlesPassedInUiProps=           {this.props.articlesPassedInUiProps}
        // # redux articles list
        articles=                          {this.props.articles}
        // # redux passed in Edit and Wip States
        articlesWIPStatesOfFields=         {this.props.articlesWIPStatesOfFields}
        articlesEditStates=                {this.props.articlesEditStates}
        // # redux passedInDomProps
        articlesDOMProps=                  {this.props.articlesDOMProps}
        // # redux global site edit mode
        siteEditMode=                      {this.props.siteEditMode}
        // # redux actions
        articlesActions=                   {this.props.articlesActions}
        articlesFieldsActions=             {this.props.articlesFieldsActions}
        articlesSizingPositionningActions= {this.props.articlesSizingPositionningActions}

        routeParams=                       {this.props.routeParams}
        siteCurrentLocale=                 {this.props.siteCurrentLocale}

        mediaContainers=                   {this.props.mediaContainers}
        articlePictures=                   {this.props.articlePictures}
      />
    )
  },

  render() {
    return (
      <div className="row">
        <div className="col-xs-12">
          {this.renderNewArticleBasicForm()}
          {this.renderArticlesList()}
        </div>
      </div>
    )
  }
});
