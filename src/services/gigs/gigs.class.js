const { Service } = require('feathers-sequelize');
const logger = require('../../logger');
const { slugify } = require("../../helper");

exports.Gigs = class Gigs extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  create(data, params) {
    data.slug = slugify(data.title);
    data.userId = params.user.id;
    return super.create(data, params);
  }
  find(params) {
    params.sequelize = {
      include: [{
        model: this.app.service("users").Model,
        attributes: ["id", "username"]
      }]
    }
    return super.find(params);
  }
};
