import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  ADD_NEW_ARTICLE,
  DELETE_ARTICLE,
  MARK_MEDIA_CONTAINER_AND_ARTICLE_PICTURE_FOR_DELETION,
} from '../constants/ActionTypes'

function mediaContainer(state = {}, action) {
  switch (action.type) {

    default:
      return state
  }
}

export function mediaContainers(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.mediaContainers

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.mediaContainers)

    case ADD_NEW_ARTICLE:
      const newStateForNewArticle = Object.assign({}, state)
      _.forOwn(newStateForNewArticle, (localeMediaContainersObjects, locale) => {newStateForNewArticle[locale][action.mediaContainer.id] = action.mediaContainer})
      return newStateForNewArticle

    case DELETE_ARTICLE:
      const newStateForDeleteArticle = Object.assign({}, state)
      _.forEach(action.mediaContainerIds, (mediaContainerId) => {
        _.forOwn(newStateForDeleteArticle, (localeMediaContainersObjects, locale) => {delete newStateForDeleteArticle[locale][action.mediaContainerId]})
      })
      return newStateForDeleteArticle

    case MARK_MEDIA_CONTAINER_AND_ARTICLE_PICTURE_FOR_DELETION:
      const newStateAfterMarkingForDeletion = Object.assign({}, state)
      delete newStateAfterMarkingForDeletion[action.locale][action.articlePictureId].stored_file_id
      return newStateAfterMarkingForDeletion

    default:
      return state
  }
}
