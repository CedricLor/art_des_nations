import { initialArticlesDOMPropsState } from '../reducers/reducersConstants'

function createAncillaryStatesForArticles(articles, locale) {
  const [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps] = [{}, {}, {}, {}];

  _.forEach(articles, (article) => {
    const articleId = article.id;
    [initialWIPStates[articleId], initialEditStates[articleId]] = [{}, { 'article': false }];
    [articlesNeedResizingStates[articleId], articlesDOMProps[articleId]] = [false, initialArticlesDOMPropsState];

    for (let fieldName in article) {
      if (fieldName !== 'id') {
        [initialWIPStates[articleId][fieldName], initialEditStates[articleId][fieldName]] = [false, false];
      }
    };
  })

  return [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps]
}

export function normalize(jsonFetchedAncillaryData) {
  return _.keyBy(jsonFetchedAncillaryData, 'id');
}

function normalizeRoot(dataToNormalize) {
  const [dataByKey, dataIdArray] = [{}, []]
  _.forEach(dataToNormalize, (value, key) => {
    dataByKey[value.id] = value;
    dataIdArray.push(value.id)
  })
  return [dataByKey, dataIdArray]
}

export function createArticleStates(jsonFetchedArticlesAndEmbeddedData, locale) {
  const articles = jsonFetchedArticlesAndEmbeddedData.articles;
  const [articlesByKey, articlesIdArray] = normalizeRoot(articles);
  const [
    articlesWIPStatesOfFields,
    articlesEditStates,
    articlesNeedResizingStates,
    articlesDOMProps
    ] = createAncillaryStatesForArticles(
      articles,
      locale);
  const mediaContainers = normalize(jsonFetchedArticlesAndEmbeddedData.media_containers);
  const articlePictures = normalize(jsonFetchedArticlesAndEmbeddedData.article_pictures);

  const articlesState = Object.assign({
    articles: {},
    articlesWIPStatesOfFields: {},
    articlesEditStates: {},
    articlesNeedResizingStates: {},
    articlesDOMProps: {},
    articlePictures: {},
    mediaContainers: {}
  });

  articlesState.articles[locale] =                   articles;
  articlesState.articlesWIPStatesOfFields[locale] =  articlesWIPStatesOfFields;
  articlesState.articlesEditStates[locale] =         articlesEditStates;
  articlesState.articlesNeedResizingStates[locale] = articlesNeedResizingStates;
  articlesState.articlesDOMProps[locale] =           articlesDOMProps;
  articlesState.mediaContainers[locale] =            mediaContainers;
  articlesState.articlePictures[locale] =            articlePictures;

  return articlesState;
}
