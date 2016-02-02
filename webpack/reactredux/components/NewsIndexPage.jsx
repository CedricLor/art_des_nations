import React, {PropTypes} from 'react';
import { NavBar } from './news_index_page/nav_bar';
import { Footer } from './news_index_page/footer';

export const NewsIndexPage = React.createClass({
  propTypes: {
    // Props (from App)
    isFetching:                         PropTypes.objectOf(PropTypes.bool),
    siteEditMode:                       PropTypes.objectOf(PropTypes.bool.isRequired).isRequired,
    siteAvailableLocales:               PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    siteLanguageSwitcherText:           PropTypes.objectOf(PropTypes.string.isRequired).isRequired,
    siteCurrentLocale:                  PropTypes.string.isRequired,

    articlesVisibilityFilter:           PropTypes.string.isRequired,

    mediaContainers:                    PropTypes.objectOf(PropTypes.object.isRequired).isRequired,
    articlePictures:                    PropTypes.objectOf(PropTypes.object.isRequired).isRequired,

    // Actions (from App)
    articlesActions:                    PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesFieldsActions:              PropTypes.objectOf(PropTypes.func.isRequired).isRequired,
    articlesSizingPositionningActions:  PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    articlesVisibilityFilterActions:    PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    articlePicturesActions:             PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    siteActions:                        PropTypes.objectOf(PropTypes.func.isRequired).isRequired,

    // Passed-in by router
    children:                           PropTypes.element.isRequired,

    history:                            PropTypes.object,
    location:                           PropTypes.object,
    params:                             PropTypes.object,
    route:                              PropTypes.object,
    routeParams:                        PropTypes.object,
    routes:                             PropTypes.array,
    // From routing reducer (redux-router history)
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
    return window.addEventListener('resize', this.props.articlesSizingPositionningActions.refreshArticlesSizingPositionning());
  },

  componentWillUnmount() {
    return window.removeEventListener('resize');
  },

  renderChildren() {
    return (
      this.props.children && React.cloneElement(this.props.children, {
        articlesPassedInUiProps:           this.props.articlesPassedInUiProps,

        siteEditMode:                      this.props.siteEditMode,
        // routeParams:                       this.props.routeParams,
        siteCurrentLocale:                 this.props.siteCurrentLocale,

        articlePictures:                   this.props.articlePictures,
        mediaContainers:                   this.props.mediaContainers,

        articlesActions:                   this.props.articlesActions,
        articlesFieldsActions:             this.props.articlesFieldsActions,
        articlesSizingPositionningActions: this.props.articlesSizingPositionningActions,
        articlePicturesActions:            this.props.articlePicturesActions,
      })
    )
  },


  render() {
    return (
      <div className= "news-index-page-body">
        <div className="container">
          <div className="row">
            <NavBar
              siteEditMode=                    {this.props.siteEditMode}
              onToggleSiteEditMode=            {this.props.siteActions.toggleSiteEditMode}
              articlesVisibilityFilter=        {this.props.articlesVisibilityFilter}
              articlesVisibilityFilterActions= {this.props.articlesVisibilityFilterActions}

              localesTranslations=             {this.props.siteLanguageSwitcherText}
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

