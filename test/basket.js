var assert = require('assert');

var basket = require('../app/basket');

describe('Basket', function() {

  describe('Items', function() {
    it('contains zero items at the start', function() {
      assert.equal(basket.items.length, 0);
    });
    it('should allow you to add a product with no quantity', function() {
      basket.add(0);
      assert.deepEqual(basket.items, [{ 'id': 0, 'quantity': 1 }]);
    });
    it('should allow you empty the basket', function() {
      assert.equal(basket.items.length, 1);
      basket.empty();
      assert.equal(basket.items.length, 0);
    });
    it('should allow you to add a product', function() {
      basket.add(0);
      assert.deepEqual(basket.items, [{ 'id': 0, 'quantity': 1 }]);
    });
    it('should add the quantities when you add the same item twice', function() {
      basket.add(0);
      assert.deepEqual(basket.items, [{ 'id': 0, 'quantity': 2 }]);
    });
    it('should allow you to remove an item', function() {
      basket.remove(0);
      assert.deepEqual(basket.items, []);
    });
  });

  describe('Total', function() {
    // In a more realistic example this would use mocked products but as our products are essentially mocked anyway in this case...
    it('should calculate the total for all items in the basket', function() {
      basket.empty();
      basket.add(0);
      basket.add(1);
      assert.equal(basket.total(), 3.05);
    });
  });
});
