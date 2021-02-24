const { Service } = require('feathers-sequelize');
const logger = require('../../logger');
const { slugify } = require("../../helper");
const { BadRequest } = require('@feathersjs/errors');

exports.Gigs = class Gigs extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  async create(data, params) {
    data.slug = slugify(data.title);
    if (!data.categoryId && data.category) {
      const category = data.category;
      delete data.category;
      const { data: categories } = await this.app.service("categories").find({
        query: {
          $limit: 1,
          title: category
        }
      });

      if (!categories) throw new BadRequest(`Category ${category} not registered.`);

      data.categoryId = categories[0].id;
    }

    logger.info("create:data \n\t", data);

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
      nest: true,
      raw: false,
      ...params.sequelize,
    }
    return super.find(params);
  }

  get(id, params) {
    params.sequelize = {
      nest: true,
      raw: false,
      ...params.sequelize,
    }
    return super.get(id, params);
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

    let media = data.media;
    if (media && media.length) {
      const nMedia = data.media
        .filter((m) => (m.id && m.level === "medialink"))
        .map(m => m.id);
      if (nMedia && nMedia.length) {
        for (let i = 0; i < nMedia.length; i++) {
          const { id: mediaId } = await this.app.service("media").get(nMedia[i]);
          await this.app.service("gigs-media").create({ "gigs_id": id, "media_id": mediaId })
        }
      }

      const dMedia = data.media
        .filter((m) => (m.id && m.level === "mediaunlink"))
        .map(m => m.id);
      if (dMedia && dMedia.length) {
        await this.app.service("gigs-media")
          .remove(null, {
            query: {
              "gigs_id": id,
              "media_id": { $in: dMedia }
            }
          })
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
