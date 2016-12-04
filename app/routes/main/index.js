import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(
  AuthenticatedRouteMixin,
  {
    model() {
      const userUID = this.get('session.data.authenticated.uid');
      return this.store.find('user', userUID);
    }
  }
);
