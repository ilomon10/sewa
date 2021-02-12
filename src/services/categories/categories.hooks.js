const { authenticate } = require('@feathersjs/authentication').hooks;

const sequelizeInclude = require('../../hooks/sequelize-include');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [sequelizeInclude()],
    get: [],
    create: [sequelizeInclude()],
    update: [],
    patch: [sequelizeInclude()],
    remove: []
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
