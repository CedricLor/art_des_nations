////////////////////////////////////
// Constants for articles reducers
////////////////////////////////////
export const initialStateForNewArticle = {
    title:  'Enter the title of your article here',
    teaser: 'Enter a teaser for your article here',
    body:   ''
  }

export const initialEditState = {
  article: false,
  title:   false,
  teaser:  false,
  body:    false
}

export const initialWIPState = {
  title:  false,
  teaser: false,
  body:   false
}

////////////////////////////////////
// Constants for articlesSizingPositionning reducers
////////////////////////////////////
export const initialArticlesDOMPropsState = {
  posTop:       0,
  divHeight:    0,
  reqDivHeight: 0,
  cardNumber:   0
}

