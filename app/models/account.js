import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  description: DS.attr('string'),
  initialBalance: DS.attr('number'),
  currency: DS.attr(),
  entries: DS.hasMany('entry', { inverse: 'account' }),

  // List of parties concerned (Payer and payee)
  parties: DS.hasMany('party', { inverse: null })
});
