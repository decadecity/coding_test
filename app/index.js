const api = require('./api');
const currencies = require('./currencies');
const view = require('./view');

function init() {
  // Fire up the UI.
  view.init();

  // Load the currency information in the background,
  // we don't need it until the checkout is shown.
  // As the UI is progressively enhanced it will still
  // work in GBP if this fails.
  api.getCurrencies(function(data) {
    api.getCurrencyConversion(data, currencies.init);
  });
}

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', init);
}
