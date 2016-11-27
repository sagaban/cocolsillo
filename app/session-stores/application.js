import AdaptiveStore from 'ember-simple-auth/session-stores/adaptive';
import Ember from 'ember';

const FIREBASE_PROVIDER = 'firebase-simple-auth';
const FIREBASE_ATTRIBUTES = ['authenticator', 'displayName', 'email', 'emailVerified', 'isAnonymous', 'refreshToken', 'uid', 'provider', 'photoURL'];

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
  persist(...args) {
    const filteredArgs = args.map((data) => {
      if (get(data, 'authenticated.provider') === FIREBASE_PROVIDER) {
        return this._serializeFirebaseRespose(data);
      }
      return data;
    });
    return this.get('_store').persist(filteredArgs);
  },

  /**
   * I have to filter firebase response due to its circular reference
   *
   * @method _serializeFirebaseRespose
   * @param {Object}  Firebase authentication response to persist
   * @return {Object} Firebase data
   * @private
   */
  _serializeFirebaseRespose(data) {
    return FIREBASE_ATTRIBUTES.reduce((ac, value) => {
      ac.authenticated[value] = data.authenticated[value];
      return ac;
    }, { authenticated: {} });
  }

});
