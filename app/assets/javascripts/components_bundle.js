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


},{"./components/news_index_page.js.coffee":5}],2:[function(require,module,exports){
var ArticleForm;

ArticleForm = React.createClass({
  handleChange: function(e) {
    return this.props.new_article.article_form_functions.handleChangeInFieldsOfNewArticle(e);
  },
  handleSubmit: function(e) {
    e.preventDefault();
    return this.props.new_article.article_form_functions.handleSubmitNewArticle();
  },
  valid: function() {
    return this.props.new_article.article_data.title && this.props.new_article.article_data.teaser && this.props.new_article.article_data.body;
  },
  render: function() {
    return React.DOM.form({
      className: 'form-inline',
      onSubmit: this.handleSubmit
    }, React.DOM.div({
      className: 'form-group'
    }, React.DOM.input({
      type: 'text',
      className: 'form-control',
      placeholder: 'Title',
      name: 'title',
      value: this.props.new_article.article_data.title,
      onChange: this.handleChange
    })), React.DOM.div({
      className: 'form-group'
    }, React.DOM.input({
      type: 'text',
      className: 'form-control',
      placeholder: 'Teaser',
      name: 'teaser',
      value: this.props.new_article.article_data.teaser,
      onChange: this.handleChange
    })), React.DOM.div({
      className: 'form-group'
    }, React.DOM.input({
      type: 'text',
      className: 'form-control',
      placeholder: 'Body',
      name: 'body',
      value: this.props.new_article.article_data.body,
      onChange: this.handleChange
    })), React.DOM.button({
      type: 'submit',
      className: 'btn btn-primary',
      disabled: !this.valid()
    }, 'Create article'));
  }
});

module.exports = {
  ArticleForm: ArticleForm
};;


},{}],3:[function(require,module,exports){
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
  getInitialState: function() {
    return {
      edit: false
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
  handleDelete: function(e) {
    e.preventDefault();
    return this.props.admin_functions.destroy["function"](this.props.card);
  },
  handleToggle: function(e) {
    e.preventDefault();
    return this.props.admin_functions.toggle_edit["function"](this.props.card.id);
  },
  handleUpdate: function(e) {
    e.preventDefault();
    return this.props.admin_functions.update["function"](this.refs, this.props.card);
  },
  toolbar_on_read_only: function() {
    return DOM.div({
      className: "news-toolbar"
    }, DOM.a({
      className: 'btn btn-danger',
      onClick: this.handleDelete
    }, this.props.admin_functions.destroy.text), React.DOM.a({
      className: 'btn btn-default',
      onClick: this.handleToggle
    }, this.props.admin_functions.edit.text));
  },
  toolbar_on_edit: function() {
    return DOM.div({
      className: "news-toolbar"
    }, React.DOM.a({
      className: 'btn btn-default',
      onClick: this.handleToggle
    }, "Cancel"), DOM.a({
      className: 'btn btn-danger',
      onClick: this.handleUpdate
    }, "Update"));
  },
  title_editable: function() {
    return React.DOM.input({
      key: 'title_editable',
      className: 'form-control',
      type: 'text',
      defaultValue: this.props.card.title,
      ref: 'title'
    });
  },
  title_read_only: function() {
    return DOM.a({
      key: 'title_read_only',
      href: this.props.cardBtnTarget
    }, DOM.h3({
      style: this.props.cardImageSource === "" ? {
        marginTop: 0
      } : void 0
    }, this.props.card.title));
  },
  teaser_editable: function() {
    return React.DOM.input({
      key: 'teaser_editable',
      className: 'form-control',
      type: 'text',
      defaultValue: this.props.card.teaser,
      ref: 'teaser'
    });
  },
  teaser_read_only: function() {
    return DOM.div({
      key: 'teaser_read_only',
      className: "teaser",
      dangerouslySetInnerHTML: this.rawMarkup(this.props.card.teaser)
    });
  },
  render: function() {
    return DOM.div({
      className: "news-listing " + this.props.colClasses
    }, DOM.div({
      className: "thumbnail outer-wrapper-news-div",
      style: {
        minHeight: "0px"
      }
    }, this.props.passedInStates.edit ? this.toolbar_on_edit() : this.toolbar_on_read_only(), DOM.div({
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
    }, this.props.passedInStates.edit ? [this.title_editable(), this.teaser_editable()] : [this.title_read_only(), this.teaser_read_only()])), DOM.p({
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


},{}],4:[function(require,module,exports){
var NewsBtstpRow, NewsCardsContainer;

NewsBtstpRow = React.createClass({
  displayName: "NewsBtstpRow",
  render: function() {
    return DOM.div({
      className: "row"
    }, this.props.cards_for_row);
  }
});

NewsCardsContainer = React.createClass({
  displayName: "NewsCardsContainer",
  createCards: function() {
    NewsCard = require('./news_card.js.coffee').NewsCard;
    var card, element, i, j, len, ref, required_min_height, results;
    ref = this.props.domElements.data;
    results = [];
    for (i = j = 0, len = ref.length; j < len; i = ++j) {
      card = ref[i];
      if (this.props.div_equalization_params.heightOfRows.length === this.props.domElements.data.length) {
        required_min_height = this.props.div_equalization_params.setRequiredHeightOfRowsOnRender(i);
      } else {
        required_min_height = 0;
      }
      element = React.createElement(NewsCard, {
        key: i,
        card: card,
        localizedReadMore: this.props.localizedReadMore,
        colClasses: this.props.colClasses,
        cardNumber: i,
        myHeightIs: this.props.div_equalization_params.storeDivHeight,
        minHeightOfInnerWrapper: required_min_height,
        admin_functions: this.props.domElements.admin_functions,
        passedInStates: this.props.domElements.articles_states[card.id]
      });
      results.push(element);
    }
    return results;
  },
  render: function() {
    var cards;
    cards = this.createCards();
    ArticleForm = require('./article_form.js.coffee').ArticleForm;
    return DOM.div({
      className: "container-fluid"
    }, DOM.div({
      className: "row"
    }, DOM.div({
      className: "col-xs-12"
    }, React.createElement(ArticleForm, {
      new_article: this.props.new_article
    }))), React.DOM.hr(null), DOM.div({
      className: "row"
    }, cards));
  }
});

module.exports = {
  NewsCardsContainer: NewsCardsContainer
};;


},{"./article_form.js.coffee":2,"./news_card.js.coffee":3}],5:[function(require,module,exports){
var NewsIndexPage, ReactCSSTransitionGroup;

ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

NewsIndexPage = React.createClass({
  displayName: "NewsIndexPage",
  getInitialState: function() {
    return {
      articles: {
        data: this.props.articles,
        admin_functions: {
          destroy: {
            text: "Delete",
            "function": this.handleDeleteArticle
          },
          edit: {
            text: "Edit"
          },
          update: {
            text: "Update",
            "function": this.handleUpdateArticle
          },
          toggle_edit: {
            "function": this.handleToggleEditArticle
          }
        },
        articles_states: this.initialStates()
      },
      new_article: this.blankNewArticle(),
      div_equalization_params: this.divEqualizationParams()
    };
  },
  deleteArticle: function(article) {
    var articles, index;
    index = this.state.articles.data.indexOf(article);
    articles = React.addons.update(this.state.articles, {
      data: {
        $splice: [[index, 1]]
      }
    });
    delete articles.articles_states[article.id];
    console.log(articles);
    return this.setState({
      articles: articles
    });
  },
  handleDeleteArticle: function(article) {
    return $.ajax({
      method: 'DELETE',
      url: "/articles/" + article.id,
      dataType: 'JSON',
      success: (function(_this) {
        return function() {
          return _this.deleteArticle(article);
        };
      })(this)
    });
  },
  updateArticle: function(article, data) {
    var articles, index;
    index = this.state.articles.data.indexOf(article);
    articles = React.addons.update(this.state.articles, {
      data: {
        $splice: [[index, 1, data]]
      }
    });
    return this.setState({
      articles: articles
    });
  },
  handleUpdateArticle: function(refs, article) {
    var data;
    data = {
      title: ReactDOM.findDOMNode(refs.title).value,
      teaser: ReactDOM.findDOMNode(refs.teaser).value
    };
    return $.ajax({
      method: 'PUT',
      url: "/articles/" + article.id,
      dataType: 'JSON',
      data: {
        article: data
      },
      success: (function(_this) {
        return function(data) {
          var articles;
          articles = _this.state.articles;
          articles.articles_states[article.id].edit = false;
          _this.setState({
            articles: articles
          });
          return _this.updateArticle(article, data);
        };
      })(this)
    });
  },
  initialStates: function() {
    var article, hash, j, len, ref;
    hash = {};
    ref = this.props.articles;
    for (j = 0, len = ref.length; j < len; j++) {
      article = ref[j];
      hash[article.id] = {
        edit: false,
        resized: false
      };
    }
    return hash;
  },
  handleToggleEditArticle: function(article_id) {
    var articles;
    articles = this.state.articles;
    articles.articles_states[article_id].edit = !articles.articles_states[article_id].edit;
    return this.setState({
      articles: articles
    });
  },
  blankNewArticle: function() {
    return {
      article_data: {
        title: '',
        teaser: '',
        body: ''
      },
      article_form_functions: {
        handleSubmitNewArticle: this.handleSubmitNewArticle,
        handleChangeInFieldsOfNewArticle: this.handleChangeInFieldsOfNewArticle
      }
    };
  },
  createBlankNewArticle: function() {
    var blank_article;
    blank_article = this.blankNewArticle();
    return this.setState({
      new_article: blank_article
    });
  },
  addNewArticle: function(article) {
    var articles;
    articles = React.addons.update(this.state.articles, {
      data: {
        $unshift: [article]
      }
    });
    articles.articles_states[article.id] = {
      edit: false,
      resized: false
    };
    return this.setState({
      articles: articles
    });
  },
  handleSubmitNewArticle: function() {
    return $.post('', {
      article: this.state.new_article.article_data
    }, (function(_this) {
      return function(data) {
        _this.addNewArticle(data);
        return _this.createBlankNewArticle();
      };
    })(this), 'JSON');
  },
  handleChangeInFieldsOfNewArticle: function(e) {
    var new_article;
    new_article = this.state.new_article;
    new_article.article_data[e.target.name] = e.target.value;
    return this.setState({
      new_article: new_article
    });
  },
  divEqualizationParams: function() {
    return {
      cardByRows: this.numberOfCardsByRow(),
      heightOfRows: [],
      heightOfRowsByChunksOf: {
        2: this.arrayBuilder(2),
        3: this.arrayBuilder(3)
      },
      setRequiredHeightOfRowsOnRender: this.setRequiredHeightOfRowsOnRender,
      storeDivHeight: this.storeDivHeight
    };
  },
  arrayBuilder: function(chunk_size) {
    var empty_div_height_array, i, j, ref, ref1;
    empty_div_height_array = [];
    for (i = j = 1, ref = this.props.articles, ref1 = chunk_size; ref1 > 0 ? j <= ref : j >= ref; i = j += ref1) {
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
  handleResize: function() {
    var div_equalization_params;
    div_equalization_params = this.state.div_equalization_params;
    div_equalization_params.cardByRows = this.numberOfCardsByRow();
    this.setState({
      div_equalization_params: div_equalization_params
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
    var div_equalization_params;
    div_equalization_params = this.state.div_equalization_params;
    div_equalization_params.heightOfRows[card_index] = height;
    return this.setState({
      div_equalization_params: div_equalization_params
    });
  },
  inWhichRowIsTheCardByRowOf: function(number_of_cards_by_row, index) {
    var rindex, row;
    rindex = index + 1;
    return row = rindex % number_of_cards_by_row === 0 ? rindex / number_of_cards_by_row - 1 : Math.floor(rindex / number_of_cards_by_row);
  },
  setRequiredHeightOfRowsOnRender: function(card_index) {
    var height, heights_of_cards_in_same_row, j, len, my_row_index, required_min_height;
    my_row_index = this.inWhichRowIsTheCardByRowOf(this.state.div_equalization_params.cardByRows, card_index);
    heights_of_cards_in_same_row = this.state.div_equalization_params.heightOfRows.slice(my_row_index * this.state.div_equalization_params.cardByRows, (my_row_index * this.state.div_equalization_params.cardByRows) + this.state.div_equalization_params.cardByRows);
    required_min_height = 0;
    for (j = 0, len = heights_of_cards_in_same_row.length; j < len; j++) {
      height = heights_of_cards_in_same_row[j];
      if (height > required_min_height) {
        required_min_height = height;
      }
    }
    return required_min_height;
  },
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
      domElements: this.state.articles,
      localizedReadMore: "Read more",
      colClasses: "col-xs-12 col-sm-6 col-md-4",
      new_article: this.state.new_article,
      div_equalization_params: this.state.div_equalization_params
    })));
  }
});

module.exports = {
  NewsIndexPage: NewsIndexPage
};;


},{"./news_cards_container.js.coffee":4}]},{},[1]);
