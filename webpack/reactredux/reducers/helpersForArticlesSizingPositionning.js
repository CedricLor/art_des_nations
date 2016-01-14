function selectAllCardsInPreviousRow(new_state, articleCardProps) {
  //
  const [divHeightsInPreviousRow, articlesIdsOfPreviousRow, previousRowTopPos] = [[], [], articleCardProps.posTop];

  _.forOwn(new_state, function(value, key) {
    if ( value.posTop == previousRowTopPos ) {
      // store the div heights of the previous row in an array
      divHeightsInPreviousRow.push(value.divHeight);
      // store the articles ids of the previous row in an array
      articlesIdsOfPreviousRow.push(key);
    }
  });
  // find the highest div height of all divs
  const requiredHeight = _.max(divHeightsInPreviousRow);

  return [ requiredHeight, articlesIdsOfPreviousRow ]
}

function setRequiredHeights(new_state, requiredHeight, articlesIdsOfPreviousRow) {
  // set the required height in the redux store for each card in the previous row
  _.forEach(articlesIdsOfPreviousRow, function(value) {
    new_state[value].reqDivHeight = requiredHeight
  });
  return new_state;
}

function equalizeRowOrResetNeedResizingValuesOfRow(new_state, articleCardProps) {
  // select all the cards in the previous row and get the highest div height
  const [ requiredHeight, articlesIdsOfPreviousRow ] = selectAllCardsInPreviousRow(new_state, articleCardProps);
  new_state = setRequiredHeights(new_state, requiredHeight, articlesIdsOfPreviousRow);
  return new_state;
}

function checkIfPreviousRowFullyBuildBeforeEqualizing(new_state, action) {
  // iterate over the articlesDOMProps object to find out if the card with cardNumber - 1 (i.e. the previous card)
  // is located on the previous row
  new_state = _.forOwn(new_state, function(articleCardProps, key) {
    if ((articleCardProps.cardNumber == action.cardNumber - 1) && (action.posTop > articleCardProps.posTop)) {
      // then iterate on new_state to select all the cards in the previous row
      new_state = equalizeRowOrResetNeedResizingValuesOfRow(new_state, articleCardProps);
    }
  });
  return new_state;
}

export function equalizePreviousRowIfFirstCardOfNextRow(new_state, action) {
  // check if the current_card is not the first one
  // if it ain't, select the previous card if such previous card is one row above the current card
  if (action.cardNumber > 0) { new_state = checkIfPreviousRowFullyBuildBeforeEqualizing(new_state, action) }
  return new_state;
}
