const { Service } = require('feathers-sequelize');
const logger = require('../../logger');

exports.GigsTags = class GigsTags extends Service {
  async create(data, params) {
    if (Array.isArray(data)) {
      try {
        return await Promise.all(data.map(current => this.create(current, params)));
      } catch (err) {
        throw err;
      }
    }
    return super.create(data, params);
  }
  async remove(id, params) {
    logger.info("gigstags:remove", id);
    return super.remove(id, params);
  }
};
