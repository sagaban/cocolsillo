import Ember from 'ember';
import Currencies from './currencies';

const {
  inject: { service }
} = Ember;

export default Ember.Route.extend({
  model() {
    return this.store.createRecord('account');
  },

  setupController(controller, account) {
    this._super(controller, account);
    controller.set('currencies', Currencies);
  },

  currentUser: service('current-user'),

  actions: {
    setCurrency(code) {
      this.currentModel.set('currency', Currencies.filterBy('code', code)[0]);
    },
    createAccount(account) {
      const user = this.get('currentUser.user');
      user.get('accounts').addObject(account);
      account.save()
      .then(() => {
        return user.save();
      })
      .then(() => {
        this.get('notify').info('Account created succesfully');
        this.transitionTo('main');
      });
    }
  }
});
