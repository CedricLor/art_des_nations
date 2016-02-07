import {
  LOADED_INITIAL_ARTICLES,
  LOADED_ADDITIONAL_LOCALE_ARTICLES,
  TOGGLE_SITE_EDIT_MODE,
  ADD_NEW_ARTICLE,
  UPDATE_ARTICLE,
  DELETE_ARTICLE,
  CHANGE_FIELD_OF_ARTICLE,
  CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_WIP_STATES_FOR_ARTICLE,

  CHANGE_EDIT_STATE_OF_ARTICLE,
  TURN_ON_EDIT_STATE_OF_A_FIELD,
  TURN_OFF_EDIT_STATE_OF_A_FIELD,

  TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE,
  RESET_ALL_EDIT_STATES_FOR_ARTICLE,
  CHANGE_FIELD_OF_NEW_ARTICLE,
  RESET_FIELDS_OF_NEW_ARTICLE,
  REORDER_ARTICLES_ARRAY,
  REORDER_ALL_THE_ARTICLES_ARRAYS,
  ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE,

  MARK_ARTICLE_PICTURE_FOR_DELETION,
  DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE,
   } from '../constants/ActionTypes';

import {
  initialStateForNewArticle,
  initialEditState,
  initialWIPState
   } from './reducersConstants';

export function newArticleFields(state = initialStateForNewArticle, action) {
  switch (action.type) {

    case CHANGE_FIELD_OF_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.fieldName]: action.value,
        hasReceivedUserInput: true
      });

    case RESET_FIELDS_OF_NEW_ARTICLE:
      return initialStateForNewArticle;

    default:
      return state;
  }
}

function articlePictureIds(state = [], action) {
  switch (action.type) {
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
      return [
        ...state,
        action.articlePictureId
      ]

    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return _.without(state, action.articlePictureId);

    default:
      return state;
  }
}

function article(state, action) {
  switch (action.type) {
    case ADD_NEW_ARTICLE:
      return {
        id: action.article.id,
        title: action.article.title,
        teaser: action.article.teaser,
        body: action.article.body,
        status: action.article.status,
        posted_at: action.article.posted_at,
        article_picture_ids: action.article.article_picture_ids
      }

    case UPDATE_ARTICLE:
      if (state.id !== action.article.id) {
        return state
      }
      console.log("------- In UPDATE_ARTICLE, in articles", action.article.article_picture_ids)
      return Object.assign({}, state, {
        title: action.article.title,
        teaser: action.article.teaser,
        body: action.article.body,
        status: action.article.status,
        posted_at: action.article.posted_at,
        article_picture_ids: action.article.article_picture_ids
      })

    case CHANGE_FIELD_OF_ARTICLE:
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        [action.fieldName]: action.fieldValue
      });

    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      if (state.id !== action.articleId) {
        return state;
      }
      return Object.assign({}, state, {
        article_picture_ids: articlePictureIds(state.article_picture_ids, action)
      });

    default:
      return state;
  }
}

function localizedArticles(state = [], action) {
  switch (action.type) {
    case ADD_NEW_ARTICLE:
      return [
        article({}, action),
        ...state
      ];

    case DELETE_ARTICLE:
      const index = _.findIndex(state, {id: action.id});
      return [
        ...state.slice(0, index),
        ...state.slice(index+1)
      ];

    case UPDATE_ARTICLE:
    case CHANGE_FIELD_OF_ARTICLE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
      return state.map(art => article(art, action));

    case REORDER_ARTICLES_ARRAY:
    case REORDER_ALL_THE_ARTICLES_ARRAYS:
    return _.orderBy(state, 'posted_at', 'desc')

    default:
      return state;
  }
}

