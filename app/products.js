/*
This is the minimum needed for this simple application, in reality the list of
products would probably come from an API.

Prices are all GBP.
*/

const _ = require('lodash');

module.exports.list = [
  { 'id': 0, 'name': 'Peas', 'price': 0.95, 'quantity': 'bag' },
  { 'id': 1, 'name': 'Eggs', 'price': 2.10, 'quantity': 'dozen' },
  { 'id': 2, 'name': 'Milk', 'price': 1.30, 'quantity': 'bottle' },
  { 'id': 3, 'name': 'Beans', 'price': 0.73, 'quantity': 'can' },
];

module.exports.getById = function(id) {
  const availableProduct = _.findIndex(module.exports.list, ['id', id]);
  if (availableProduct > -1) {
    return module.exports.list[availableProduct];
  }
};
