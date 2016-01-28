import { createSelector } from 'reselect'
import { selectMediaContainersOnLanguage } from './mediaContainersSelects'

import { siteCurrentLocaleSelector, mediaContainersSelector } from './inputSelectors'

const localeMediaContainersSelector = createSelector(
  siteCurrentLocaleSelector,
  mediaContainersSelector,
  (siteCurrentLocale, mediaContainersStates) => {
    return selectMediaContainersOnLanguage(mediaContainersStates, siteCurrentLocale)
  }
)

export default localeMediaContainersSelector
