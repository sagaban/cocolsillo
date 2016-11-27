import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {
  inject: { service },
  Logger
} = Ember;

export default Ember.Route.extend(
  UnauthenticatedRouteMixin,
  {

    notify: service(),
    session: service(),

    actions: {
      authenticate: function authenticate(provider, email, password) {
        this.get('session').authenticate(
          'authenticator:firebase-simple-auth',
          'firebase-simple-auth',
          {
            provider,
            email,
            password
          }
        )
        .then(() => {
          this.get('notify').success('You are logged in');
        })
        .catch((e) => {
          this.get('notify').error(e.message || 'There was an error in the authentication');
          Logger.error(`There was an error in the authentication: ${e}`);
        });
      }
    }
  });
