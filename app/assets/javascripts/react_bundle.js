(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var NewsIndexPage = require('./components/news_index_page.js.coffee').NewsIndexPage;

},{"./components/news_index_page.js.coffee":2}],2:[function(require,module,exports){
var Card, CardContainer, ClearFix, DOM, Image, NewsIndexPage, ReactCSSTransitionGroup, rawMarkup,
  modulo = function(a, b) { return (+a % (b = +b) + b) % b; };

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

DOM = React.DOM;

NewsIndexPage = React.createClass({
  displayName: "NewsContainer",
  render: function() {
    var card_container, card_container_with_transition;
    card_container = React.createElement(CardContainer, {
      domElements: this.props.articles,
      localizedReadMore: "Read more",
      colClasses: "col-xs-12 col-sm-6 col-md-4",
      clearFixClassesForTwoCards: "visible-sm",
      clearFixClassesForThreeCards: "hidden-sm hidden-xs",
      clearFixClassesForFourCards: "hidden-md hidden-sm hidden-xs"
    });
    card_container_with_transition = React.createElement(ReactCSSTransitionGroup, {
      transitionName: "react-news-container",
      transitionEnterTimeout: 300,
      transitionLeaveTimeout: 300,
      transitionAppear: true,
      transitionAppearTimeout: 4000
    }, card_container);
    return DOM.div({
      className: "fluid-container"
    }, card_container_with_transition);
  }
});

rawMarkup = function(raw) {
  return {
    __html: raw
  };
};

ClearFix = React.createClass({
  displayName: "ClearFix",
  render: function() {
    return DOM.div({
      className: "clearfix " + this.props.clearFixClasses,
      dangerouslySetInnerHTML: rawMarkup("&nbsp;")
    });
  }
});

Image = React.createClass({
  displayName: "Image",
  render: function() {
    return DOM.img({
      src: this.props.cardImageSource,
      alt: this.props.newsTitle
    });
  }
});

Card = React.createClass({
  displayName: "Card",
  componentDidMount: function() {
    var callback;
    callback = (function() {
      var height;
      height = this.refs[this.props.cardNumber].clientHeight;
      return this.props.myHeightIs(height, this.props.cardNumber);
    }).bind(this);
    return setTimeout(callback, 0);
  },
  rawMarkup: function(raw) {
    return {
      __html: raw
    };
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

CardContainer = React.createClass({
  displayName: "CardContainer",
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
    this.setState({
      cardByRows: this.numberOfCardsByRow()
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
  createClearFix: function(i) {
    var clearFixLg, clearFixMd, clearFixSm;
    if (this.props.clearFixClassesForTwoCards && modulo(i, 2) === 0) {
      clearFixSm = React.createElement(ClearFix, {
        key: "clear-fix-sm-" + i,
        clearFixClasses: this.props.clearFixClassesForTwoCards
      });
    }
    if (this.props.clearFixClassesForThreeCards && modulo(i, 3) === 0) {
      clearFixMd = React.createElement(ClearFix, {
        key: "clear-fix-md-" + i,
        clearFixClasses: this.props.clearFixClassesForThreeCards
      });
    }
    if (this.props.clearFixClassesForFourCards && modulo(i, 4) === 0) {
      console.log("hello");
      clearFixLg = React.createElement(ClearFix, {
        key: "clear-fix-lg-" + i,
        clearFixClasses: this.props.clearFixClassesForFourCards
      });
    }
    return [clearFixSm, clearFixMd, clearFixLg];
  },
  createCards: function() {
    var card, clearfix, element, i, j, len, ref, required_min_height, results;
    ref = this.props.domElements;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      card = ref[i];
      if (this.state.heightOfRows.length === this.props.domElements.length) {
        required_min_height = this.setRequiredHeightOfRowsOnRender(i);
      } else {
        required_min_height = 0;
      }
      element = React.createElement(Card, {
        key: i,
        newsTitle: card.title,
        newsTeaser: card.teaser,
        localizedReadMore: this.props.localizedReadMore,
        cardNumber: i,
        colClasses: this.props.colClasses,
        myHeightIs: this.storeDivHeight,
        minHeightOfInnerWrapper: required_min_height
      });
      clearfix = this.createClearFix(i + 1);
      results.push([element, clearfix]);
    }
    return results;
  },
  render: function() {
    var cards;
    if (this.state.heightOfRows.length === this.props.domElements.length && this.state.pending === true) {
      this.setRequiredHeightsOfAllTheRows;
    }
    cards = this.createCards();
    return DOM.div({
      className: "row"
    }, cards);
  }
});

module.exports = {
  NewIndexPage: NewsIndexPage
};;


},{}]},{},[1]);
