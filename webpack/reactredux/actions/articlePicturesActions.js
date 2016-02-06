import {
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
  MARK_ARTICLE_PICTURE_FOR_DELETION,
} from '../constants/ActionTypes'

import {changeWIPStateOfFieldOfArticle} from './articleFieldsActions'

function storedFileIdCreator(getState) {
  let storedFileId = 0
  const storedFiles = getState().storedFiles;
  if (storedFiles) {
    _.forOwn(storedFiles, (value, key) => {
      const keyNum = parseInt(key)
      if (keyNum >= storedFileId) {
        storedFileId = keyNum + 1
      }
    })
  }
  return storedFileId
}

export function createAdditionalArticlePicture(locale, articleId, forCard, forCarousel, file) {
  /* Meta-programming
  Actions -> store
  1. change WIP state of field of article on the article_picture_ids field
  2. create a file object in the store to store the new file (a storedFile) with its own id
  3. create new articlePicture object with a stored_file_id field and no media_container_id field
  4. amend the article_picture_ids field of the article to add the reference to the new articlePicture object
  Views
  4. display the file (associated with the articlePicture) instead of the mediaContainer
  5. amend the connected component which parses the articlePictures to fetch the relevant mediaContainers and have a switch
  that detects whether the articlePicture refers to a mediaContainer or to a storedFile
  On save
  1. retrieve the updated values for (i) the article, (ii) the articlePictures and (iii) the mediaContainers
  2. append a mediaContainer to the collection of mediaContainers
  3. update the newly created articlePicture id as the case may be
  4. create a field media_container_id in articlePicture with the reference to the correct mediaContainer
  5. delete the storedFile
  6. delete stored_file_id in the articlePicture
  7. switch off the WIP state of field of article on the article_picture_ids field
  */
  return function (dispatch, getState) {

    const storedFileId = storedFileIdCreator(getState);
    let articlePictureId = 0;
    _.forOwn(getState().articlePictures[locale], (value, key) => {
      const keyNum = parseInt(key);
      if (keyNum >= articlePictureId) { articlePictureId = parseInt(key) + 100 }
    })

    dispatch(changeWIPStateOfFieldOfArticle(articleId, 'article_picture_ids', true, locale));
    dispatch(createNewFileObjectInStoreAndNewArticlePicture(articleId, articlePictureId, storedFileId, file, forCard, forCarousel, locale))
  }
}

// function promiseToCreateANewFileObject(file) {
//   return function(dispatch, getState) {
//     dispatch(createNewFileObjectInStore(file))
//     return Promise.resolve();
//   }
// }

function createNewFileObjectInStoreAndNewArticlePicture(articleId, articlePictureId, storedFileId, file, forCard, forCarousel, locale) {
  return {
    type: ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
    articleId,
    storedFileId,
    articlePictureId,
    file,
    forCard,
    forCarousel,
    locale
  }
}

// function createNewArticlePictureObjectForStoredFile(articlePictureId, storedFileId, forCard, forCarousel) {
//   return {
//     type: CREATE_NEW_ARTICLE_PICTURE_OBJECT,
//     articlePictureId,
//     storedFileId,
//     forCard,
//     forCarousel
//   }
// }

// function addNewArticlePictureIdToArticlePictureIdsOfArticle(articleId, articlePictureId, locale) {
//   return {
//     type: ADD_NEW_ARTICLE_PICTURE_ID_TO_ARTICLE_PICTURE_IDS_OF_ARTICLE,
//     articleId,
//     articlePictureId,
//     locale
//   }
// }

// function createNewArticlePictureWithFileObject(articleId, file, forCard, forCarousel, locale) {

//   return function (dispatch, getState) {

//     const storedFileId = _.size(getState().storedFile) + 1
//     let articlePictureId = 0;
//     _.forOwn(getState().articlePictures[locale], (value, key) => {
//       if (key > articlePictureId) { articlePictureId = parseInt(key) + 100 }
//     })

