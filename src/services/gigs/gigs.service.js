// Initializes the `gigs` service on path `/gigs`
const { Gigs } = require('./gigs.class');
const createModel = require('../../models/gigs.model');
const hooks = require('./gigs.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/gigs', new Gigs(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gigs');

  service.hooks(hooks);
};
