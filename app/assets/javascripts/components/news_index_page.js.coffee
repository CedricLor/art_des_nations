ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

  getInitialState: ->
    #### articles management
    articles: {
      data: @props.articles,

      admin_functions: {
        destroy: {
          text: "Delete",
          function: @handleDeleteArticle
        },
        edit: {
          text: "Edit"
        },
        update: {
          text: "Update",
          function: @handleUpdateArticle
        },
        toggle_edit: {
          function: @handleToggleEditArticle
        }
      },

      articles_states: @initialArticlesStates(),

      display_functions: {
        getDomPropsForArticle: @getDomPropsForArticle
      },

      articles_dom_props: @initialArticlesDomProps()
    }
    #### end articles management
    #### new article management
    new_article: @blankNewArticle()
    #### end new article management


  ####################
  ## articles states initializers
  ####################
  initialArticlesStates: ->
    hash = {}
    for article in @props.articles
      hash[article.id] = { edit: false, needs_resizing: false }
    hash

  initialArticlesDomProps: ->
    array = []
    for article in @props.articles
      array.push({ article_id: article.id, pos_top: 0, div_height: 0, req_div_height: 0 })
    array

  ##################
  ## admin articles
  ##################
  ## Delete articles
  #######
  deleteArticle: (article) ->
    index = @state.articles.data.indexOf article
    articles = React.addons.update(@state.articles, data: { $splice: [[index, 1]] })
    delete articles.articles_states[article.id]
    @setState articles: articles

  handleDeleteArticle: (article) ->
    $.ajax
      method: 'DELETE'
      url: "/articles/#{ article.id }"
      dataType: 'JSON'
      success: () =>
        @deleteArticle article

  ## Update articles
  #######
  updateArticle: (article, data) ->
    index = @state.articles.data.indexOf article
    articles = React.addons.update(@state.articles, data: { $splice: [[index, 1, data]] })
    articles = @refreshArticles(articles)
    @setState articles: articles

  handleUpdateArticle: (refs, article) ->
    data =
      title: ReactDOM.findDOMNode(refs.title).value
      teaser: ReactDOM.findDOMNode(refs.teaser).value
    $.ajax
      method: 'PUT'
      url: "/articles/#{ article.id }"
      dataType: 'JSON'
      data: { article: data }
      success: (data) =>
        articles = @state.articles
        articles.articles_states[article.id].edit = false
        @updateArticle article, data

  handleToggleEditArticle: (article_id) ->
    articles = @state.articles
    articles.articles_states[article_id].edit = !articles.articles_states[article_id].edit
    @setState articles: articles

  ## New article
  #######
  blankNewArticle: ->
    {
      article_data: {
        title: '',
        teaser: '',
        body: ''
        },
      article_form_functions: {
        handleSubmitNewArticle: @handleSubmitNewArticle,
        handleChangeInFieldsOfNewArticle: @handleChangeInFieldsOfNewArticle
      }
    }

  createBlankNewArticle: ->
    blank_article = @blankNewArticle()
    @setState new_article: blank_article

  addNewArticle: (article) ->
    # add the article to the articles data list
    articles = React.addons.update(
      @state.articles
      data: { $unshift: [ article ] }
      articles_dom_props: { $unshift: [ { article_id: article.id, pos_top: 0, div_height: 0, req_div_height: 0 } ] }
      )
    # create an entry for the article in the articles set collection
    articles.articles_states[article.id] = { edit: false, needs_resizing: true }
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
  ###### End Admin

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

  componentDidMount: ->
    window.addEventListener('resize', @handleResize)

  componentWillUnmount: ->
    window.removeEventListener('resize')

  render: ->
    `NewsCardsContainer = require('./news_cards_container.js.coffee').NewsCardsContainer`

    DOM.div
      className: "news-index-page-body"
      React.createElement ReactCSSTransitionGroup,
        transitionName: "react-news-container"
        transitionEnterTimeout: 300
        transitionLeaveTimeout: 300
        transitionAppear: true
        transitionAppearTimeout: 4000
        React.createElement NewsCardsContainer,
          domElements: @state.articles
          localizedReadMore: "Read more"
          colClasses: "col-xs-12 col-sm-6 col-md-4"
          new_article: @state.new_article
          # div_equalization_params: @state.div_equalization_params

`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
