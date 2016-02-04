
function getAncillaryItems(getState, locale, id, ancillaryItemIdsArray, ancillaryItemsReduxName) {
  const ancillaryItems = getState()[ancillaryItemsReduxName][locale];
  const selectedAncillaryItems = ancillaryItemIdsArray.map((ancillaryItemId) => {
    return ancillaryItems[ancillaryItemId]
  });
  return selectedAncillaryItems;
}

function getArticlePicturesForFetchUpdateArticle(getState, locale, id, articlePictureIdsArray) {
  const selectedArticlePictures = getAncillaryItems(
    getState,
    locale,
    id,
    articlePictureIdsArray,
    "articlePictures"
  )

  const [selectedMediaContainersIds, selectedStoredFileIds] = [[], []]
  _.forEach(selectedArticlePictures, (selectedArticlePicture) => {
    if (selectedArticlePicture.stored_file_id >= 0) {
      selectedStoredFileIds.push(selectedArticlePicture.stored_file_id);
    } else if (selectedArticlePicture.media_container_id >= 0) {
      selectedMediaContainersIds.push(selectedArticlePicture.media_container_id);
    }
  });

  return [selectedArticlePictures, selectedMediaContainersIds, selectedStoredFileIds];
}

function getNewPictures(getState, data, newPicIdsArr) {
  const newPictures = getState().storedFiles;
  _.forOwn(newPictures, (newPic, newPicId) => {
    data.append(`media_file_${newPicId}`, newPic);
  });
  return data;
}

export function preProcessorForFetchUpdateArticle(getState, locale, id) {
  // Create the formData object and add the pictures to it
  let data = new FormData();
  data = getNewPictures(getState, data, selectedStoredFileIds);

  // Create an object and stringify it, then add it to the formData object
  let objectToStringify = _.find(getState().articles[locale], {'id': id});
  const [selectedArticlePictures, selectedMediaContainersIds, selectedStoredFileIds] =
    getArticlePicturesForFetchUpdateArticle(getState, locale, id, objectToStringify.article_picture_ids);
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
  data.append('article', JSON.stringify(objectToStringify));

  // Debugging: with firefox 44 only
  // for(var pair of data.entries()) {
  //   if (pair[0] === "media_file_0") {
  //     console.log(pair[0]+ ', '+ pair[1].preview);
  //   }
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