export function articles(state = {}, action) {
  switch (action.type) {
    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articles;

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articles);

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
    case REORDER_ALL_THE_ARTICLES_ARRAYS:
      const newStateIterated = {};
      _.forOwn(state, (localeArticlesArray, locale) => newStateIterated[locale] = localizedArticles(state[locale], action) );
      return Object.assign({}, state, newStateIterated);

    case UPDATE_ARTICLE:
    case CHANGE_FIELD_OF_ARTICLE:
    case ADD_NEW_STORED_PICTURE_FILE_AND_NEW_ARTICLE_PICTURE:
    case DELETE_STORED_FILE_AND_NEWLY_CREATED_ARTICLE_PICTURE:
    case MARK_ARTICLE_PICTURE_FOR_DELETION:
    case REORDER_ARTICLES_ARRAY:
      return Object.assign({}, state, {
        [action.locale]: localizedArticles(state[action.locale], action)
      });

    default:
      return state
  }
}

function fieldEditStates(state = {}, action) {
  switch (action.type) {
    case TURN_ON_EDIT_STATE_OF_A_FIELD:
      return Object.assign({}, state, {
        article: true,
        [action.fieldName]: true
      });

    case TURN_OFF_EDIT_STATE_OF_A_FIELD:
      let articleEditStatus = true;
      if ( !( _.includes( _.values( _.omit(state, ['article']) ), true ) ) ) {
        articleEditStatus = false;
      }
      return Object.assign({}, state, {
        article: articleEditStatus,
        [action.fieldName]: false
      });

    case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
      return Object.assign({}, state, {
        [action.fieldName]: !state[action.fieldName]
      });

    case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
      const newState = {};
      _.forOwn(state, (value, fieldName) => { newState[fieldName] = action.resetValue });
      return Object.assign({}, state, newState);

    default:
      return state
  }
}

function localizedArticlesEditStates(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.article.id]: initialEditState
      });

    case TURN_ON_EDIT_STATE_OF_A_FIELD:
    case TURN_OFF_EDIT_STATE_OF_A_FIELD:
    case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
    case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
      return Object.assign({}, state, {
        [action.id]: fieldEditStates(state[action.id], action)
      });

    case DELETE_ARTICLE:
      return Object.assign({}, _.omit(state, action.id));

    default:
      return state
  }
}

export function articlesEditStates(state = {}, action) {
  // const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesEditStates

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesEditStates)

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
      const newStateIterated = {};
      _.forOwn(state, (localeEditStatesArray, locale) => newStateIterated[locale] = localizedArticlesEditStates(state[locale], action) );
      return Object.assign({}, state, newStateIterated);

    case TURN_ON_EDIT_STATE_OF_A_FIELD:
    case TURN_OFF_EDIT_STATE_OF_A_FIELD:
    case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
    case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
      return Object.assign({}, state, {
        [action.locale]: localizedArticlesEditStates(state[action.locale], action)
      });

    default:
      return state
  }
}


function fieldWIPStates(state = {}, action) {
  switch (action.type) {
    case CHANGE_FIELD_OF_ARTICLE:
      return Object.assign({}, state, {
        [action.fieldName]: true
      });

    case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
      return Object.assign({}, state, {
        [action.fieldName]: action.WIPStateValue
      });

    case RESET_ALL_WIP_STATES_FOR_ARTICLE:
      const newState = {};
      _.forOwn(state[action.id], (value, fieldName) => {
        // if (fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
          newState[fieldName] = false;
        // }
      })
      return newState

    default:
      return state
  }
}

function localizedArticlesWIPStates(state = {}, action) {
  switch (action.type) {
    case ADD_NEW_ARTICLE:
      return Object.assign({}, state, {
        [action.article.id]: initialWIPState
      });

    case CHANGE_FIELD_OF_ARTICLE:
    case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
    case RESET_ALL_WIP_STATES_FOR_ARTICLE:
      return Object.assign({}, state, {
        [action.id]: fieldWIPStates(state[action.id], action)
      });

    case DELETE_ARTICLE:
      return Object.assign({}, _.omit(state, action.id));

    default:
      return state
  }
}

