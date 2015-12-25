# ReactCSSTransitionGroup = React.addons.CSSTransitionGroup
`
window.React = require('react');
window.ReactDOM = require('react-dom');
window._ = require('lodash');
window.DOM = React.DOM;
window.ReactCSSTransitionGroup = require('react-addons-css-transition-group');
window.ReactAddonsUpdate = require('react-addons-update');

`
NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

  getInitialState: ->
    site:
      admin_mode_button_props:
        button_text:
          false: "Edit website"
          true: "Exit edit website mode"
      admin_functions:
        switch_admin_mode_function: @handleToggleSiteAdminMode
    #### articles management
    articles:
      data: @props.articles

      admin_functions: @initialAdminFunctions()

      articles_states: @initialArticlesStates()

      display_functions:
        getDomPropsForArticle: @getDomPropsForArticle

      articles_dom_props: @initialArticlesDomProps()
    #### end articles management
    #### new article management
    new_article: @blankNewArticle()
    #### end new article management

  ####################
  ## articles states initializers
  ####################
  initialAdminFunctions: ->
    toggleEditArticle:
      text: "Edit",
      function: @handleToggleEditArticle
    cancelEditArticle:
      text: "Cancel"
      function: @handleCancelEditArticle
    update:
      text: "Update",
      function: @handleUpdateArticle
    destroy:
      text: "Delete",
      function: @handleDeleteArticle
    toggleEditField:
      function: @handleToggleEditField
    handleChangeInFieldsOfArticle:
      function: @handleChangeInFieldsOfArticle
    exitEditField:
      text: "Exit edit"
    deleteText:
      text: "Delete text"
    restoreText:
      text: "Restore text"
      function: @handleRestoreText

  initialArticleState: ->
    edit:
      article: false
      title: false
      teaser: false
      body: false
    WIP:
      title: false
      teaser: false
      body: false
    needs_resizing: false

  initialArticlesStates: ->
    hash = {}
    for article in @props.articles
      hash[article.id] = @initialArticleState()
    hash

  initialArticlesDomProps: ->
    array = []
    for article in @props.articles
      array.push({
        article_id: article.id,
        pos_top: 0, div_height: 0,
        req_div_height: 0 })
    return array

  ##################
  ## admin site
  ##################
  handleToggleSiteAdminMode: ->
    @props.onToggleEditMode()
    # site = @state.site
    # site.admin_mode = !site.admin_mode
    # @setState site: site

  ##################
  ## admin articles
  ##################
  ## Update articles
  #######
  handleToggleEditArticle: (article_id) ->
    articles = @state.articles
    articles.articles_states[article_id].edit.article = !articles.articles_states[article_id].edit.article
    @setState articles: articles

  _resetAllEditAndWIPStates: (articles, article_id, resetValue) ->
    articles.articles_states[article_id].edit = _.map(articles.articles_states[article_id].edit, (value) -> value = resetValue)
    articles.articles_states[article_id].WIP = _.map(articles.articles_states[article_id].WIP, (value) -> value = resetValue)
    return articles

  _resetEditAndWIPStatesForField: (articles, article_id, fieldName, resetValue) ->
    articles.articles_states[article_id].edit[fieldName] = resetValue
    articles.articles_states[article_id].WIP[fieldName] = resetValue
    return articles

  _getInitialDataByAjax: (articles, article_id, successCallBack, fieldName) ->
    $.ajax
      method: 'GET'
      url: "/articles/#{ article_id }"
      dataType: 'JSON'
      success: (data) =>
        successCallBack(articles, article_id, data, fieldName)

  _successCallBackForRestoreText: (articles, article_id, data, fieldName) ->
    articles = @_resetEditAndWIPStatesForField(articles, article_id, fieldName, false)
    @handleChangeInFieldsOfArticle(fieldName, fieldValue = data[fieldName], article_id, WIPStateValue = false)

  handleRestoreText: (fieldName, article_id) ->
    articles = @state.articles
    successCallBack = @_successCallBackForRestoreText
    @_getInitialDataByAjax(articles, article_id, successCallBack, fieldName)

  _successCallBackForCancelEditArticle: (articles, article_id, data, fieldName) ->
    articles = @_resetAllEditAndWIPStates(articles, article_id, false)
    @_updateArticle articles, article_id, data

  handleCancelEditArticle: (article_id) ->
    articles = @state.articles
    if _.includes(_.values(articles.articles_states[article_id].WIP), true)
      @_getInitialDataByAjax(articles, article_id, @_successCallBackForCancelEditArticle, null)
    else
      @handleToggleEditArticle(article_id)

  _updateArticle: (articles, article_id, data) ->
    index = _.findIndex(articles.data, { id: article_id })
    articles = ReactAddonsUpdate(@state.articles, data: { $splice: [[index, 1, data]] })
    # articles = @refreshArticles(articles)
    @setState articles: articles

  _updateEditAndWIPStates: (articles, article_id, fieldName) ->
    if fieldName == 'article'
      articles = @_resetAllEditAndWIPStates(articles, article_id, false)
    else
      articles.articles_states[article_id].edit[fieldName] = false
      articles.articles_states[article_id].WIP[fieldName] = false
    return articles

  _sendUpdateByAjax: (data, article_id, fieldName) ->
    $.ajax
      method: 'PUT'
      url: "/articles/#{ article_id }"
      dataType: 'JSON'
      data: { article: data }
      success: (data) =>
        articles = @state.articles
        articles = @_updateEditAndWIPStates(articles, article_id, fieldName)
        @_updateArticle articles, article_id, data

  handleUpdateArticle: (refs, article_id, fieldName) ->
    data = {}
    # Do I really need refs to get the data from the document???
    if fieldName == 'article'
      for own key, value of refs
        data[key] = ReactDOM.findDOMNode(refs[key]).value if key in ['title', 'teaser', 'body']
    else
      data[fieldName] = ReactDOM.findDOMNode(refs[fieldName]).value
    @_sendUpdateByAjax(data, article_id, fieldName)

  handleToggleEditField: (field_name, article_id) ->
    articles = @state.articles
    articles.articles_states[article_id].edit[field_name] = !articles.articles_states[article_id].edit[field_name]
    @setState articles: articles

  handleChangeInFieldsOfArticle: (fieldName, fieldValue, article_id, WIPStateValue) ->
    articles = @state.articles
    article = _.find(articles.data, { id: article_id })
    article[fieldName] = fieldValue
    articles.articles_states[article_id].WIP[fieldName] = WIPStateValue
    @setState articles: articles

  ## Delete articles
  #######
  _deleteArticle: (article_id) ->
    index = _.findIndex(@state.articles.data, { id: article_id })
    articles = ReactAddonsUpdate(
      @state.articles,
      data: { $splice: [ [index, 1] ] },
      articles_dom_props: { $splice: [ [index, 1] ] } )
    delete articles.articles_states[article.id]
    @setState articles: articles

  handleDeleteArticle: (article_id) ->
    $.ajax
      method: 'DELETE'
      url: "/articles/#{ article.id }"
      dataType: 'JSON'
      success: () =>
        @_deleteArticle article_id

  ## New article
  #######
  blankNewArticle: ->
    article_data:
      title: '',
      teaser: '',
      body: ''
    article_form_functions:
      handleSubmitNewArticle: @handleSubmitNewArticle,
      handleChangeInFieldsOfNewArticle: @handleChangeInFieldsOfNewArticle

  createBlankNewArticle: ->
    blank_article = @blankNewArticle()
    @setState new_article: blank_article

  addNewArticle: (article) ->
    # add the article to the articles data list
    articles = ReactAddonsUpdate(
      @state.articles
      data: { $unshift: [ article ] }
      articles_dom_props: { $unshift: [ { article_id: article.id, pos_top: 0, div_height: 0, req_div_height: 0 } ] }
      )
    # create an entry for the article in the articles set collection
    articles.articles_states[article.id] = @initialArticleState()
    # refresh all the articles (resizing)
    articles = @refreshArticles(articles)
    @setState articles: articles

  handleSubmitNewArticle: ->
    $.post '/articles', { article: @state.new_article.article_data }, (data) =>
      @addNewArticle data
      @createBlankNewArticle()
    , 'JSON'

  handleChangeInFieldsOfNewArticle: (e) ->
    new_article = @state.new_article
    new_article.article_data[e.target.name] = e.target.value
    @setState new_article: new_article
  ##################
  ## End Admin
  ##################

  ##################
  ## div height equalizer
  ##################
  setDomValuesForArticle: (current_art_dom_props, refs, current_article_id, current_card_number) ->
    # collect values from DOM/function input values, and set them on the article dom props record
    _.assign(current_art_dom_props, {
      'pos_top': ReactDOM.findDOMNode(refs["main_article_div_#{current_article_id}"]).getBoundingClientRect().top
      'div_height': ReactDOM.findDOMNode(refs["#{current_card_number}"]).clientHeight
      'card_number': current_card_number
      })
    return current_art_dom_props

  equalizeRows: (articles, previous_art_dom_props) ->
    # select articles in same row as previous article
    articles_in_same_row = _.filter(articles.articles_dom_props, (value) -> value if value.pos_top == previous_art_dom_props.pos_top )
    # get an array of the height of divs in the same row
    heights_of_cards_in_same_row = _.pluck(articles_in_same_row, 'div_height')
    # get the highest div value of all such divs
    required_height = _.max(heights_of_cards_in_same_row)
    # set the required height of each element
    _.map( articles_in_same_row, (value) -> value.req_div_height = required_height )
    return articles

  equalizeRowsWrapper: (articles, current_card_number, current_art_dom_props) ->
    # check if the current_card is not the first one
    if current_card_number > 0
      # select the previous card
      previous_art_dom_props = _.find(articles.articles_dom_props, { card_number: current_card_number - 1 })
      # and check if the current card is positionned on a new row
      if current_art_dom_props.pos_top > previous_art_dom_props.pos_top
        # if so, equalize the previous row
        articles = @equalizeRows(articles, previous_art_dom_props)
    return articles


  getDomPropsForArticle: (refs, current_article_id, current_card_number) ->
    articles = @state.articles
    current_art_dom_props = _.find(articles.articles_dom_props, { article_id: current_article_id })
    # reset the needs resizing @state to false
    articles.articles_states[current_article_id].needs_resizing = false
    # assign the values collected from the DOM and function input to the current_art_dom_props record
    current_art_dom_props = @setDomValuesForArticle(current_art_dom_props, refs, current_article_id, current_card_number)
    # equalize div heights
    articles = @equalizeRowsWrapper(articles, current_card_number, current_art_dom_props)

    @setState articles: articles

  refreshArticles: (articles) ->
    _.forIn( articles.articles_states, (value) -> value.needs_resizing = true )
    _.map( articles.articles_dom_props, (value) ->
      value.pos_top = 0
      value.div_height = 0
      value.req_div_height = 0
      )
    return articles

  handleResize: ->
    articles = @state.articles
    articles = @refreshArticles(articles)
    @setState articles: articles

  # successInitialDataFetchCallback: (jsonFetchedArticles) ->
  #   articles = @state.articles
  #   articles.data = jsonFetchedArticles
  #   @setState articles: articles

  # componentWillMount: ->
  #   console.log "hello"
  #   @initialAjaxCall()

  # initialAjaxCall: ->
  #   $.ajax
  #     method: "GET",
  #     url: "/articles",
  #     dataType: 'JSON'
  #     success: ( jsonFetchedArticles ) =>
  #       @successInitialDataFetchCallback(jsonFetchedArticles)

  componentDidMount: ->
    window.addEventListener('resize', @handleResize)

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
        siteAdmin: @state.site
        siteEditMode: @props.siteEditMode
      React.createElement ReactCSSTransitionGroup,
        transitionName: "react-news-container"
        transitionEnterTimeout: 300
        transitionLeaveTimeout: 300
        transitionAppear: true
        transitionAppearTimeout: 4000
        React.createElement NewsCardsContainer,
          adminModeState: @state.site.admin_mode
          domElements: @state.articles
          localizedReadMore: "Read more"
          colClasses: "col-xs-12 col-sm-12 col-md-12"
          new_article: @state.new_article


`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
