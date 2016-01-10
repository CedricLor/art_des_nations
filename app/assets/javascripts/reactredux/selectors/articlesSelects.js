import { ArticlesVisibilityFilters } from '../constants/ActionTypes'


export function selectArticles(articles, filter) {
  switch (filter) {
    case ArticlesVisibilityFilters.SHOW_ALL:
      return articles
    case ArticlesVisibilityFilters.SHOW_DRAFT:
      return articles.filter(article => article.status === "draft")
    case ArticlesVisibilityFilters.SHOW_PUBLISHED:
      return articles.filter(article => article.status === "published" || article.status === "featured")
    case ArticlesVisibilityFilters.SHOW_FEATURED:
      return articles.filter(article => article.status === "featured")
    case ArticlesVisibilityFilters.SHOW_ARCHIVED:
      return articles.filter(article => article.status === "archived")
  }
}

export function selectVisibleArticlesStates(visibleArticles, articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps) {
  const visibleArticlesStates = {
    "articlesWIPStatesOfFields": {},
    "articlesEditStates": {},
    "articlesNeedResizingStates": {},
    "articlesDOMProps": {}
  }
  _.forEach(visibleArticles, (article) => {
    visibleArticlesStates["articlesWIPStatesOfFields"][article.id] = articlesWIPStatesOfFields[article.id];
    visibleArticlesStates["articlesEditStates"][article.id] = articlesEditStates[article.id];
    visibleArticlesStates["articlesNeedResizingStates"][article.id] = articlesNeedResizingStates[article.id];
    visibleArticlesStates["articlesDOMProps"][article.id] = articlesDOMProps[article.id];
  })
  return visibleArticlesStates;
}
