import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './reactredux/containers/App'
import rootReducer from './reactredux/reducers/reducers'

window.renderCallback = function(jsonFetchedArticles) {
  // ReactDOM.render(
  //   <NewsIndexPage articles={jsonFetchedArticles} />,
  //   document.getElementById('react-target')
  // );
  let store = createStore(rootReducer, {articles: jsonFetchedArticles})

  let rootElement = document.getElementById('react-target')
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  )
}

$.ajax({
  method: "GET",
  url: "/articles",
  dataType: 'JSON'
})
  .success(function( data ) {
    renderCallback(data);
  });
