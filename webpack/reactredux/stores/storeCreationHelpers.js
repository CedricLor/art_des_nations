import { initialArticlesDOMPropsState } from '../reducers/reducersConstants'

function createAncillaryStatesForArticles(articles, locale) {
  const [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps] = [{}, {}, {}, {}];

  _.forEach(articles, (article) => {
    const articleId = article.id;
    [initialWIPStates[articleId], initialEditStates[articleId]] = [{}, { 'article': false }];
    [articlesNeedResizingStates[articleId], articlesDOMProps[articleId]] = [false, initialArticlesDOMPropsState];

    for (let fieldName in article) {
      // FIXME article_picture_ids should have an edit state and a WIP state
      // but for the moment, let's keep them away from this logic
      if (fieldName != 'id' && fieldName != 'article_picture_ids') {
        [initialWIPStates[articleId][fieldName], initialEditStates[articleId][fieldName]] = [false, false];
      }
    };
  })

  return [initialWIPStates, initialEditStates, articlesNeedResizingStates, articlesDOMProps]
}

function normalize(jsonFetchedAncillaryData) {
  // FIXME indexBy will be renamed keyBy in the latest version of lodash
  // FIXME ancillary tables will need to be localized
  return _.indexBy(jsonFetchedAncillaryData, 'id');
}

export function createArticleStates(jsonFetchedArticlesAndEmbeddedData, locale) {
  const articles = jsonFetchedArticlesAndEmbeddedData.articles;
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
