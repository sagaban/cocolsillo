import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('register');
  this.route('main', function() {
    // TODO: add resetNamespace ? Analyse
    this.route('account', function() {
      this.route('index', { path: '/:account_id' }, function() {});
      this.route('create', function() {});
    });

    this.route('entries', function() {
      this.route('create');
    });
  });
});

export default Router;
