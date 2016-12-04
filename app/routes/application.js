import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

const { inject: { service } } = Ember;


export default Ember.Route.extend(
  ApplicationRouteMixin,
  {
    currentUser: service('current-user'),

    beforeModel() {
      return this._loadCurrentUser();
    },

    sessionAuthenticated() {
      this._super(...arguments);
      this._loadCurrentUser().catch(() => this.get('session').invalidate());
    },

    _loadCurrentUser() {
      return this.get('currentUser').loadCurrentUser();
    }
  }
);
