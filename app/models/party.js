import DS from 'ember-data';

/**
 * This model is use to associate an entry to an recipient or a
 * dispatcher of an entry
 *
 * @public
 * @type {DS.Model}
 */
export default DS.Model.extend({
  name: DS.attr('string'),
  // payer or payee
  entryType: DS.attr('string')
});
