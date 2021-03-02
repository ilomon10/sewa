const { Service } = require('feathers-sequelize');
const fs = require('fs');
const { BadRequest } = require('@feathersjs/errors');

exports.Media = class Media extends Service {
  async create(data, params) {
    if (Array.isArray(data)) {
      try {
        return await Promise.all(data.map(current => this.create(current, params)));
      } catch (err) {
        throw new Error(err);
      }
    }
    data.userId = params.user.id;
    return super.create(data, params);
  }

  async remove(id, params) {
    const file = await this.get(id);
    if (!file) throw new BadRequest(`Media with id ${id} not found`);
    fs.unlink(file.path);
    return super.remove(id, params);
  }
};
