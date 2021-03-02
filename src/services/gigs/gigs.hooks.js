const { authenticate } = require('@feathersjs/authentication').hooks;

const sequelizeInclude = require('../../hooks/sequelize-include');

module.exports = {
  before: {
    all: [],
    find: [sequelizeInclude()],
    get: [sequelizeInclude()],
    create: [authenticate('jwt'), sequelizeInclude()],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt'), sequelizeInclude()],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
