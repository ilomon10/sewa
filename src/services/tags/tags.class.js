const { Service } = require('feathers-sequelize');

exports.Tags = class Tags extends Service {
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
};
