import DS from 'ember-data';

export default DS.Model.extend({

  // Firebase User attributes
  email: DS.attr('string'),
  photoURL: DS.attr('string'),
  displayName: DS.attr('string'),

  accounts: DS.hasMany('account'),
  defaultAccount: DS.attr('number')

});
