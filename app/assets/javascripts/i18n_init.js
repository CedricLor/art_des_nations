import { initialAvailableLocales } from './reactredux/reducers/reducersConstants'

// Loading the polyfill for server side on Node.
// See instructions on https://github.com/andyearnshaw/Intl.js
// Consider bundling various browser packages depending on user chosen locale
const areIntlLocalesSupported = require('intl-locales-supported');

const appLocales = initialAvailableLocales;

export const loadI18nPolyfills = () => {
  if (global.Intl) {
      // Determine if the built-in `Intl` has the locale data we need.
      if (!areIntlLocalesSupported(appLocales)) {
          // `Intl` exists, but it doesn't have the data we need, so load the
          // polyfill and patch the constructors we need with the polyfill's.
          var IntlPolyfill    = require('intl');
          Intl.NumberFormat   = IntlPolyfill.NumberFormat;
          Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
      }
  } else {
      // No `Intl`, so use and load the polyfill.
      require.ensure([
          'intl',
          'intl/locale-data/jsonp/en.js',
          'intl/locale-data/jsonp/fr.js',
          'intl/locale-data/jsonp/ru.js',
          'intl/locale-data/jsonp/zh.js',
      ], function (require) {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          require('intl/locale-data/jsonp/fr.js');
          require('intl/locale-data/jsonp/ru.js');
          require('intl/locale-data/jsonp/zh.js');
      });
  }
}
