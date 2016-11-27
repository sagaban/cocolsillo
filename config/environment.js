/* eslint-disable */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'cocolsillo',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',

    firebase: {
      apiKey: process.env.FIREBASE_API_KEY,
      databaseURL: `https://${process.env.FIREBASE_APP_NAME}.firebaseio.com`,
      authDomain: `${process.env.FIREBASE_APP_NAME}.firebaseapp.com`,
      storageBucket: `${process.env.FIREBASE_APP_NAME}.appspot.com`,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
    },

    torii: {
      sessionServiceName: 'session',
      providers: {
        'firebase-simple-auth': {
        }
      }
    },

    'ember-simple-auth': {
      authenticationRoute: '',
      routeAfterAuthentication: 'main'
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
