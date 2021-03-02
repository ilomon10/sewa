const { Service } = require('feathers-sequelize');

exports.Users = class Users extends Service {
  get(id, params) {
    params.sequelize = {
      ...params.sequelize,
      nest: true,
      raw: false,
    };
    return super.get(id, params);
  }
  find(params) {
    params.sequelize = {
      ...params.sequelize,
      nest: true,
      raw: false,
    };
    return super.find(params);
  }
};
