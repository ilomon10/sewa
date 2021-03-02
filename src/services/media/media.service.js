// Initializes the `media` service on path `/media`
const { Media } = require('./media.class');
const createModel = require('../../models/media.model');
const hooks = require('./media.hooks');


module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/media', new Media(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('media');

  service.hooks(hooks);
};
