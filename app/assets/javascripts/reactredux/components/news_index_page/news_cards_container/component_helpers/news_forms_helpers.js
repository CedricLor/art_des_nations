export function inlineBlockStyleForReadOnly(styleObject, siteEditMode) {
  if (siteEditMode == true) {
    return Object.assign(styleObject, { "display": "inline-block" })
  } else {
    return styleObject
  }
}

export function rawMarkup(raw) {
    return { __html: raw }
}
