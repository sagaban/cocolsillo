import FirebaseSimpleAuth from 'ember-simple-auth-firebase/torii-providers/firebase-simple-auth';
import Ember from 'ember';

const { RSVP } = Ember;

/**
 * These are the firebase's user's attributes
 * See https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
 * See https://firebase.google.com/docs/reference/js/firebase.User
 *
 * @type {Array<String>}
 * @private
 */
const ATTRIBUTES_TO_PERSIST = ['displayName', 'email', 'emailVerified', 'isAnonymous', 'refreshToken', 'uid', 'providerData', 'photoURL', 'refreshToken'];

export default FirebaseSimpleAuth.extend({

  firebaseApp: Ember.inject.service(),

  open() {
    return this._super(...arguments)
    .then((authResponse) => {
      // const firebase = this.get('firebaseApp');
      // firebase.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //     RSVP.resolve(user);
      //   } else {
      //     RSVP.reject({ message: 'There is no logged user' });
      //   }
      // });
      return authResponse ? this._serializeFirebaseResponse(authResponse) : null;
    });
  },

  _serializeFirebaseResponse(data) {
    return ATTRIBUTES_TO_PERSIST.reduce((ac, value) => {
      ac[value] = data[value];
      return ac;
    }, {});
  }
});
