(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// # `window.React = require('react')`
// # `window.ReactDOM = require('react-dom')`

DOM = React.DOM;

window.NewsIndexPage = require('./components/news_index_page.js.coffee').NewsIndexPage

// # $(window).load ->

// #   `var CommentBox = require('./sub_tuto.js.coffee').CommentBox`

// #   render = ReactDOM.render(
// #     React.createElement CommentBox
// #     document.getElementById('content')
// #   )

// #   render


},{"./components/news_index_page.js.coffee":4}],2:[function(require,module,exports){
var Image, NewsCard;

Image = React.createClass({
  displayName: "Image",
  render: function() {
    return DOM.img({
      src: this.props.cardImageSource,
      alt: this.props.newsTitle
    });
  }
});

NewsCard = React.createClass({
  displayName: "NewsCard",
  rawMarkup: function(raw) {
    return {
      __html: raw
    };
  },
  componentDidMount: function() {
    var callback;
    callback = (function() {
      var height;
      height = this.refs[this.props.cardNumber].clientHeight;
      return this.props.myHeightIs(height, this.props.cardNumber);
    }).bind(this);
    return setTimeout(callback, 0);
  },
  render: function() {
    return DOM.div({
      className: "news-listing " + this.props.colClasses
    }, DOM.div({
      className: "thumbnail outer-wrapper-news-div",
      style: {
        minHeight: "0px"
      }
    }, DOM.div({
      className: "inner-wrapper-news-div",
      ref: this.props.cardNumber,
      style: {
        minHeight: this.props.minHeightOfInnerWrapper
      }
    }, DOM.a({
      className: "news-anchor-link-wrapper",
      href: this.props.cardBtnTarget
    }, this.props.cardImageSource !== "" ? React.createElement(Image, {
      cardImageSource: this.props.cardImageSource,
      newsTitle: this.props.newsTitle
    }) : void 0, DOM.div({
      className: "news-picture-overlay"
    })), DOM.div({
      className: "news-teaser-wrapper"
    }, DOM.a({
      href: this.props.cardBtnTarget
    }, DOM.h3({
      style: this.props.cardImageSource === "" ? {
        marginTop: 0
      } : void 0
    }, this.props.newsTitle)), DOM.div({
      className: "teaser",
      dangerouslySetInnerHTML: this.rawMarkup(this.props.newsTeaser)
    }))), DOM.p({
      className: "btn-container read-more-news-btn-container"
    }, DOM.a({
      href: this.props.cardBtnTarget,
      className: "btn btn-lg black-square-btn news-read-more-btn"
    }, this.props.localizedReadMore))));
  }
});

module.exports = {
  NewsCard: NewsCard
};;


},{}],3:[function(require,module,exports){
var NewsBtstpRow, NewsCardsContainer;

NewsBtstpRow = React.createClass({
  displayName: "NewsBtstpRow",
  render: function() {
    return DOM.div({
      className: "row "
    }, this.props.cards_for_row);
  }
});

NewsCardsContainer = React.createClass({
  displayName: "NewsCardsContainer",
  arrayBuilder: function(chunk_size) {
    var empty_div_height_array, i, j, ref, ref1;
    empty_div_height_array = [];
    for (i = j = 1, ref = this.props.domElements.length, ref1 = chunk_size; ref1 > 0 ? j <= ref : j >= ref; i = j += ref1) {
      empty_div_height_array.push(0);
    }
    return empty_div_height_array;
  },
  numberOfCardsByRow: function() {
    if (window.innerWidth >= 992) {
      return 3;
    } else if (window.innerWidth >= 768) {
      return 2;
    }
  },
  getInitialState: function() {
    return {
      cardByRows: this.numberOfCardsByRow(),
      heightOfRows: [],
      heightOfRowsByChunksOf: {
        2: this.arrayBuilder(2),
        3: this.arrayBuilder(3)
      },
      pending: true
    };
  },
  handleResize: function() {
    var cardByRows;
    cardByRows = this.numberOfCardsByRow();
    this.setState({
      cardByRows: cardByRows
    });
    return this.forceUpdate();
  },
  componentDidMount: function() {
    return window.addEventListener('resize', this.handleResize);
  },
  componentWillUnmount: function() {
    return window.removeEventListener('resize', this.handleResize);
  },
  storeDivHeight: function(height, card_index) {
    var heightOfRows;
    heightOfRows = this.state.heightOfRows;
    heightOfRows[card_index] = height;
    return this.setState({
      heightOfRows: heightOfRows
    });
  },
  inWhichRowIsTheCardByRowOf: function(number_of_cards_by_row, index) {
    var rindex, row;
    rindex = index + 1;
    return row = rindex % number_of_cards_by_row === 0 ? rindex / number_of_cards_by_row - 1 : Math.floor(rindex / number_of_cards_by_row);
  },
  setRequiredHeightOfRowsOnRender: function(card_index) {
    var height, heights_of_cards_in_same_row, j, len, my_row_index, required_min_height;
    my_row_index = this.inWhichRowIsTheCardByRowOf(this.state.cardByRows, card_index);
    heights_of_cards_in_same_row = this.state.heightOfRows.slice(my_row_index * 3, (my_row_index * 3) + 3);
    required_min_height = 0;
    for (j = 0, len = heights_of_cards_in_same_row.length; j < len; j++) {
      height = heights_of_cards_in_same_row[j];
      if (height > required_min_height) {
        required_min_height = height;
      }
    }
    return required_min_height;
  },
  createCards: function() {
    NewsCard = require('./news_card.js.coffee').NewsCard;
    var card, element, i, j, len, ref, required_min_height, results;
    ref = this.props.domElements;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      card = ref[i];
      if (this.state.heightOfRows.length === this.props.domElements.length) {
        required_min_height = this.setRequiredHeightOfRowsOnRender(i);
      } else {
        required_min_height = 0;
      }
      element = React.createElement(NewsCard, {
        key: i,
        newsTitle: card.title,
        newsTeaser: card.teaser,
        localizedReadMore: this.props.localizedReadMore,
        colClasses: this.props.colClasses,
        cardNumber: i,
        myHeightIs: this.storeDivHeight,
        minHeightOfInnerWrapper: required_min_height
      });
      results.push(element);
    }
    return results;
  },
  render: function() {
    var cards;
    cards = this.createCards();
    return DOM.div({
      className: "container-fluid"
    }, DOM.div({
      className: "row"
    }, cards));
  }
});

module.exports = {
  NewsCardsContainer: NewsCardsContainer
};;


},{"./news_card.js.coffee":2}],4:[function(require,module,exports){
var NewsIndexPage, ReactCSSTransitionGroup;

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

NewsIndexPage = React.createClass({
  displayName: "NewsIndexPage",
  render: function() {
    NewsCardsContainer = require('./news_cards_container.js.coffee').NewsCardsContainer;
    return DOM.div({
      className: "news-index-page-body"
    }, React.createElement(ReactCSSTransitionGroup, {
      transitionName: "react-news-container",
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300,
      transitionAppear: true,
      transitionAppearTimeout: 4000
    }, React.createElement(NewsCardsContainer, {
      domElements: this.props.articles,
      localizedReadMore: "Read more",
      colClasses: "col-xs-12 col-sm-6 col-md-4"
    })));
  }
});

module.exports = {
  NewsIndexPage: NewsIndexPage
};;


},{"./news_cards_container.js.coffee":3}]},{},[1]);
