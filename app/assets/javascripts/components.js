$(function() {
  window.React = require('react');
  window.ReactDOM = require('react-dom');

  window.NewsIndexPage = require('./reactredux/components/news_index_page.js.coffee').NewsIndexPage;

  window.renderCallback = function(jsonFetchedArticles) {
    ReactDOM.render(
      <NewsIndexPage articles={jsonFetchedArticles} />,
      document.getElementById('react-target')
    );
  }

  $.ajax({
    method: "GET",
    url: "/articles",
    dataType: 'JSON'
  })
    .success(function( data ) {
      renderCallback(data);
    });

});

