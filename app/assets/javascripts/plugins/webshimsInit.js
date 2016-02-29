
$.webshims.setOptions('basePath', '/webshims/1.15.10/shims/')

$.webshims.setOptions("forms", {
  list: {
    // how should the options be filtered * = wildcard | ^ = beginning | ! = no filter
    "filter": "*",
    // whether multiple values can be entered separated with a ","
    "multiple": false,
    // opens the datalist on focus
    "focus": true,
    // highlights matching parts in the datalist
    "highlight": false,
    // inline first found value with a selection range while user types
    "valueCompletion": true,
    // inline value while user navigates inside the datalist using cursor up/cursor down
    "inlineValue": false,
    // normally HTML will be escaped
    "noHtmlEscape": false,
  }
});

$.webshims.polyfill('forms');
