const { Service } = require('feathers-sequelize');
const logger = require('../../logger');
const { slugify } = require("../../helper");
const _unionBy = require("lodash.unionby");

exports.Gigs = class Gigs extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  async create(data, params) {
    data.slug = slugify(data.title);
    data.userId = params.user.id;
    if (params.route.userId)
      params.query = {
        ...params.query,
        userId: params.route.userId
      }

    params.sequelize = {
      ...params.sequelize,
      nest: true,
      raw: true
    }

    return super.create(data, params);
  }
  find(params) {
    if (params.route.userId)
      params.query = {
        ...params.query,
        userId: params.route.userId
      }

    params.sequelize = {
      ...params.sequelize,
      nest: true,
      raw: false
    }
    return super.find(params);
  }
  async patch(id, data, params) {
    if (params.route.userId)
      params.query = {
        ...params.query,
        userId: params.route.userId
      }
    let tags = data.tags;
    if (tags && tags.length) {

      const nTags = tags.filter((t) => (typeof t.id === "undefined"));
      if (nTags && nTags.length) {
        const rTags = await this.app.service("tags").create(nTags);
        await this.app.service("gigs-tags").create(rTags.map(t => ({ "tags_id": t.id, "gigs_id": id })));
      }

      const dTags = tags.filter((t) => (t.id && t.level === "tagsdelete"));
      if (dTags && dTags.length) {
        await this.app.service("gigs-tags")
          .remove(null, {
            query: {
              "gigs_id": id,
              "tags_id": { $in: dTags.map(t => t.id) }
            }
          });
      }

    }
    params.sequelize = {
      ...params.sequelize,
      nest: true,
      raw: false
    }
    return super.patch(id, data, params);
  }
};
