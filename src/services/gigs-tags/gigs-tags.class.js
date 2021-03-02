const { Service } = require('feathers-sequelize');

exports.GigsTags = class GigsTags extends Service {
  async create(data, params) {
    if (Array.isArray(data)) {
      try {
        return await Promise.all(data.map(current => this.create(current, params)));
      } catch (err) {
        throw new Error(err);
      }
    }
    return super.create(data, params);
  }
  async remove(id, params) {
    return super.remove(id, params);
  }
};
