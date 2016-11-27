import Ember from 'ember';

const {
    inject: { service },
    Logger
} = Ember;

export default Ember.Route.extend({

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
        this.get('notify').error('There was an error authenticationg you');
        Logger.error(`There was an error authenticationg: ${e}`);
      });
    }
  }
});
