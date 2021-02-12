// Initializes the `gigsTags` service on path `/gigs-tags`
const { GigsTags } = require('./gigs-tags.class');
const createModel = require('../../models/gigs-tags.model');
const hooks = require('./gigs-tags.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['remove']
  };

  // Initialize our service with any options it requires
  app.use('/gigs-tags', new GigsTags(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gigs-tags');

  service.hooks(hooks);
};
