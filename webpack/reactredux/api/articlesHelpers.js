
function getAncillaryItems(getState, locale, id, ancillaryItemIdsArray, ancillaryItemsReduxName) {
  const ancillaryItems = getState()[ancillaryItemsReduxName][locale];
  const selectedAncillaryItems = ancillaryItemIdsArray.map((ancillaryItemId) => {
    return ancillaryItems[ancillaryItemId]
  });
  console.log(selectedAncillaryItems)
  return selectedAncillaryItems;
}

function getArticlePicturesForFetchUpdateArticle(getState, locale, id, articlePictureIdsArray) {
  // Get all the data relating to the articlePictures associated with the current article
  const selectedArticlePictures = getAncillaryItems(
    getState,
    locale,
    id,
    articlePictureIdsArray,
    "articlePictures"
  )
  /* Create two arrays of ids:
  1. one with the ids of the mediaContainers associated with the articlePictures;
  2. one with the ids of the storedFiles associated with the articlePictures. */
  const [selectedMediaContainersIds, selectedStoredFileIds] = [[], []]
  _.forEach(selectedArticlePictures, (selectedArticlePicture) => {
    // If the current articlePicture has a stored_file_id field which is equal to or greater than 0
    // then store the id of the corresponding storedFile in the selectedStoredFileIds array
    if (selectedArticlePicture.stored_file_id >= 0) {
      selectedStoredFileIds.push(selectedArticlePicture.stored_file_id);
    }
    // If the current articlePicture has a media_container_id which is equal to or greater than 0
    // then store the id of the corresponding mediaContainer in the mediaContainers array
    else if (selectedArticlePicture.media_container_id >= 0) {
      selectedMediaContainersIds.push(selectedArticlePicture.media_container_id);
    }
  });
  console.log([selectedArticlePictures, selectedMediaContainersIds, selectedStoredFileIds]);
  return [selectedArticlePictures, selectedMediaContainersIds, selectedStoredFileIds];
}

function getNewPictures(getState, data, newPicIdsArr, articleId) {
  // Get all the storedFiles from the store
  const newPictures = getState().storedFiles[articleId];
  // Loop around the newPicsIdsArr (gathered from the articlePictures)
  // to fetch the sotreFiles which correspond to the current article
  _.forEach(newPicIdsArr, (newPicId)=> {
    // Append each selected storedFile to the formData object
    data.append(`media_file_${newPicId}`, newPictures[newPicId]);
  });

  return data;
}

export function preProcessorForFetchUpdateArticle(getState, locale, id) {
  // Create the formData object and add the pictures to it
  let data = new FormData();


  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // FIXME -- This chunk of code comes from the legacy handleUpdateArticle action creator.
  // It handled a specific use case: partial updates when the user clicks on the save icon on an editable field.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // if the fieldname calling update is not article,
  // select only the data from this specific field to make a partial update
  // (see use case (ii) above)
  // if (fieldName !== 'article') {
  //   data = _.pick(data, fieldName);
  // }


  // Get all the data that can be stringified to append it as a JSON string to the formData object
  // Get the fields of the current article
  let objectToStringify = _.find(getState().articles[locale], {'id': id});

  /* Get
  1. the articlePictures relating to the article (objectToStringify.article_picture_ids is the array of articlePictures);
  2. the corresponding mediaContainers' ids (from the articlePictures)
  */
  const [selectedArticlePictures, selectedMediaContainersIds, selectedStoredFileIds] =
    getArticlePicturesForFetchUpdateArticle(getState, locale, id, objectToStringify.article_picture_ids);

  /* Add to the objectToStringify:
  1. the articlePictures' data;
  2. the mediaContainers' data;
  3. the list of article pictures marked for deletion
  */
  objectToStringify = {
    ...objectToStringify,
    ...{
      article_pictures: selectedArticlePictures,
      media_containers: getAncillaryItems(
                          getState,
                          locale,
                          id,
                          selectedMediaContainersIds,
                          "mediaContainers"
                        ),
      pictures_marked_for_deletion: getState().articlePicturesMarkedForDeletionByArticleId[id]
    }
  };
  // Stringify the objectToStringify and add it to the formData object
  data.append('article', JSON.stringify(objectToStringify));

  // Get the new pictures from the store and append them to the formData object
  data = getNewPictures(getState, data, selectedStoredFileIds, id);

  // Debugging: with firefox 44 only
  // for(var pair of data.entries()) {
  //   console.log(pair[0]+ ', '+ pair[1]);
  // }

  return data;
}

export function preProcessorForHandleSubmitNewArticle(getState) {
  // Create a formData object to be sent in the request
  const data = new FormData();
  // Append the media file to the form data object
  data.append('media_file', getState().newArticleFields.card_picture);
  // Fetch the new article field values in the state
  const articleFields = getState().newArticleFields;
  // Append the articlesFields as stringified JSON string
  data.append('article_form', JSON.stringify(articleFields));
  return data
}
