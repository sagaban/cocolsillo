import FirebaseSimpleAuth from 'ember-simple-auth-firebase/torii-providers/firebase-simple-auth';

/**
 * These are the firebase's user's attributes
 * ['displayName', 'email', 'emailVerified', 'isAnonymous', 'refreshToken',
 * 'uid', 'providerData', 'photoURL', 'refreshToken']
 * See https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithEmailAndPassword
 * See https://firebase.google.com/docs/reference/js/firebase.User
 * See https://firebase.google.com/docs/auth/web/manage-users
 *
 * @type {Array<String>}
 * @private
 */
const ATTRIBUTES_TO_PERSIST = ['displayName', 'email', 'uid', 'photoURL'];

export default FirebaseSimpleAuth.extend({

  open() {
    return this._super(...arguments)
    .then((authResponse) => {
      return authResponse ? this._serializeFirebaseResponse(authResponse) : null;
    });
  },

  /**
   * I have to filter firebase response due to its circular reference
   * This is an very ugly way to do this.
   *
   * @method _serializeFirebaseResponse
   * @param   {Object}  data Firebase signInWithEmailAndPassword response
   * @return  {Object}  Firebase user data
   * @private
   */
  _serializeFirebaseResponse(data) {
    return ATTRIBUTES_TO_PERSIST.reduce((ac, value) => {
      ac[value] = data[value];
      return ac;
    }, {});
  }
});