export function articlesWIPStatesOfFields(state = {}, action) {
  // const new_state = Object.assign({}, state);
  switch (action.type) {

    case LOADED_INITIAL_ARTICLES:
      return action.initialState.articlesWIPStatesOfFields

    case LOADED_ADDITIONAL_LOCALE_ARTICLES:
      return Object.assign({}, state, action.additionalStates.articlesWIPStatesOfFields)

    case ADD_NEW_ARTICLE:
    case DELETE_ARTICLE:
      const newStateIterated = {};
      _.forOwn(state, (localeWIPStatesArray, locale) => newStateIterated[locale] = localizedArticlesWIPStates(state[locale], action) );
      return Object.assign({}, state, newStateIterated);

    case CHANGE_FIELD_OF_ARTICLE:
    case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
    case RESET_ALL_WIP_STATES_FOR_ARTICLE:
      return Object.assign({}, state, {
        [action.locale]: localizedArticlesWIPStates(state[action.locale], action)
      });

    default:
      return state
  }
}

// export function articlesWIPStatesOfFields(state = {}, action) {
//   const new_state = Object.assign({}, state);
//   switch (action.type) {

//     // case LOADED_INITIAL_ARTICLES:
//     //   return action.initialState.articlesWIPStatesOfFields

//     // case LOADED_ADDITIONAL_LOCALE_ARTICLES:
//     //   return Object.assign({}, state, action.additionalStates.articlesWIPStatesOfFields)

//     // case ADD_NEW_ARTICLE:
//     //   _.forOwn(new_state, (localeWIPStatesArray, locale) => {
//     //     new_state[locale][action.article.id] = initialWIPState
//     //   })
//     //   return new_state

//     // case CHANGE_FIELD_OF_ARTICLE:
//     //   new_state[action.locale][action.id][action.fieldName] = true
//     //   return new_state

//     // case CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE:
//     //   new_state[action.locale][action.id][action.fieldName] = action.WIPStateValue;
//     //   return new_state

//     // case RESET_ALL_WIP_STATES_FOR_ARTICLE:
//     //   _.forOwn(new_state[action.locale][action.id], (value, fieldName) => {
//     //     // if (fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
//     //       new_state[action.locale][action.id][fieldName] = false;
//     //     // }
//     //   })
//     //   return new_state

//     // case DELETE_ARTICLE:
//     //   _.forOwn(new_state, (localeWIPStatesArray, locale) => {
//     //     delete new_state[locale][action.id];
//     //   })
//     //   return new_state

//     default:
//       return state
//   }
// }


    // case TURN_ON_EDIT_STATE_OF_A_FIELD:
    //   new_state[action.locale][action.id]["article"] = true;
    //   new_state[action.locale][action.id][action.fieldName] = true;
    //   return new_state

    // case TURN_OFF_EDIT_STATE_OF_A_FIELD:
    //   new_state[action.locale][action.id][action.fieldName] = false;
    //   if ( !( _.includes( _.values( _.omit(new_state[action.locale][action.id], ['article']) ), true ) ) ) {
    //     new_state[action.locale][action.id]["article"] = false;
    //   }
    //   return new_state
    /* ***************** */

    // case TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE:
    //   new_state[action.id][action.fieldName] = !new_state[action.id][action.fieldName];
    //   return new_state

    // case RESET_ALL_EDIT_STATES_FOR_ARTICLE:
    //   _.forOwn(new_state[action.locale][action.id], (value, fieldName) => {
    //     // if (fieldName === 'article' || fieldName === 'title' || fieldName === 'teaser' || fieldName === 'body') {
    //     new_state[action.locale][action.id][fieldName] = action.resetValue;
    //     // }
    //   })
    //   return new_state

    // case DELETE_ARTICLE:
    //   _.forOwn(new_state, (localeEditStatesArray, locale) => {
    //     delete new_state[locale][action.id];
    //   })
    //   return new_state

