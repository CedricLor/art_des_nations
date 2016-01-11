////////////////////////////////////
// Constants for articles reducers
////////////////////////////////////
export const initialStateForNewArticle = {
    title:      'Enter the title of your article here',
    teaser:     'Enter a teaser for your article here',
    body:       '',
    posted_at:  `${new Date().toISOString()}`,
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

////////////////////////////////////
// Constants for languageSwitcher reducers
////////////////////////////////////
export const initialLanguageSwitcherState = {
  localesText: {
    en: "En",
    fr: "Fr",
    ru: "Py",
    zh: "中文"
  }
}

export const initialAvailableLocales = ['en', 'fr', 'ru', 'zh']
