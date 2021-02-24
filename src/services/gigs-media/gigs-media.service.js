// Initializes the `gigsMedia` service on path `/gigs-media`
const { GigsMedia } = require('./gigs-media.class');
const createModel = require('../../models/gigs-media.model');
const hooks = require('./gigs-media.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: ['remove']
  };

  // Initialize our service with any options it requires
  app.use('/gigs-media', new GigsMedia(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('gigs-media');

  service.hooks(hooks);
};
