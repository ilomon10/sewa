// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const logger = require("../logger");

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { params } = context;
    if (params.query && params.query["$include"]) {
      let include = params.query["$include"];

      if (!Array.isArray(include))
        include = [include];

      include = include.map(inc => {
        let attributes = ["id"];
        if (Array.isArray(inc.attributes)) {
          attributes = [
            ...attributes,
            ...inc.attributes.filter(attr => attr !== "password")
          ]
        }
        return {
          ...inc,
          model: context.app.service(inc.model).Model,
          attributes
        };
      })

      context.params.sequelize = { include };

      delete context.params.query["$include"];
    }
    return context;
  };
};
