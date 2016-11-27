import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import Ember from 'ember';

const FIREBASE_PROVIDER = 'firebase-simple-auth';

/**
 * These are the firebase's user's attributes and plus 'authenticator' and
 * 'provider' required by ember-simple-auth.
 * See https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
 * See https://firebase.google.com/docs/reference/js/firebase.User
 * If anyone know a better way to do this, please, please email me.
 *
 * @type {Array<String>}
 * @private
 */
const ATTRIBUTES_TO_PERSIST = ['displayName', 'email', 'emailVerified', 'isAnonymous', 'refreshToken', 'uid', 'providerData', 'photoURL', 'refreshToken', 'authenticator', 'provider'];

const { get } = Ember;

export default AdaptiveStore.extend({

  /**
  Persists the `data` in the `localStorage` if it is available or in a cookie
  if it is not.
  @method persist
  @param {Object} data The data to persist
  @return {Ember.RSVP.Promise} A promise that resolves when the data has successfully been persisted and rejects otherwise.
  @public
  */
  persist(sessionData) {
    let userData;
    if (get(sessionData, 'authenticated.provider') === FIREBASE_PROVIDER) {
      userData = this._serializeFirebaseResponse(sessionData);
    } else {
      userData = sessionData;
    }
    return this.get('_store').persist(userData);
  },

  /**
   * I have to filter firebase response due to its circular reference
   * This is an very ugly way to do this.
   *
   * @method _serializeFirebaseResponse
   * @param {Object}  Firebase authentication response wrapped in
   *                  'authenticated' object
   * @return {Object} Firebase user data
   * @private
   */
  _serializeFirebaseResponse(data) {
    return ATTRIBUTES_TO_PERSIST.reduce((ac, value) => {
      ac.authenticated[value] = data.authenticated[value];
      return ac;
    }, { authenticated: {} });
  }

});
