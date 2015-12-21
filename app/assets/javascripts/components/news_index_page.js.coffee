ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

  getInitialState: ->
    #### new article management
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
      articles_states: @initialStates()
    }
    new_article: @blankNewArticle()
    #### end new article management
    #### div height equalizer
    div_equalization_params: @divEqualizationParams()
    #### div height equalizer

  ## admin articles
  deleteArticle: (article) ->
    index = @state.articles.data.indexOf article
    articles = React.addons.update(@state.articles, data: { $splice: [[index, 1]] })
    delete articles.articles_states[article.id]
    console.log(articles)
    @setState articles: articles

  handleDeleteArticle: (article) ->
    $.ajax
      method: 'DELETE'
      url: "/articles/#{ article.id }"
      dataType: 'JSON'
      success: () =>
        @deleteArticle article

  updateArticle: (article, data) ->
    index = @state.articles.data.indexOf article
    articles = React.addons.update(@state.articles, data: { $splice: [[index, 1, data]] })
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
        @setState articles: articles
        @updateArticle article, data

  initialStates: ->
    hash = {}
    for article in @props.articles
      hash[article.id] = { edit: false, resized: false }
    hash

  handleToggleEditArticle: (article_id) ->
    articles = @state.articles
    articles.articles_states[article_id].edit = !articles.articles_states[article_id].edit
    @setState articles: articles
  ## end admin articles

  ###### new article management
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
    articles = React.addons.update(@state.articles, data: { $unshift: [article] })
    articles.articles_states[article.id] = { edit: false, resized: false }
    @setState articles: articles

  handleSubmitNewArticle: ->
    $.post '', { article: @state.new_article.article_data }, (data) =>
      @addNewArticle data
      @createBlankNewArticle()
    , 'JSON'

  handleChangeInFieldsOfNewArticle: (e) ->
    new_article = @state.new_article
    new_article.article_data[e.target.name] = e.target.value
    @setState new_article: new_article
  ###### end new article management

  ###### div height equalizer
  ## state initializers
  divEqualizationParams: ->
    {
      cardByRows: @numberOfCardsByRow(),
      heightOfRows: [],
      heightOfRowsByChunksOf: {
        2: @arrayBuilder(2),
        3: @arrayBuilder(3)
      },
      setRequiredHeightOfRowsOnRender: @setRequiredHeightOfRowsOnRender,
      storeDivHeight: @storeDivHeight
    }

  arrayBuilder: (chunk_size) ->
    empty_div_height_array = []
    #######################
    # BEWARE : WHY ARE WE CALLING @props and not @state
    # And why does it work???
    #######################
    for i in [1..@props.articles] by chunk_size
      empty_div_height_array.push(0)
    empty_div_height_array

  numberOfCardsByRow: ->
    if window.innerWidth >= 992 then 3 else if window.innerWidth >= 768 then 2

  handleResize: ->
    div_equalization_params = @state.div_equalization_params
    div_equalization_params.cardByRows = @numberOfCardsByRow()
    @setState div_equalization_params: div_equalization_params
    @forceUpdate()
  ## end state initializers
  ## behavior handlers
  componentDidMount: ->
    window.addEventListener('resize', @handleResize)

  componentWillUnmount: ->
    window.removeEventListener('resize', @handleResize);

  storeDivHeight: (height, card_index) ->
    div_equalization_params = @state.div_equalization_params
    div_equalization_params.heightOfRows[card_index] = height
    @setState div_equalization_params: div_equalization_params

  inWhichRowIsTheCardByRowOf: (number_of_cards_by_row, index) ->
    rindex = index + 1
    row = if rindex % number_of_cards_by_row == 0 then rindex / number_of_cards_by_row - 1 else Math.floor(rindex / number_of_cards_by_row)

  setRequiredHeightOfRowsOnRender: (card_index) ->
    my_row_index = @inWhichRowIsTheCardByRowOf(@state.div_equalization_params.cardByRows, card_index)
    heights_of_cards_in_same_row = @state.div_equalization_params.heightOfRows.slice(my_row_index * @state.div_equalization_params.cardByRows, (my_row_index * @state.div_equalization_params.cardByRows) + @state.div_equalization_params.cardByRows)
    required_min_height = 0
    for height in heights_of_cards_in_same_row
      required_min_height = height if height > required_min_height
    required_min_height
  ## end behavior handlers
  ##### end div height equalizer

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
          div_equalization_params: @state.div_equalization_params

`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
