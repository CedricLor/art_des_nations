import { ArticlesVisibilityFilters } from '../constants/ActionTypes'


// Selector of the articles depending on the requested visibility status
export function selectArticlesOnLanguage(articles, locale) {
  return articles[locale]
}

// Selector of the article pictures depending on the requested visibility status
export function selectArticlePicturesOnLanguage(articlePictures, locale) {
  return articlePictures[locale]
}

// Selector of the articles depending on the requested visibility status
export function selectArticlesAndArticlePicturesOnVisibilityStatus(articles, filter) {
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
    default:
      return articles
  }
}

// Selector of the articles ancillary states based on the selected articles (i) locales and (ii) visibility status
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
