/*
This is the minimum needed for this simple application, in reality the list of
products would probably come from an API.

Prices are all GBP.
*/

const _ = require('lodash');

module.exports.list = [
  { 'id': 0, 'name': 'T-shirt', 'price': 9.99, 'quantity': 'shirt' },
  { 'id': 1, 'name': 'Hoodie', 'price': 19.99, 'quantity': 'hoodie' },
  { 'id': 2, 'name': 'Trainers', 'price': 49.99, 'quantity': 'pair' },
  { 'id': 3, 'name': 'Cap', 'price': 24.99, 'quantity': 'hat' },
];

module.exports.getById = function(id) {
  const availableProduct = _.findIndex(module.exports.list, ['id', id]);
  if (availableProduct > -1) {
    return module.exports.list[availableProduct];
  }
};
