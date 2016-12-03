import DS from 'ember-data';

export default DS.Model.extend({

  // Firebase User attributes
  uid: DS.attr(),
  email: DS.attr('string'),
  photoURL: DS.attr('string'),
  displayName: DS.attr('string'),

  accounts: DS.hasMany('account')

});
