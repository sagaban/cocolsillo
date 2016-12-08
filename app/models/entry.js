import DS from 'ember-data';

export default DS.Model.extend({
  // income or expense
  // TODO: check this value to be one or another
  type: DS.attr('string'),
  amount: DS.attr('number'),
  date: DS.attr('date'),
  category: DS.belongsTo('category', { inverse: null }),
  description: DS.attr('string'),
  // Payer or payee
  party: DS.belongsTo('party', { inverse: null }),
  account: DS.belongsTo('account')
  // paymentMethod: DS.belongsTo('payment-method')
});
