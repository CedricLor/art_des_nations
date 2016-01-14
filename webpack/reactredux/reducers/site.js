import { TOGGLE_SITE_EDIT_MODE } from '../constants/ActionTypes'

export function siteEditMode(state = { mode: false }, action) {
  switch (action.type) {
    case TOGGLE_SITE_EDIT_MODE:
      return Object.assign({}, state, { mode: !state.mode })
    default:
      return state
  }
}

import { initialSiteAvailableLocales } from './reducersConstants'

export function siteAvailableLocales(state = initialSiteAvailableLocales, action) {
  return state
}

import { UPDATE_PATH } from 'redux-simple-router'

export function siteCurrentLocale(state = "fr", action) {
  switch (action.type) {
    case UPDATE_PATH:
      if ( action.payload.path.match(/^\/(fr|en|ru|zh)\//) !== null ) {
        return action.payload.path.match(/^\/(fr|en|ru|zh)\//)[1]
      } else {
        return state
      }
    default:
      return state
  }
}

import { initialSiteLanguageSwitcherTextState } from './reducersConstants'

export function siteLanguageSwitcherText(state = initialSiteLanguageSwitcherTextState, action) {
  return state
}
