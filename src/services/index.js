const users = require('./users/users.service.js');
const gigs = require('./gigs/gigs.service.js');
const categories = require('./categories/categories.service.js');
const tags = require('./tags/tags.service.js');
const media = require('./media/media.service.js');
const gigsTags = require('./gigs-tags/gigs-tags.service.js');
const gigsMedia = require('./gigs-media/gigs-media.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(gigs);
  app.configure(categories);
  app.configure(tags);
  app.configure(media);
  app.configure(gigsTags);
  app.configure(gigsMedia);
};
