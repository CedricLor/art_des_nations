////////////////////////////////////
// Constants for articles reducers
////////////////////////////////////
export function setDateForNewArticle() {
  let d = new Date();
  return d.toString()
}

export const initialStateForNewArticle = {
    title:      'Enter the title of your article here',
    teaser:     'Enter a teaser for your article here',
    body:       '',
    posted_at:  setDateForNewArticle(),
    status:     "draft"
  }

export const initialEditState = {
  article:    false,
  title:      false,
  teaser:     false,
  body:       false,
  posted_at:  false,
  status:     false
}

export const initialWIPState = {
  title:      false,
  teaser:     false,
  body:       false,
  posted_at:  false,
  status:     false
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

