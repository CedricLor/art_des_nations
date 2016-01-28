/*
 * action types
 */

export const TOGGLE_SITE_EDIT_MODE = 'TOGGLE_SITE_EDIT_MODE'

export const LOADING_INITIAL_ARTICLES = 'LOAD_INITIAL_ARTICLES'
export const LOADED_INITIAL_ARTICLES = 'LOADED_INITIAL_ARTICLES'
export const FETCHING_INFINITE_SCROLL_DATA = 'FETCHING_INFINITE_SCROLL_DATA'
export const RECEIVED_INFINITE_SCROLL_DATA = 'RECEIVED_INFINITE_SCROLL_DATA'
export const LOADING_ADDITIONAL_LOCALE_ARTICLES = 'LOADING_ADDITIONAL_LOCALE_ARTICLES'
export const LOADED_ADDITIONNAL_LOCALE_ARTICLES = 'LOADED_ADDITIONNAL_LOCALE_ARTICLES'

export const SET_ARTICLES_VISIBILITY_FILTER = 'SET_ARTICLES_VISIBILITY_FILTER'

export const ArticlesVisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_DRAFT: 'SHOW_DRAFT',
  SHOW_PUBLISHED: 'SHOW_PUBLISHED',
  SHOW_FEATURED: 'SHOW_FEATURED',
  SHOW_ARCHIVED: 'SHOW_ARCHIVED'
}



export const UPDATE_ARTICLE = 'UPDATE_ARTICLE'
export const DELETE_ARTICLE = 'DELETE_ARTICLE'
export const REORDER_ARTICLES_ARRAY = 'REORDER_ARTICLES_ARRAY'
export const REORDER_ALL_THE_ARTICLES_ARRAYS = 'REORDER_ALL_THE_ARTICLES_ARRAYS'

export const CHANGE_FIELD_OF_ARTICLE = 'CHANGE_FIELD_OF_ARTICLE'

export const CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE = 'CHANGE_WIP_STATE_OF_FIELD_OF_ARTICLE'
export const RESET_ALL_WIP_STATES_FOR_ARTICLE = 'RESET_ALL_WIP_STATES_FOR_ARTICLE'

export const CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE = 'CHANGE_EDIT_STATE_OF_FIELD_OF_ARTICLE'
export const TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE = 'TOGGLE_EDIT_STATE_OF_FIELD_OF_ARTICLE'
export const RESET_ALL_EDIT_STATES_FOR_ARTICLE = 'RESET_ALL_EDIT_STATES_FOR_ARTICLE'



export const ADD_NEW_ARTICLE = 'ADD_NEW_ARTICLE'
export const CHANGE_FIELD_OF_NEW_ARTICLE = 'CHANGE_FIELD_OF_NEW_ARTICLE'
export const RESET_FIELDS_OF_NEW_ARTICLE = 'RESET_FIELDS_OF_NEW_ARTICLE'



export const CHANGE_NEED_RESIZING_STATE_OF_ARTICLES = 'CHANGE_NEED_RESIZING_STATE_OF_ARTICLES'
export const ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE = 'ASSIGN_REAL_DOM_VALUES_TO_DOM_PROPS_OF_ARTICLE'
export const RESET_DOM_PROPS_OF_ALL_THE_ARTICLES = 'RESET_DOM_PROPS_OF_ALL_THE_ARTICLES'

