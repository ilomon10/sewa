const { Service } = require('feathers-sequelize');
const logger = require('../../logger');

exports.Categories = class Categories extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  find(params) {
    params.sequelize = {
      include: [{
        model: this.app.service("gigs").Model,
        attributes: ["id", "slug"]
      }],
      raw: false
    }
    return super.find(params);
  }
};