//     dispatch(createNewFileObjectInStoreAndNewArticlePicture(articleId, articlePictureId, storedFileId, file, forCard, forCarousel, locale))
    // dispatch(createNewArticlePictureObjectForStoredFile(articlePictureId, storedFileId, forCard, forCarousel, locale))
    // dispatch(addNewArticlePictureIdToArticlePictureIdsOfArticle(articleId, articlePictureId, locale))

    // dispatch(promiseToCreateANewFileObject(file))
    //   .then(() => {
    //     let storedFileId = 0;
    //     _.forOwn(getState().storedFiles, (storedFile, key) => { if (storedFile.name === file.name) { storedFileId = key } });
    //     dispatch(promiseToCreateNewArticlePictureObjectForStoredFile(storedFileId, forCard, forCarousel, locale))
    //       .then(() => {
    //         let articlePictureId = 0;
    //         _.forOwn(getState().articlePictures[locale], (value, key) => { if (value.stored_file_id === parseInt(storedFileId)) { articlePictureId = parseInt(key) } })
    //         dispatch(addNewArticlePictureIdToArticlePictureIdsOfArticle(articleId, articlePictureId, locale))
    //       })
    //   })
//   }
// }


export function changeArticlePicture(locale, articleId, articlePictureId, forCard, forCarousel, file) {
  /* Use-case: in the slider of the single article view, the user wishes to change one of the existing pictures
  -> A temporary articlePicture object has already been created. It is associated either with a storedFile or with
  mediaContainer. The ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE will then (i) save the new uploaded file
  in a storedFile object and (ii) amend the existing articlePicture by simply adding a new (or replacing the existing)
  stored_file_id field with a pointer to the articlePicture.
  */
  /* Meta-programming
  Actions -> store
  1. change WIP state of field of article on the article_picture_ids field -> common with createAdditionalPicture
  2. create a file object in the store to store the new file (a storedFile) with its own id -> common with createAdditionalPicture
  3. amend the existing articlePicture to add a new stored_file_id field, with the corresponding id
  Views
  4. display the file associated to the articlePicture (instead of the mediaContainer) -> common with createAdditionalPicture
  5. amend the connected component which parses the articlePictures to fetch the relevant mediaContainers and have a switch
  that detects whether the articlePicture refers to a mediaContainer or to a storedFile -> common with createAdditionalPicture
  On save
  1. retrieve the updated values for (i) the article, (ii) the articlePictures and (iii) the mediaContainers
  2. ... this is going to be difficult. Option 1: update everything in case other changes have been made in the database
  Option 2: micro-manage the updates
  3. switch off the WIP state of field of article on the article_picture_ids field
  */
  return function (dispatch, getState) {
    const storedFileId = storedFileIdCreator(getState);

    dispatch(changeWIPStateOfFieldOfArticle(articleId, 'article_picture_ids', true, locale));
    dispatch(createNewFileObjectInStoreAndAddFileIdToArticlePicture(articlePictureId, storedFileId, forCard, forCarousel, file, locale));
  }
}

function createNewFileObjectInStoreAndAddFileIdToArticlePicture(articlePictureId, storedFileId, forCard, forCarousel, file, locale) {
  return {
    type: ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
    articlePictureId,
    storedFileId,
    file,
    forCard,
    forCarousel,
    locale
  }
}

export function deleteArticlePicture(locale, articleId, articlePictureId, storedFileId, mediaContainerId) {
  if (storedFileId >= 0) {
    if (mediaContainerId) {
      return {
        /* This is the case where the user has first replaced an existing mediaContainer by a new file
        In this case, we delete only the storedFile and reset the existing articlePicture to point to its
        old mediaContainer */
        type: DELETE_STORED_FILE_AND_RESET_EXISTING_ARTICLE_PICTURE,
        locale,
        articlePictureId,
        storedFileId
      }
    } else {
      return {
        /* This is the case where the user has appended a new picture.
        In this case, we delete the storedFile and the newly created articlePicture
        and we also delete the newly created entry in the article_picture_ids array in the corresponding article */
        type: DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
        locale,
        articleId,
        articlePictureId,
        storedFileId
      }
    }
  } else {
    return {
      /* This is the case where the user wishes to delete a mediaContainer (i.e. a picture already stored in the database
      In this case, we
      (i) update the article_picture_ids array in the articles,
      (ii) delete the corresponding articlePicture,
      (iii) delete the corresponding mediaContainer and
      (iv) store the articlePicture id and the mediaContainer id to mark them for deletion when the user will save.
      Various options to consider here: (i) maybe, it might be easier to only remove the article picture id from the array in the article and let
      Rails handle the dirty job by making the comparison between the old array and the new array */
      type: MARK_ARTICLE_PICTURE_FOR_DELETION,
      locale,
      articleId,
      articlePictureId,
      mediaContainerId
    }
  }
}
