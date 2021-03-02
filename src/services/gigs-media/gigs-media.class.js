const { BadRequest } = require('@feathersjs/errors');
const { Service } = require('feathers-sequelize');

exports.GigsMedia = class GigsMedia extends Service {
  remove(id, params) {
    if (id !== null && !(id['gigs_id'] || id['media_id'])) throw new BadRequest('Identifier not included.');

    return super.remove(null, {
      query: {
        'gigs_id': id['gigs_id'],
        'media_id': id['media_id']
      },
      ...params
    });
  }
};
