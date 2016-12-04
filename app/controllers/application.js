import Ember from 'ember';

const {
    inject: { service }
} = Ember;

export default Ember.Controller.extend({

  notify: service(),
  session: service(),
  currentUser: service('current-user'),

  actions: {
    invalidateSession: function invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
