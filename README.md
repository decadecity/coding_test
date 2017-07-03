# Shopping basket frond end playground

This is a basic shopping cart for a front end playground.  It's not going to scale in it's current form to a full e-commerce application but it's an MVP that is structured in such a way that it can be iterated on.

## Project structure

 * app - Main application JS source code
 * public_html - Web server root of the application
 * test - Tests for the application code

## Working with the code

There are three npm tasks for this project:

 * `npm start` - runs the webpack bundler with a watch task.
 * `npm test` - runs the mocha tests with a watch task.
 * `npm run lint` - lints the JS code.

## Browser support

As this isn't a real site I've not put time into any kind of cross-browser compatibility: this only targets the latest stable versions of Firefox and Chrome.
