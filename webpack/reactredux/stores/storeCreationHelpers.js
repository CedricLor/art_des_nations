import { initialArticlesDOMPropsState } from '../reducers/reducersConstants'

function createAncillaryStatesForArticles(jsonFetchedArticles, locale) {
  const [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps] = [{}, {}, {}, {}];

  for (let article of jsonFetchedArticles) {
    const articleId = article.id;
    [initialWIPStates[articleId], initialEditStates[articleId]] = [{}, { 'article': false }];
    [articlesNeedResizingStates[articleId], articlesDOMProps[articleId]] = [false, initialArticlesDOMPropsState];

    for (let fieldName in article) {
      if (fieldName != 'id' && fieldName != 'created_at' && fieldName != 'updated_at') {
        [initialWIPStates[articleId][fieldName], initialEditStates[articleId][fieldName]] = [false, false];
      }
    };

  };

  return [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps]
}

export function createArticleStates(jsonFetchedArticles, locale) {
  const [articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps] = createAncillaryStatesForArticles(jsonFetchedArticles, locale);

  const articlesState = Object.assign({
    articles: {},
    articlesWIPStatesOfFields: {},
    articlesEditStates: {},
    articlesNeedResizingStates: {},
    articlesDOMProps: {}
  });

  articlesState.articles[locale] =                   jsonFetchedArticles;
  articlesState.articlesWIPStatesOfFields[locale] =  articlesWIPStatesOfFields;
  articlesState.articlesEditStates[locale] =         articlesEditStates;
  articlesState.articlesNeedResizingStates[locale] = articlesNeedResizingStates;
  articlesState.articlesDOMProps[locale] =           articlesDOMProps;

  return articlesState;
}
