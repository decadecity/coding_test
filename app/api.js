/*

This is calls to external API resources.

Due to time constraints in this exercise I'm not testing this code as it would
require stubbing out XMLHttpRequest which is a whole new layer of complexity
and wouldn't prove much.

*/

// Retrieve JSON data via asynchronous GET request.
function getJSON(path, callback) {
  const httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        callback(JSON.parse(httpRequest.responseText));
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send();
}

/*
Gets the list of available currencies.

http://jsonrates.com/currencies.json was b0rked when I wrote this so hard
coded a response to show the principles.
*/
module.exports.getCurrencies = function(callback) {
  callback(['USD', 'AUD', 'CAD', 'PLN', 'MXN', 'GBP']);
};

/*
Gets the list of currency conversions from the API.
*/
module.exports.getCurrencyConversion = function(currencies, callback) {
  // We have to have GBP and USD for the currency conversion to work.
  // See currencies module for more info.
  currencies.push('GBP');
  currencies.push('USD');
  // Doesn't matter if they're in the list more than once.

  // In this case, it doesn't mater if this fails, the UI is progressively
  // enhanced so will still work in GBP and won't show any currency
  // conversion options if no currencies are loaded.
  // With more time to spend on the front end part of this test could add
  // some nice UI saying it had failed to load additional currencies.
  getJSON(`http://apilayer.net/api/live?access_key=00d53c41db42e70632bd3528b377bd16&currencies=${currencies.join(',')}&format=1`, callback);
};
