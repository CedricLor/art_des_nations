import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  UPDATE_ARTICLE,
} from '../constants/ActionTypes';

import {normalize} from '../stores/storeCreationHelpers'

function localizedMediaContainers(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.mediaContainer.id]: action.mediaContainer
      });

    case DELETE_ARTICLE:
      return Object.assign({}, _.omit(state, action.mediaContainerIds));

    case UPDATE_ARTICLE:
      return Object.assign({}, state, normalize(action.mediaContainers));

    default:
      return state;
  }
}

export function mediaContainers(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.mediaContainers;

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.mediaContainers);

    case UPDATE_ARTICLE:
      return Object.assign({}, state, {
        [action.locale]: localizedMediaContainers(state[action.locale], action)
      });

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
      const newState = {};
      _.forOwn(state, (localeMediaContainersObjects, locale) => newState[locale] = localizedMediaContainers(state[locale], action));
      return Object.assign({}, state, newState);

    default:
      return state;
  }
}
