import React, {PropTypes} from 'react';
import { NavBar } from './news_index_page/nav_bar';
import { Footer } from './news_index_page/footer';

export const NewsIndexPage = React.createClass({
  propTypes: {
    newArticleActions:                  PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    newArticleFields:                   PropTypes.object.isRequired,

    visibleArticles:                    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    articlesActions:                    PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:              PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesSizingPositionningActions:  PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    articlesDOMProps:                   PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesEditStates:                 PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesWIPStatesOfFields:          PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlesNeedResizingStates:         PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,

    siteActions:                        PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    siteAvailableLocales:               PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    siteCurrentLocale:                  PropTypes.string.isRequired,
    siteEditMode:                       PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    siteLanguageSwitcherText:           PropTypes.objectOf(PropTypes.string.isRequired).isRequired,

    articlesVisibilityFilter:           PropTypes.string.isRequired,
    articlesVisibilityFilterActions:    PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    mediaContainers:                    PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlePictures:                    PropTypes.objectOf(PropTypes.object.isRequired).isRequired,

    children:                           PropTypes.element.isRequired,

    history:                            PropTypes.object,
    isFetching:                         PropTypes.objectOf(PropTypes.bool),
    location:                           PropTypes.object,
    params:                             PropTypes.object,
    route:                              PropTypes.object,
    routeParams:                        PropTypes.object,
    routes:                             PropTypes.array,
    routing:                            PropTypes.object,
  },

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
            siteCurrentLocale:                 this.props.siteCurrentLocale,

            articlePictures:                   this.props.articlePictures,
            mediaContainers:                   this.props.mediaContainers
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
            siteCurrentLocale:                 this.props.siteCurrentLocale,

            articlePictures:                   this.props.articlePictures,
            mediaContainers:                   this.props.mediaContainers
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

