/* eslint-env mocha */

var assert = require('assert');

var products = require('../app/products');

describe('List', function() {
  it('should be able to get a product by its ID', function() {
    assert.deepEqual(
      products.getById(2),
      { 'id': 2, 'name': 'Milk', 'price': 1.3, 'quantity': 'bottle' }
    );
  });
});

describe('Product', function() {
  // Take the fist product as an ilustration.
  var product = products.getById(0);

  it('should have an id', function() {
    assert.equal(typeof product.id, 'number');
  });
  it('should have a name', function() {
    assert.equal(typeof product.name, 'string');
  });
  it('should have a price', function() {
    assert.equal(typeof product.price, 'number');
  });
  it('should have a unit quantity', function() {
    assert.equal(typeof product.quantity, 'string');
  });
});
