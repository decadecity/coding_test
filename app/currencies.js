/*
Due to time restrictions, this is all hard coded round our currency being GBP
and the API's source currency being USD.  A better soltion would be to
parameterise all of that jazz.
*/

const _ = require('lodash');

// Map of currency -> value relative to GBP.
module.exports.conversions = {
  // GBP is our source currency in this example.
  'GBP': 1
};

// Convert a GBP amount to a different currency.
module.exports.convert = function(GBPamount, targetCurrency) {
  if (module.exports.conversions.hasOwnProperty(targetCurrency)) {
    return _.round(GBPamount * module.exports.conversions[targetCurrency], 2);
  } else {
    // TODO: error.
  }
};

// Initialises the conversions using API data.
module.exports.init = function(data) {
  // Using dependency injection here for the API result.  This allows it to
  // be tested using a mock and means the API call is only moving data.

  // We have to get the USD -> GBP conversion first as we can't change the
  // source away from USD on the free plan.

  if (!data.hasOwnProperty('quotes') || !data.quotes.hasOwnProperty('USDGBP')) {
    // We don't have the data we need so abort.
    return;
  }

  module.exports.conversions.USD = 1/data.quotes.USDGBP;

  // Once we have the USD -> GBP value we can convert the rest.
  _.forEach(data.quotes, function(rate, currency) {
    module.exports.conversions[currency.substr(3)] = rate * module.exports.conversions.USD;
  });
};
