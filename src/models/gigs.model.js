// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const gigs = sequelizeClient.define('gigs', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    basic_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    basic_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    basic_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    basic_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    standard_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    standard_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    standard_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    standard_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
    premium_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    premium_description : {
      type: DataTypes.STRING,
      allowNull: true
    },
    premium_worktime: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    premium_price : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  gigs.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    const { users, categories, tags } = models;

    gigs.belongsTo(users);
    gigs.belongsTo(categories);
    gigs.belongsToMany(tags, {
      through: "gigs_tags",
      as: "tags",
      foreignKey: "gigs_id"
    });
  };

  return gigs;
};
