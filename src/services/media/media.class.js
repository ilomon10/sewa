const { Service } = require('feathers-sequelize');
const logger = require('../../logger');

exports.Media = class Media extends Service {
  async create(data, params) {
    if (Array.isArray(data)) {
      try {
        return await Promise.all(data.map(current => this.create(current, params)));
      } catch(err) {
        throw err;
      }
    }
    data.userId = params.user.id;
    logger.info("media:create", data);
    return super.create(data, params);
  }
};
