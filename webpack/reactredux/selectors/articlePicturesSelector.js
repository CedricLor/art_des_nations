import { createSelector } from 'reselect'
import { selectArticlePicturesOnLanguage } from './articlePicturesSelects'

import { siteCurrentLocaleSelector, articlePicturesSelector } from './inputSelectors'

const localeArticlePicturesSelector = createSelector(
  siteCurrentLocaleSelector,
  articlePicturesSelector,
  (siteCurrentLocale, articlePictures) => {
    return selectArticlePicturesOnLanguage(articlePictures, siteCurrentLocale)
  }
)

export default localeArticlePicturesSelector
