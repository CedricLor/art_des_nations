
import React from 'react';
import { NewsCardsContainer } from './news_cards_container';
import { AdminSwitchButton } from './admin_switch_button';
import { ArticleForm} from './article_form';

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

  renderNewArticleForm() {
    if ( this.props.siteEditMode.mode === true) {
      return (
        <span>
          <hr />
          <ArticleForm
            newArticleActions=        {this.props.newArticleActions}
            newArticleFields=         {this.props.newArticleFields}
            articlesPassedInUiProps=  {this.props.articlesPassedInUiProps} />
          <hr />
        </span>
      )
    }
  },

  renderNewsCardContainer() {
    if ( this.props.isFetching.initialData === false ) {
      return (
        <NewsCardsContainer
          articlesActions=                   {this.props.articlesActions}
          articlesFieldsActions=             {this.props.articlesFieldsActions}
          articlesSizingPositionningActions= {this.props.articlesSizingPositionningActions}
          siteEditMode=                      {this.props.siteEditMode}
          articles=                          {this.props.articles}
          articlesWIPStatesOfFields=         {this.props.articlesWIPStatesOfFields}
          articlesEditStates=                {this.props.articlesEditStates}
          articlesDOMProps=                  {this.props.articlesDOMProps}
          articlesPassedInUiProps=           {this.props.articlesPassedInUiProps}/>
      )
    }
  },

  renderChildren() {
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
         articlesPassedInUiProps:           this.props.articlesPassedInUiProps
      })
    )
  },

  render() {
    return (
      <div className= "news-index-page-body">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <AdminSwitchButton siteEditModePassedInProps={this.props.site} siteEditMode={this.props.siteEditMode} onToggleSiteEditMode={this.props.siteActions.toggleSiteEditMode} />
              {this.renderNewArticleForm()}
            </div>
            {this.renderChildren()}
          </div>
        </div>
      </div>
    )
  }
});
