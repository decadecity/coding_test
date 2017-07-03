/* eslint-env mocha */

var assert = require('assert');

var currencies = require('../app/currencies');

var mockAPIResponse = {
  'success':true,
  'terms':'https://currencylayer.com/terms',
  'privacy':'https://currencylayer.com/privacy',
  'timestamp':1497008408,
  'source':'USD',
  'quotes':{
    'USDUSD':1,
    'USDAUD':1.3268,
    'USDCAD':1.35096,
    'USDPLN':3.747977,
    'USDMXN':18.191197,
    'USDGBP':0.78327,
  },
};

describe('Currency conversion', function() {
  describe('Initialisation', function() {
    it('builds a list of currencies and their conversions to GBP', function() {
      currencies.init(mockAPIResponse);
      assert.deepEqual(currencies.conversions, {
        'AUD': 1/0.78327 * 1.3268,
        'CAD': 1/0.78327 * 1.35096,
        'GBP': 1,
        'MXN': 1/0.78327 * 18.191197,
        'PLN': 1/0.78327 * 3.747977,
        'USD': 1/0.78327,
      });
    });
    it('copes with malfomred data', function() {
      currencies.conversions = { 'GBP': 1 };
      currencies.init({ 'success': false });
    });
  });
  describe('Conversion', function() {
    it('converts from GBP to target currency', function() {
      currencies.init(mockAPIResponse);
      assert.equal(currencies.convert(2.34, 'MXN'), Math.round(1/0.78327 * 18.191197 * 2.34 * 100) / 100);
    });
  });
});
