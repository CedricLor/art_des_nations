`
window.React = require('react');
window.ReactDOM = require('react-dom');
window.DOM = React.DOM;
window.ReactCSSTransitionGroup = require('react-addons-css-transition-group');
window.ReactAddonsUpdate = require('react-addons-update');

`
NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

  getInitialState: ->
    domElementsFunctions:

      admin_functions:
        editArticle:
          text: "Edit"
        cancelEditArticle:
          text: "Cancel"
        update:
          text: "Save"
        destroy:
          text: "Delete"
        exitEditField:
          text: "Exit edit"
        deleteText:
          text: "Delete text"
        restoreText:
          text: "Restore text"

  getDefaultProps: ->
    site:
      site_edit_mode_button_props:
        button_text:
          false: "Edit website"
          true: "Exit edit website mode"
    articlesPassedInUiProps:
      localizedReadMore: "Read more"
      colClasses: "col-xs-12 col-sm-12 col-md-12"
      editArticle:
        text: "Edit"
      cancelEditArticle:
        text: "Cancel"
      update:
        text: "Save"
      destroy:
        text: "Delete"
      exitEditField:
        text: "Exit edit"
      deleteText:
        text: "Delete text"
      restoreText:
        text: "Restore text"

  componentDidMount: ->
    window.addEventListener('resize', @props.articlesSizingPositionningActions.refreshArticlesSizingPositionning)

  componentWillUnmount: ->
    window.removeEventListener('resize')
  ##################
  ## End div height equalizer
  ##################

  render: ->
    `NewsCardsContainer = require('./news_cards_container.js.coffee').NewsCardsContainer`
    `AdminSwitchButton = require('./admin_switch_button.js.coffee').AdminSwitchButton`

    DOM.div
      className: "news-index-page-body"
      React.createElement AdminSwitchButton,
        siteEditModePassedInProps: @props.site
        siteEditMode:              @props.siteEditMode
        onToggleSiteEditMode:      @props.siteActions.toggleSiteEditMode

      if @props.siteEditMode.mode
        React.createElement ArticleForm,
          newArticleActions: @props.newArticleActions
          newArticleFields:  @props.newArticleFields

      unless @props.isFetching.initialData == true
        React.createElement ReactCSSTransitionGroup,
          transitionName:          "react-news-container"
          transitionEnterTimeout:  300
          transitionLeaveTimeout:  300
          transitionAppear:        true
          transitionAppearTimeout: 4000
          React.createElement NewsCardsContainer,

            ##### Existing articles
            # redux action
            articlesActions:                  @props.articlesActions
            articlesFieldsActions:            @props.articlesFieldsActions
            articlesSizingPositionningActions: @props.articlesSizingPositionningActions
            # redux states
            siteEditMode:                     @props.siteEditMode
            articles:                         @props.articles
            articlesWIPStatesOfFields:        @props.articlesWIPStatesOfFields
            articlesEditStates:               @props.articlesEditStates
            articlesDOMProps:                 @props.articlesDOMProps
            # from local getDefaultProps
            articlesPassedInUiProps:          @props.articlesPassedInUiProps

`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
