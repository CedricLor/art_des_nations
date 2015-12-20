ReactCSSTransitionGroup = React.addons.CSSTransitionGroup

NewsIndexPage = React.createClass
  displayName: "NewsIndexPage"

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
          domElements: @props.articles
          localizedReadMore: "Read more"
          colClasses: "col-xs-12 col-sm-6 col-md-4"

`module.exports = {
  NewsIndexPage: NewsIndexPage
};`
