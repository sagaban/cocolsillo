import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

const {
  inject: { service },
  isPresent,
  Logger
} = Ember;

export default Ember.Route.extend(
  UnauthenticatedRouteMixin,
  {

    firebaseApp: service(),
    session: service(),

    actions: {
      register(email, password) {

        if (isPresent(email) && isPresent(password)) {
          const auth = this.get('firebaseApp').auth();
          const session = this.get('session');

          auth.createUserWithEmailAndPassword(email, password)
          .then((userResponse) => {
            const user = this.store.createRecord('user', {
              uid: userResponse.uid,
              email: userResponse.email,
              photoURL: userResponse.photoURL,
              displayName: userResponse.displayName
            });
            return user.save();
          })
          .then(() => {
            session.authenticate(
              'authenticator:firebase-simple-auth',
              'firebase-simple-auth',
              {
                provider: 'password',
                email,
                password
              }
            );
          })
          .catch((e) => {
            this.get('notify').error(e.message || 'There was an error in the registration');
            Logger.error(`There was an error in the registration: ${e}`);
          });
        } else {
          this.get('notify').error('Please, provide email and password');

        }

      }
    }
  }
);
