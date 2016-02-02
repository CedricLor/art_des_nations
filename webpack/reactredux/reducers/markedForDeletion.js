import {
  MARK_MEDIA_CONTAINER_AND_ARTICLE_PICTURE_FOR_DELETION,
   } from '../constants/ActionTypes'

export function articlePictures(state = [], action) {
  switch (action.type) {
    case MARK_MEDIA_CONTAINER_AND_ARTICLE_PICTURE_FOR_DELETION:
      return [...state, action.articlePictureId]

    default:
      return state
  }
}

export function mediaContainers(state = [], action) {
  switch (action.type) {
    case MARK_MEDIA_CONTAINER_AND_ARTICLE_PICTURE_FOR_DELETION:
      return [...state, action.mediaContainerId]

    default:
      return state
  }
}
