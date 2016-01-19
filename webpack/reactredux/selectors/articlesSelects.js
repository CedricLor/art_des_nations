import { ArticlesVisibilityFilters } from '../constants/ActionTypes'


export function selectArticlesOnLanguage(articles, locale) {
  return articles[locale]
}


export function selectArticlesOnVisibilityStatus(articles, filter) {
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

export function selectVisibleArticlesStates(visibleArticles, siteCurrentLocale, articlesWIPStatesOfFields, articlesEditStates, articlesNeedResizingStates, articlesDOMProps) {
  const visibleArticlesStates = {
    "articlesWIPStatesOfFields": {},
    "articlesEditStates": {},
    "articlesNeedResizingStates": {},
    "articlesDOMProps": {}
  }
  _.forEach(visibleArticles, (article) => {
    visibleArticlesStates["articlesWIPStatesOfFields"][article.id] =   articlesWIPStatesOfFields[siteCurrentLocale][article.id];
    visibleArticlesStates["articlesEditStates"][article.id] =          articlesEditStates[siteCurrentLocale][article.id];
    visibleArticlesStates["articlesNeedResizingStates"][article.id] =  articlesNeedResizingStates[siteCurrentLocale][article.id];
    visibleArticlesStates["articlesDOMProps"][article.id] =            articlesDOMProps[siteCurrentLocale][article.id];
  })
  return visibleArticlesStates;
}
