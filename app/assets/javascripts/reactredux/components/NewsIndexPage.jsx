
import React from 'react';
import { NewsCardsContainer } from './news_cards_container';
import { AdminSwitchButton } from './admin_switch_button';

export const NewsIndexPage = React.createClass({
  getDefaultProps() {
    return {
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
      // if the children requested via the router is a single article
      if (this.props.children.props.location.pathname.match(/\/article\//) != null) {
        const currentArticle = _.find(this.props.articles, { 'id': parseInt(this.props.children.props.params.id)});
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
      // else what is requested is the articles index
      } else {
        return (
          this.props.children && React.cloneElement(this.props.children, {
            articlesActions:                   this.props.articlesActions,
            articlesFieldsActions:             this.props.articlesFieldsActions,
            articlesSizingPositionningActions: this.props.articlesSizingPositionningActions,
            siteEditMode:                      this.props.siteEditMode,
            articles:                          this.props.articles,
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
    return (
      <div className= "news-index-page-body">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <AdminSwitchButton siteEditModePassedInProps={this.props.site} siteEditMode={this.props.siteEditMode} onToggleSiteEditMode={this.props.siteActions.toggleSiteEditMode} />
            </div>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    )
  }
});
