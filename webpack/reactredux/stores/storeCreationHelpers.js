import { initialArticlesDOMPropsState } from '../reducers/reducersConstants'


function createInitialWIPAndEditStatesForArticles(jsonFetchedArticles) {
  const [initialWIPStates, initialEditStates] = [{}, {}];

  for (let article of jsonFetchedArticles) {
    [initialWIPStates[article.id], initialEditStates[article.id]] = [{}, { 'article': false }];

    for (let fieldName in article) {
      if (fieldName != 'id' && fieldName != 'created_at' && fieldName != 'updated_at') {
        [initialWIPStates[article.id][fieldName], initialEditStates[article.id][fieldName]] = [false, false];
      }
    };

  };

  return [initialWIPStates, initialEditStates]
}

function createInitialNeedResizingAndDOMPropsStatesOfArticles(jsonFetchedArticlesIds) {
  const [articlesNeedResizingStates, articlesDOMProps] = [{}, {}]

  for (let articleId of jsonFetchedArticlesIds) {
    [articlesNeedResizingStates[articleId], articlesDOMProps[articleId]] = [false, initialArticlesDOMPropsState];
  }

  return [articlesNeedResizingStates, articlesDOMProps]
}

export function createInitialState(jsonFetchedArticles) {
  const [initialArticlesWIPStatesOfFields, initialArticlesEditStates] = createInitialWIPAndEditStatesForArticles(jsonFetchedArticles);
  const jsonFetchedArticlesIds = _.map(jsonFetchedArticles, function(value){ return value.id });
  const [initialArticlesNeedResizingStates, initialArticlesDOMProps] = createInitialNeedResizingAndDOMPropsStatesOfArticles(jsonFetchedArticlesIds);

  const initialState = {
    articles:                     jsonFetchedArticles,
    articlesWIPStatesOfFields:    initialArticlesWIPStatesOfFields,
    articlesEditStates:           initialArticlesEditStates,
    articlesNeedResizingStates:   initialArticlesNeedResizingStates,
    articlesDOMProps:             initialArticlesDOMProps
  }

  return initialState;
}
