/*
This is essentially a model: it's storing the application state.
*/

const _ = require('lodash');

const products = require('./products');

// List of items in the basket.
module.exports.items = [];

// Add an item to the basket.
module.exports.add = function (id) {
  let quantity = 1;
  const inBasket = _.findIndex(module.exports.items, ['id', id]);
  if(inBasket === -1) {
    module.exports.items.push({ 'id': id, 'quantity': quantity });
  } else {
    module.exports.items[inBasket].quantity += quantity;
  }
};

// Remove an item from the basket.
module.exports.remove = function (id) {
  const inBasket = _.findIndex(module.exports.items, ['id', id]);
  if(inBasket > -1) {
    module.exports.items.splice(inBasket, 1);
  }
};

// Empty the basket.
module.exports.empty = function() {
  module.exports.items = [];
};

// Total price for all items in the basket.
module.exports.total = function() {
  // Prices are all GBP.
  return _.reduce(module.exports.items, function(total, item) {
    return total += item.quantity * products.getById(item.id).price;
  }, 0);
};
