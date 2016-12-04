import Ember from 'ember';

const {
  inject: { service },
  isEmpty,
  RSVP
} = Ember;

export default Ember.Service.extend({

  session: service('session'),
  store: service(),

  loadCurrentUser() {
    return new RSVP.Promise((resolve, reject) => {
      const userUID = this.get('session.data.authenticated.uid');
      if (!isEmpty(userUID)) {
        this.get('store').find('user', userUID).then((user) => {
        // this.get('store').query('user', { filter: { uid: userUID } }).then((queryResult) => {
          this.set('user', user);
          resolve();
        }, reject);
      } else {
        resolve();
      }
    });
  }
});
