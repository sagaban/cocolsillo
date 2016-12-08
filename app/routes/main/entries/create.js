import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    type: {
      refreshModel: true
    }
  },
  model(params) {
    const entry = this.store.createRecord('entry');
    entry.setProperties(params);
    return entry;
  }
});
