import {
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,
  ADD_NEW_STORED_PICTURE_FILE_AND_AMEND_ARTICLE_PICTURE,
} from '../constants/ActionTypes'

import {changeWIPStateOfFieldOfArticle} from './articleFieldsActions'

function storedFileIdCreator(getState) {
  let storedFileId = 0
  const storedFiles = getState().storedFiles;
  if (storedFiles) {
    _.forOwn(storedFiles, (value, key) => {
      if (key > storedFileId) {storedFileID = parseInt(key) + 1}
    })
  }
  return storedFileId
}

export function createAdditionalArticlePicture(locale, articleId, file, forCard, forCarousel) {
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
      if (key > articlePictureId) { articlePictureId = parseInt(key) + 100 }
    })

    dispatch(changeWIPStateOfFieldOfArticle(articleId, 'article_pictures_ids', true, locale));
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

    dispatch(changeWIPStateOfFieldOfArticle(articleId, 'article_pictures_ids', true, locale));
    dispatch(createNewFileObjectInStoreAndAddFileIdToArticlePicture(articlePictureId, storedFileId, forCard, forCarousel, file, locale))
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
