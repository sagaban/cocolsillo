import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  icon: DS.attr('string', { defaultValue: 'generic' }),
  superCategory: DS.belongsTo('category', { inverse: 'subCategories' }),
  subCategories: DS.hasMany('category', { inverse: 'superCategory' })
});
