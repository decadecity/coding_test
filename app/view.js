/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "React" }]*/

/*
This is all the UI: DOM manipulation and event handling.

DOM manipulation is very naive, it nukes what was there before and replaces it
with a new version.  That's going to cause problems in a real app but for this
simple exercise it works fine.const

There's html mixed up in this - for a larger application that would want to be
split out into a proper template system.  However, as this is all contained
within one public entry point it's easy to swap out.

Due to time constraints in this exercise I'm not testing this code as it would
require a whole new layer of complexity to test some very basic operations.
For a real application you'd want a full suite of tests to cover this that you
could run in real browsers.
*/

const _ = require('lodash');

const React = require('react'); // I don't like having to include this.
const ReactDOM = require('react-dom');

const basket = require('./basket');
const currencies = require('./currencies');
const products = require('./products');

// Hardcoded - could make this dynamic from a config for better l10n.
let activeCurrency = 'GBP';

// Right pads a float up to 2DP.
function formatCurrency(amount) {
  amount = `${amount}`.split('.');
  return `${amount[0]}.${_.pad(amount[1], 2, 0)}`;
}

/* Template functions */

function updateProducts() {
  document.querySelector('#product-list').innerHTML = _.reduce(products.list, function(result, product) {
    return result += (`<li class="product-list__product">
      <h3 class="product-list__product-name">${product.name}</h3>
      <div class="product-list__product-image"><img src="./img/placeholder.svg" alt=""/></div>
      <p>
        ${activeCurrency} ${formatCurrency(currencies.convert(product.price, activeCurrency))}
        per ${product.quantity}
      </p>
      <div><button data-product-id="${product.id}">Add to basket</button></div>
    </li>`);
  }, '');
}

function updateBasket() {
  let basketContents = '<p>No items in basket</p>';
  if (basket.items.length) {
    basketContents = _.reduce(basket.items, function(result, item) {
      const product = products.getById(parseInt(item.id, 10));
      return result += (`<tr class="basket__item">
        <td>${product.name}</td>
        <td>
          ${activeCurrency} ${formatCurrency(currencies.convert(product.price, activeCurrency))}
          per per ${product.quantity}
        </td>
        <td class="cell--numeric">${item.quantity}</td>
        <td class="cell--numeric">
          ${activeCurrency}
          ${formatCurrency(currencies.convert(item.quantity * product.price, activeCurrency))}
        </td>
        <td class="basket__item-remove"><button data-product-id="${item.id}">Remove</button></span>
      </tr>`);
    }, '');
    basketContents = `<table class="basket__items">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Cost</th>
          <th scope="col" class="invisible">Actions</th>
        </tr>
      </thead>
      <tfoot>
        <tr>
          <th colspan="3" scope="row">Basket total</th>
          <td class="cell--numeric">${activeCurrency} ${formatCurrency(currencies.convert(basket.total(), activeCurrency))}</td>
        </tr>
      </tfoot>
      <tbody>${basketContents}</tbody>
    </table>`;
  }
  document.querySelector('#basket-items').innerHTML = basketContents;
}

/* Event handler functions. */

function checkoutHandler() {
  // This is our currency progressive enhancement. The currency converter
  // will only be shown if the currencies have been loaded from the API.
  if (_.size(currencies.conversions) > 1) {
    document.querySelector('#available-currencies').innerHTML = _.reduce(currencies.conversions, function(result, conversion, currency) {
      return result += (`<li>
        <button data-currency="${currency}" class="curency-changer__currency curency-changer__currency--${currency}">${currency}</button>
      </li>`);
    }, '');
    document.querySelector('#currency-changer').classList.add('shown');
  } else {
    document.querySelector('#checkout').classList.add('hidden');
  }
}

function currencyChangeHandler(event) {
  if (event.target.tagName.toLowerCase() === 'button') {
    activeCurrency = event.target.dataset.currency;
    // Tight couplings.  Fine at this scale, would have proper state management
    // in a larger scale app.
    updateBasket();
    updateProducts();
  }
}

function addProductHandler(event) {
  if (event.target.tagName.toLowerCase() === 'button') {
    basket.add(parseInt(event.target.dataset.productId, 10));
    updateBasket();  // Tight coupling.
  }
}

function removeProductHandler(event) {
  if (event.target.tagName.toLowerCase() === 'button') {
    basket.remove(parseInt(event.target.dataset.productId, 10));
    updateBasket();  // Tight coupling.
  }
}

// Add an accessible keyboard focus: https://decadecity.net/blog/2012/11/06/building-a-layered-ui#focus
function keyboardHook () {
  document.querySelector('html').classList.add('keyboard');
  document.removeEventListener('keydown', keyboardHook);
}

function reactAllTheThings() {
  const element = <h1>Hello, world</h1>;
  ReactDOM.render(
    element,
    document.getElementById('react')
  );
}

/* Single public entry point. */

module.exports.init = function() {
  // Initial setup.
  updateProducts();
  updateBasket();

  reactAllTheThings();

  // Bind the event handlers.
  document.querySelector('#checkout').addEventListener('click', checkoutHandler);
  document.querySelector('#currency-changer').addEventListener('click', currencyChangeHandler);
  document.querySelector('#product-list').addEventListener('click', addProductHandler);
  document.querySelector('#basket-items').addEventListener('click', removeProductHandler);
  document.addEventListener('keydown', keyboardHook);
};
