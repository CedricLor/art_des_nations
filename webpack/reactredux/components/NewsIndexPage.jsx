import React from 'react';
import { NavBar } from './news_index_page/nav_bar';
import { Footer } from './news_index_page/footer';

export const NewsIndexPage = React.createClass({

  getDefaultProps() {
    return {
      articlesPassedInUiProps: {
        colClasses: "col-xs-12 col-sm-12 col-md-8 col-md-offset-2",
      }
    }
  },

  componentDidMount() {
    return window.addEventListener('resize', this.props.articlesSizingPositionningActions.refreshArticlesSizingPositionning(this.props.siteCurrentLocale));
  },

  componentWillUnmount() {
    return window.removeEventListener('resize');
  },

  renderChildren() {
    if (this.props.children && this.props.children.props.location) {
      // if the children requested via the router is a single article (individualNewsContainer) (i.e. for the articleView)
      if (this.props.children.props.location.pathname.match(/\/article\//) != null) {
        const currentArticle = _.find(this.props.visibleArticles, { 'id': parseInt(this.props.children.props.params.id)});
        return (
          this.props.children && React.cloneElement(this.props.children, {
            articlesActions:                   this.props.articlesActions,
            articlesFieldsActions:             this.props.articlesFieldsActions,
            siteEditMode:                      this.props.siteEditMode,
            currentArticle:                    currentArticle,
            // # redux passed in Edit and Wip States
            articlesWIPStatesOfFields:         this.props.articlesWIPStatesOfFields[this.props.children.props.params.id],
            articlesEditStates:                this.props.articlesEditStates[this.props.children.props.params.id],
            // # redux passedInDomProps
            articlesDOMProps:                  this.props.articlesDOMProps[this.props.children.props.params.id],
            articlesPassedInUiProps:           this.props.articlesPassedInUiProps,
            routeParams:                       this.props.routeParams,
            siteCurrentLocale:                 this.props.siteCurrentLocale
          })
        )
      // else what is requested is the articles index (newsCardContainer) (i.e. for the indexView)
      } else {
        return (
          this.props.children && React.cloneElement(this.props.children, {
            articlesActions:                   this.props.articlesActions,
            articlesFieldsActions:             this.props.articlesFieldsActions,
            articlesSizingPositionningActions: this.props.articlesSizingPositionningActions,
            siteEditMode:                      this.props.siteEditMode,
            articles:                          this.props.visibleArticles,
            articlesWIPStatesOfFields:         this.props.articlesWIPStatesOfFields,
            articlesEditStates:                this.props.articlesEditStates,
            articlesDOMProps:                  this.props.articlesDOMProps,
            articlesPassedInUiProps:           this.props.articlesPassedInUiProps,
            newArticleActions:                 this.props.newArticleActions,
            newArticleFields:                  this.props.newArticleFields,
            routeParams:                       this.props.routeParams,
            siteCurrentLocale:                 this.props.siteCurrentLocale
          })
        )
      }
    }
  },

  render() {
    console.log("-----------", this.props)
    return (
      <div className= "news-index-page-body">
        <div className="container">
          <div className="row">
            <NavBar
              siteEditMode=                    {this.props.siteEditMode}
              onToggleSiteEditMode=            {this.props.siteActions.toggleSiteEditMode}
              articlesVisibilityFilter=        {this.props.articlesVisibilityFilter}
              articlesVisibilityFilterActions= {this.props.articlesVisibilityFilterActions}

              localesTranslations=              {this.props.siteLanguageSwitcherText}
              siteAvailableLocales=            {this.props.siteAvailableLocales}
              routing=                         {this.props.routing}
              routeParams=                     {this.props.routeParams}
            />
            {this.renderChildren()}
          </div>
        </div>
        <Footer
          localesTranslations=     {this.props.siteLanguageSwitcherText}
          siteAvailableLocales=    {this.props.siteAvailableLocales}
          routing=                 {this.props.routing}
          routeParams=             {this.props.routeParams}
        />
      </div>
    )
  }
});

