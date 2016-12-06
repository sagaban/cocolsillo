/* eslint-disable */

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const cssnano = require('cssnano');
const precss = require('precss');
const cssnext = require('postcss-cssnext');

// The current emver environment
const env = process.env.EMBER_ENV;

// Config and initilize dotenv
// https://www.npmjs.com/package/dotenv
require("dotenv").config({
  path: `.env.${env}`
});

module.exports = function(defaults) {
  const app = new EmberApp(defaults, {
    // Add options here

    // POSTCSS
    postcssOptions: {
      compile: {
        enabled: true,
        plugins: [

          /*
          CSSNext Features
          automatic vendor prefixes, custom properties & var(), custom properties set & @apply, reduced calc(), custom media queries, media queries ranges, custom selectors, nesting, color() function, hwb() function, gray() function, #rrggbbaa colors, rgba function (rgb fallback), rebeccapurple color, font-variant property, filter property (svg fallback), initial value, rem unit (px fallback), :any-link pseudo-class, :matches pseudo-class, :not pseudo-class (to l.3), ::pseudo syntax (: fallback), overflow-wrap property (word-wrap fallback), attribute case insensitive, rgb() function (functional-notation), hsl() function (functional-notation)
          */
          {
            module: cssnext,
            options: {
              browsers: ['last 2 version']
            }
          },
          /*
          contains plugins for Sass-like features, like variables, nesting, and mixins.
          */
          { module: precss },
          {
            module: cssnano,
            options: {
              safe: true,
              sourcemap: true
            }
          }
        ]
      }
    },

    SemanticUI: {
      import: {
        fonts: true,
        images: false,
        css: true,
        javascript: true
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
