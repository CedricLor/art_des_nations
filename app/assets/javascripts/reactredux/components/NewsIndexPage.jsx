import React from 'react';
import { NavBar } from './news_index_page/nav_bar';
import { Footer } from './news_index_page/footer';

import {FormattedMessage} from 'react-intl';

export const NewsIndexPage = React.createClass({

  getDefaultProps() {
    return {
      locales: ['en-US'],
      site: {
        site_edit_mode_button_props:{
          button_text: {
            "false": "Edit website",
            "true": "Exit edit website mode"
          }
        }
      },
      articlesPassedInUiProps: {
        localizedReadMore: "Read more",
        colClasses: "col-xs-12 col-sm-12 col-md-8 col-md-offset-2",
        editArticle: {
          text: "Edit"
        },
        cancelEditArticle: {
          text: "Cancel"
        },
        update: {
          text: "Save"
        },
        destroy: {
          text: "Delete"
        },
        exitEditField: {
          text: "Exit edit"
        },
        deleteText: {
          text: "Delete text"
        },
        restoreText:{
          text: "Restore text"
        }
      }
    }
  },

  componentDidMount() {
    return window.addEventListener('resize', this.props.articlesSizingPositionningActions.refreshArticlesSizingPositionning);
  },

  componentWillUnmount() {
    return window.removeEventListener('resize');
  },

  renderChildren() {
    if (this.props.children && this.props.children.props.location) {
      // if the children requested via the router is a single article (i.e. for the articleView)
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
            articlesPassedInUiProps:           this.props.articlesPassedInUiProps
          })
        )
      // else what is requested is the articles index (i.e. for the indexView)
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
            newArticleFields:                  this.props.newArticleFields
          })
        )
      }
    }
  },

  render() {
    console.log(this.props)
    console.log(this.context)
    return (
      <div className= "news-index-page-body">
        <div className="container">
          <div className="row">
            <NavBar
              siteEditModePassedInProps=       {this.props.site}
              siteEditMode=                    {this.props.siteEditMode}
              onToggleSiteEditMode=            {this.props.siteActions.toggleSiteEditMode}
              articlesVisibilityFilter=        {this.props.articlesVisibilityFilter}
              articlesVisibilityFilterActions= {this.props.articlesVisibilityFilterActions}
              availableLocales=                {this.props.availableLocales}
              routeParams=                     {this.props.routeParams} />
            {this.renderChildren()}
          </div>
        </div>
        <Footer
          localesTranslations=     {this.props.languageSwitcher.localesText}
          availableLocales=        {this.props.availableLocales}
          routing=                 {this.props.routing}
          routeParams=             {this.props.routeParams}
        />
        <FormattedMessage
            id="greeting"
            description="Welcome greeting to the user"
            defaultMessage="Hello! How are you today?"
        />
      </div>
    )
  }
});

